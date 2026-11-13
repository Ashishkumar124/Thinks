/* apps/web/src/pages/dashboard.jsx — Single file, localStorage only */
"use client";

import React, {
  useState, useEffect, useMemo, useCallback, useRef,
} from "react";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

/* =================================================================
   CONSTANTS
   ================================================================= */
const PRIMARY = "#0072B9";
const DARK    = "#081E2C";
const WHITE   = "#ffffff";

const CATEGORIES        = ["A", "B", "C", "D", "E", "F"];
const PLATFORMS         = ["Instagram", "Facebook", "LinkedIn", "YouTube", "X"];
const POST_TYPES        = ["Image", "Video", "Reel", "Story", "Carousel"];
const POST_STATUSES     = ["Draft", "Published", "Scheduled"];
const CAMPAIGN_STATUSES = ["Draft", "Active", "Paused", "Completed"];
const SOCIAL_KEYS       = ["instagram", "facebook", "twitter", "linkedin", "youtube"];
const SOCIAL_LABELS     = {
  instagram: "Instagram",
  facebook:  "Facebook",
  twitter:   "Twitter / X",
  linkedin:  "LinkedIn",
  youtube:   "YouTube",
};
const CHART_PALETTE = ["#0072B9", "#0EA5E9", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899", "#94A3B8"];

/* =================================================================
   UTILS
   ================================================================= */
const uid = (p = "id") =>
  `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

const todayISO = () => new Date().toISOString().slice(0, 10);
const nowStamp = () => new Date().toISOString().replace("T", " ").slice(0, 19);

const parseFollowers = (str) => {
  let s = String(str || "").trim().toUpperCase();
  if (!s) return 0;
  let mult = 1;
  if (s.includes("M")) { mult = 1_000_000; s = s.replace("M", ""); }
  else if (s.includes("K")) { mult = 1_000; s = s.replace("K", ""); }
  s = s.replace(/,/g, "");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : Math.round(n * mult);
};

const formatFollowers = (n) => {
  n = Number(n) || 0;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
};

const isVideoFile = (p) => /\.mp4$/i.test(String(p || ""));

const parseCsvRows = (raw) => {
  const rows = [];
  const lines = String(raw || "").replace(/\r/g, "").split("\n");
  let first = true;
  for (const line of lines) {
    if (!line.trim()) continue;
    const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (first) {
      const h = cols.join(",").toLowerCase();
      if (h.includes("sno") || h.includes("name") || h.includes("influencer") || h.includes("handle")) {
        first = false; continue;
      }
      first = false;
    }
    rows.push(cols);
  }
  return rows;
};

/* ---------- Google Sheet helpers ---------- */
function extractSheetIdAndGid(url) {
  const idMatch  = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
  return { id: idMatch ? idMatch[1] : null, gid: gidMatch ? gidMatch[1] : "0" };
}

function buildSheetCsvUrl(url) {
  if (url.includes("/pub") && url.includes("output=csv")) return url;
  if (url.includes("/pub")) {
    let u = url.replace(/[?&]output=[^&]*/g, "");
    u += (u.includes("?") ? "&" : "?") + "output=csv";
    return u;
  }
  const { id, gid } = extractSheetIdAndGid(url);
  if (!id) return null;
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&gid=${gid}`;
}

async function fetchSheetCsv(url) {
  const csvUrl = buildSheetCsvUrl(url);
  if (!csvUrl) throw new Error("Invalid Google Sheets URL.");

  try {
    const res = await fetch(csvUrl, { method: "GET" });
    if (res.ok) {
      const text = await res.text();
      if (text && !text.trim().startsWith("<") && text.includes(",")) return text;
    }
  } catch (_) {}

  const proxies = [
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  ];
  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy(csvUrl));
      if (!res.ok) continue;
      const text = await res.text();
      if (text && !text.trim().startsWith("<") && text.includes(",")) return text;
    } catch (_) {}
  }
  throw new Error(
    "Could not fetch sheet. Open the sheet → Share → 'Anyone with the link' → Viewer, OR File → Share → Publish to web."
  );
}

async function parseExcelFile(file) {
  const data = await file.arrayBuffer();
  const wb = XLSX.read(data, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: "" });
  if (rows.length && rows[0]) {
    const h = rows[0].map((c) => String(c || "").toLowerCase()).join(",");
    if (h.includes("sno") || h.includes("name") || h.includes("influencer") || h.includes("handle")) {
      rows.shift();
    }
  }
  return rows
    .filter((r) => Array.isArray(r) && r.some((c) => String(c || "").trim() !== ""))
    .map((r) => r.map((c) => String(c == null ? "" : c)));
}

/* =================================================================
   ROBUST localStorage HOOK — no data loss on refresh
   ================================================================= */
function useLocal(key, initial) {
  const initialRef = useRef(initial);
  const [value, setValue] = useState(() => initialRef.current);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount (client-side only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        setValue(parsed);
      }
    } catch (e) {
      console.warn(`[useLocal] load failed for ${key}:`, e);
    }
    setHydrated(true);
  }, [key]);

  // Save on change (only after hydration to avoid overwriting with initial)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[useLocal] save failed for ${key}:`, e);
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated];
}

/* =================================================================
   ICONS
   ================================================================= */
const Icon = {
  Menu: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>),
  Close: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M6 18L18 6"/></svg>),
  Bell: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>),
  Chevron: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 9l-7 7-7-7"/></svg>),
  Dashboard: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>),
  Campaign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>),
  Chart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-8"/></svg>),
  Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  Trash: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>),
  Eye: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
  Edit: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>),
  Logout: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5"/></svg>),
  Upload: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/></svg>),
  Copy: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>),
  Search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>),
};

/* =================================================================
   SEED USERS
   ================================================================= */
const seedUsers = [
  { id: "usr_admin",  name: "Admin",  email: "admin@agency.com",  role: "admin",  role_title: "Admin",  password: "admin123" },
  { id: "usr_viewer", name: "Viewer", email: "viewer@agency.com", role: "viewer", role_title: "Viewer", password: "viewer123" },
];

/* =================================================================
   MAIN PAGE
   ================================================================= */
export default function DashboardPage() {
  const [users] = useState(seedUsers);

  // ✅ All data in localStorage — persists across refresh in same browser
  const [campaigns, setCampaigns, hydratedCampaigns]            = useLocal("tdm_campaigns_v3", []);
  const [influencers, setInfluencers]                           = useLocal("tdm_influencers_v3", []);
  const [campaignInfluencers, setCampaignInfluencers]           = useLocal("tdm_camp_inf_v3", []);
  const [posts, setPosts]                                       = useLocal("tdm_posts_v3", []);
  const [notifications, setNotifications]                       = useLocal("tdm_notifs_v3", []);
  const [companyInfluencers, setCompanyInfluencers]             = useLocal("tdm_company_influencers_v3", []);
  const [currentUser, setCurrentUser]                           = useLocal("tdm_session_v3", null);

  const [flash, setFlash]             = useState(null);
  const [activeTab, setActiveTab]     = useState("dashboard");
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [campaignView, setCampaignView] = useState("overview");
  const [lightbox, setLightbox]       = useState(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);

  const isLoggedIn = !!currentUser;
  const isAdmin    = currentUser?.role === "admin";

  // All hydration done? (only need one flag)
  const loading = !hydratedCampaigns;

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 4000);
    return () => clearTimeout(t);
  }, [flash]);

  useEffect(() => { setDrawerOpen(false); }, [activeTab]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const notify = useCallback((title, message, type = "info") => {
    setNotifications((prev) =>
      [{ id: uid("notif"), title, message, type, is_read: 0, created_at: nowStamp() }, ...prev].slice(0, 30)
    );
  }, [setNotifications]);

  /* ---------------- AUTH ---------------- */
  const handleLogin = (email, password) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase().trim());
    if (!u || u.password !== password) return false;
    setCurrentUser({ id: u.id, name: u.name, email: u.email, role: u.role, role_title: u.role_title });
    notify("Signed In", `Logged in as ${u.name}`, "success");
    setActiveTab("dashboard");
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedCampaignId(null);
  };

  /* ---------------- CAMPAIGNS ---------------- */
  const createCampaign = (form) => {
    if (!form.name?.trim() || !form.client?.trim()) {
      setFlash({ type: "error", msg: "Campaign name and client are required." });
      return;
    }
    const id = uid("camp");
    const row = {
      id, name: form.name.trim(), client: form.client.trim(),
      category: form.category?.trim() || "Brand Awareness",
      start_date: form.start_date || todayISO(),
      end_date: form.end_date || null,
      status: form.status || "Active",
      description: form.description || "",
      social_links: "{}",
      campaign_platforms: "[]",
      created_at: nowStamp(),
    };
    setCampaigns((p) => [row, ...p]);
    notify("Campaign Created", `"${row.name}" added.`, "success");
    setFlash({ type: "success", msg: `Campaign "${row.name}" created.` });
    setSelectedCampaignId(id);
    setActiveTab("campaign");
    setCampaignView("overview");
  };

  const updateCampaign = (id, form) => {
    setCampaigns((p) => p.map((c) => (c.id === id ? { ...c, ...form } : c)));
    setFlash({ type: "success", msg: "Campaign updated." });
  };

  const deleteCampaign = (id) => {
    const attachedHere = campaignInfluencers.filter((x) => x.campaign_id === id).map((x) => x.influencer_id);
    const attachedElsewhere = new Set(campaignInfluencers.filter((x) => x.campaign_id !== id).map((x) => x.influencer_id));
    const orphanedInfluencerIds = attachedHere.filter((infId) => !attachedElsewhere.has(infId));

    setPosts((p) => p.filter((x) => x.campaign_id !== id));
    setCampaignInfluencers((p) => p.filter((x) => x.campaign_id !== id));
    setCampaigns((p) => p.filter((c) => c.id !== id));
    if (orphanedInfluencerIds.length > 0) {
      setInfluencers((p) => p.filter((inf) => !orphanedInfluencerIds.includes(inf.id)));
    }
    setFlash({
      type: "success",
      msg: `Campaign deleted.${orphanedInfluencerIds.length > 0 ? ` ${orphanedInfluencerIds.length} influencer(s) also removed.` : ""}`,
    });
    if (selectedCampaignId === id) {
      setSelectedCampaignId(null);
      setActiveTab("campaigns");
    }
  };

  const clearAllData = () => {
    if (!window.confirm("⚠️ Sab kuch delete hoga (campaigns, influencers, posts). Continue?")) return;
    setCampaigns([]);
    setInfluencers([]);
    setPosts([]);
    setCampaignInfluencers([]);
    setNotifications([]);
    setCompanyInfluencers([]);
    setSelectedCampaignId(null);
    setActiveTab("dashboard");
    setCampaignView("overview");
    setFlash({ type: "success", msg: "✅ Sab data reset ho gaya." });
  };

  /* ---------------- SOCIAL / PLATFORMS ---------------- */
  const saveSocialLinks = (campaignId, links) => {
    const clean = {};
    SOCIAL_KEYS.forEach((k) => { if (links[k]?.trim()) clean[k] = links[k].trim(); });
    setCampaigns((p) => p.map((c) => c.id === campaignId ? { ...c, social_links: JSON.stringify(clean) } : c));
    setFlash({ type: "success", msg: "Social links saved." });
  };

  const addCampaignPlatform = (campaignId, siteName, siteUrl) => {
    if (!siteName.trim() || !siteUrl.trim()) {
      setFlash({ type: "error", msg: "Site name and URL are required." });
      return;
    }
    setCampaigns((p) => p.map((c) => {
      if (c.id !== campaignId) return c;
      const list = JSON.parse(c.campaign_platforms || "[]");
      list.push({ id: uid("plat"), site_name: siteName.trim(), site_url: siteUrl.trim(), added_at: nowStamp() });
      return { ...c, campaign_platforms: JSON.stringify(list) };
    }));
    setFlash({ type: "success", msg: "Platform added." });
  };

  const deleteCampaignPlatform = (campaignId, platformId) => {
    setCampaigns((p) => p.map((c) => {
      if (c.id !== campaignId) return c;
      const list = JSON.parse(c.campaign_platforms || "[]").filter((x) => x.id !== platformId);
      return { ...c, campaign_platforms: JSON.stringify(list) };
    }));
    setFlash({ type: "success", msg: "Platform removed." });
  };

  /* ---------------- CAMPAIGN INFLUENCERS ---------------- */
  const createInfluencer = (form, attachTo = "") => {
    if (!form.name?.trim() || !form.handle?.trim()) {
      setFlash({ type: "error", msg: "Name and handle required." });
      return;
    }
    let handle = form.handle.trim();
    if (!handle.startsWith("@")) handle = "@" + handle;
    const category = CATEGORIES.includes((form.category || "").toUpperCase()) ? form.category.toUpperCase() : "A";
    const row = {
      id: uid("inf"), name: form.name.trim(), handle,
      profile_link: form.profile_link?.trim() || "",
      followers: Number(form.followers) || 0,
      category, status: "Active", created_at: nowStamp(),
    };
    setInfluencers((p) => [row, ...p]);
    if (attachTo) {
      setCampaignInfluencers((p) => [...p, { id: uid("ci"), campaign_id: attachTo, influencer_id: row.id }]);
    }
    setFlash({ type: "success", msg: `Creator ${row.name} added.` });
  };

  const importInfluencers = (rows, attachTo = "") => {
    let imported = 0, skipped = 0;
    const newInfs = [];
    const newCIs = [];
    rows.forEach((cols) => {
      const name = (cols[1] || "").trim();
      let handle = (cols[2] || "").trim();
      const profile_link = (cols[3] || "").trim();
      const followers = parseFollowers(cols[4] || "0");
      let category = (cols[5] || "A").trim().toUpperCase();
      if (!name || !handle) { skipped++; return; }
      if (!handle.startsWith("@")) handle = "@" + handle;
      if (!CATEGORIES.includes(category)) category = "A";
      const row = {
        id: uid("inf"), name, handle, profile_link, followers, category,
        status: "Active", created_at: nowStamp(),
      };
      newInfs.push(row);
      if (attachTo) newCIs.push({ id: uid("ci"), campaign_id: attachTo, influencer_id: row.id });
      imported++;
    });
    setInfluencers((p) => [...newInfs, ...p]);
    if (newCIs.length) setCampaignInfluencers((p) => [...p, ...newCIs]);
    setFlash({ type: "success", msg: `${imported} influencers imported.${skipped ? ` (${skipped} skipped)` : ""}` });
  };

  const assignInfluencer = (campaignId, influencerId) => {
    const exists = campaignInfluencers.some((x) => x.campaign_id === campaignId && x.influencer_id === influencerId);
    if (exists) { setFlash({ type: "error", msg: "Already assigned." }); return; }
    setCampaignInfluencers((p) => [...p, { id: uid("ci"), campaign_id: campaignId, influencer_id: influencerId }]);
    setFlash({ type: "success", msg: "Assigned." });
  };

  const unassignInfluencer = (campaignId, influencerId) => {
    setCampaignInfluencers((p) => p.filter((x) => !(x.campaign_id === campaignId && x.influencer_id === influencerId)));
    setFlash({ type: "success", msg: "Removed from campaign." });
  };

  const deleteInfluencer = (id) => {
    const removedFrom = campaignInfluencers.filter((x) => x.influencer_id === id).length;
    setCampaignInfluencers((p) => p.filter((x) => x.influencer_id !== id));
    setInfluencers((p) => p.filter((x) => x.id !== id));
    setFlash({
      type: "success",
      msg: `Creator removed.${removedFrom > 0 ? ` (unassigned from ${removedFrom} campaign(s))` : ""}`,
    });
  };

  /* ---------------- COMPANY INFLUENCERS ---------------- */
  const createCompanyInfluencer = (form) => {
    if (!form.name?.trim() || !form.handle?.trim()) {
      setFlash({ type: "error", msg: "Name and handle required." });
      return;
    }
    let handle = form.handle.trim();
    if (!handle.startsWith("@")) handle = "@" + handle;
    const category = CATEGORIES.includes((form.category || "").toUpperCase()) ? form.category.toUpperCase() : "A";

    const exists = companyInfluencers.some((i) => i.handle.toLowerCase() === handle.toLowerCase());
    if (exists) {
      setFlash({ type: "error", msg: `Handle ${handle} already exists.` });
      return;
    }

    const row = {
      id: uid("cinf"), name: form.name.trim(), handle,
      profile_link: form.profile_link?.trim() || "",
      followers: Number(form.followers) || 0,
      category, status: "Active", created_at: nowStamp(),
    };
    setCompanyInfluencers((p) => [row, ...p]);
    setFlash({ type: "success", msg: `Influencer ${row.name} added to company list.` });
  };

  const importCompanyInfluencers = (rows) => {
    let imported = 0, skipped = 0;
    const existingHandles = new Set(companyInfluencers.map((i) => i.handle.toLowerCase()));
    const newInfs = [];
    rows.forEach((cols) => {
      const name = (cols[1] || "").trim();
      let handle = (cols[2] || "").trim();
      const profile_link = (cols[3] || "").trim();
      const followers = parseFollowers(cols[4] || "0");
      let category = (cols[5] || "A").trim().toUpperCase();
      if (!name || !handle) { skipped++; return; }
      if (!handle.startsWith("@")) handle = "@" + handle;
      if (!CATEGORIES.includes(category)) category = "A";
      if (existingHandles.has(handle.toLowerCase())) { skipped++; return; }
      existingHandles.add(handle.toLowerCase());
      newInfs.push({
        id: uid("cinf"), name, handle, profile_link, followers, category,
        status: "Active", created_at: nowStamp(),
      });
      imported++;
    });
    setCompanyInfluencers((p) => [...newInfs, ...p]);
    setFlash({ type: "success", msg: `${imported} influencers imported.${skipped ? ` (${skipped} skipped)` : ""}` });
  };

  const deleteCompanyInfluencer = (id) => {
    setCompanyInfluencers((p) => p.filter((x) => x.id !== id));
    setFlash({ type: "success", msg: "Influencer removed from company list." });
  };

  const deleteAllCompanyInfluencers = () => {
    if (!window.confirm("⚠️ Company influencers list poori delete hogi. Continue?")) return;
    setCompanyInfluencers([]);
    setFlash({ type: "success", msg: "Company influencers list cleared." });
  };

  /* ---------------- POSTS ---------------- */
  const savePost = (campaignId, form, postId = "") => {
    const camp = campaigns.find((c) => c.id === campaignId);
    if (!camp) { setFlash({ type: "error", msg: "Invalid campaign." }); return; }
    if (!form.title?.trim()) { setFlash({ type: "error", msg: "Post title required." }); return; }

    const base = {
      campaign_id: campaignId,
      campaign_name: camp.name,
      platform: PLATFORMS.includes(form.platform) ? form.platform : "Instagram",
      title: form.title.trim(),
      post_type: POST_TYPES.includes(form.post_type) ? form.post_type : "Image",
      post_url: form.post_url || "",
      media_path: form.media_path || "",
      caption: form.caption || "",
      notes: form.notes || "",
      status: POST_STATUSES.includes(form.status) ? form.status : "Draft",
      published_date: form.published_date || todayISO(),
      updated_at: nowStamp(),
    };

    if (postId) {
      setPosts((p) => p.map((x) => x.id === postId ? { ...x, ...base } : x));
      setFlash({ type: "success", msg: "Post updated." });
    } else {
      setPosts((p) => [{ id: uid("post"), ...base, created_at: nowStamp() }, ...p]);
      setFlash({ type: "success", msg: "Post added." });
    }
  };

  const deletePost = (id) => {
    setPosts((p) => p.filter((x) => x.id !== id));
    setFlash({ type: "success", msg: "Post deleted." });
  };

  /* ---------------- DERIVED ---------------- */
  const dedupedInfluencers = useMemo(() => {
    const seen = new Set();
    return influencers.filter((inf) => {
      const n = (inf.name || "").trim();
      const h = (inf.handle || "").trim();
      if (!n || !h) return false;
      const k = h.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [influencers]);

  const dedupedCompanyInfluencers = useMemo(() => {
    const seen = new Set();
    return companyInfluencers.filter((inf) => {
      const n = (inf.name || "").trim();
      const h = (inf.handle || "").trim();
      if (!n || !h) return false;
      const k = h.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [companyInfluencers]);

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || null;
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  /* ---------------- RENDER ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#081E2C] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 mx-auto border-4 border-[#0072B9]/30 border-t-[#0072B9] rounded-full animate-spin" />
          <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = [
    { key: "dashboard",   label: "Dashboard",   icon: Icon.Dashboard },
    { key: "campaigns",   label: "Campaigns",   icon: Icon.Campaign },
    { key: "influencers", label: "Influencers", icon: Icon.Users },
    { key: "analytics",   label: "Analytics",   icon: Icon.Chart },
  ];

  return (
    <div className="min-h-screen bg-[#081E2C] text-white">
      <TopNav
        currentUser={currentUser}
        isAdmin={isAdmin}
        activeTab={activeTab}
        setActiveTab={(t) => { setActiveTab(t); if (t !== "campaign") setSelectedCampaignId(null); }}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllRead={() => setNotifications((p) => p.map((n) => ({ ...n, is_read: 1 })))}
        onLogout={handleLogout}
        onNewCampaign={() => setActiveTab("add_campaign")}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      {flash && (
        <div className="max-w-7xl mx-auto mt-3 sm:mt-4 px-3 sm:px-4">
          <div className={`p-3 rounded-xl text-xs font-bold border ${
            flash.type === "success"
              ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/70 border-red-500/40 text-red-300"
          }`}>
            {flash.msg}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 pb-28 md:pb-6">
        {activeTab === "dashboard" && (
          <Dashboard
            currentUser={currentUser}
            isAdmin={isAdmin}
            campaigns={campaigns}
            posts={posts}
            influencers={dedupedInfluencers}
            companyInfluencers={dedupedCompanyInfluencers}
            onOpenCampaign={(id) => { setSelectedCampaignId(id); setActiveTab("campaign"); setCampaignView("overview"); }}
            onAddCampaign={() => setActiveTab("add_campaign")}
            onClearAll={clearAllData}
            notifications={notifications}
            onGoToInfluencers={() => setActiveTab("influencers")}
          />
        )}

        {activeTab === "add_campaign" && (
          <AddCampaign
            isAdmin={isAdmin}
            onCancel={() => setActiveTab("campaigns")}
            onCreate={createCampaign}
          />
        )}

        {activeTab === "campaigns" && (
          <CampaignsList
            campaigns={campaigns}
            posts={posts}
            isAdmin={isAdmin}
            onOpen={(id) => { setSelectedCampaignId(id); setActiveTab("campaign"); setCampaignView("overview"); }}
            onDelete={deleteCampaign}
            onAdd={() => setActiveTab("add_campaign")}
          />
        )}

        {activeTab === "influencers" && (
          <CompanyInfluencersPage
            influencers={dedupedCompanyInfluencers}
            isAdmin={isAdmin}
            onCreate={createCompanyInfluencer}
            onImport={importCompanyInfluencers}
            onDelete={deleteCompanyInfluencer}
            onDeleteAll={deleteAllCompanyInfluencers}
          />
        )}

        {activeTab === "campaign" && selectedCampaign && (
          <CampaignDetail
            campaign={selectedCampaign}
            view={campaignView}
            setView={setCampaignView}
            isAdmin={isAdmin}
            posts={posts.filter((p) => p.campaign_id === selectedCampaign.id)}
            allInfluencers={dedupedInfluencers}
            campaignInfluencers={campaignInfluencers.filter((x) => x.campaign_id === selectedCampaign.id)}
            onBack={() => { setActiveTab("campaigns"); setSelectedCampaignId(null); }}
            onUpdateCampaign={(form) => updateCampaign(selectedCampaign.id, form)}
            onSaveSocial={(links) => saveSocialLinks(selectedCampaign.id, links)}
            onAddPlatform={(n, u) => addCampaignPlatform(selectedCampaign.id, n, u)}
            onDeletePlatform={(pid) => deleteCampaignPlatform(selectedCampaign.id, pid)}
            onSavePost={(form, pid) => savePost(selectedCampaign.id, form, pid)}
            onDeletePost={deletePost}
            onCreateInfluencer={(form) => createInfluencer(form, selectedCampaign.id)}
            onImportInfluencers={(rows) => importInfluencers(rows, selectedCampaign.id)}
            onAssign={(iid) => assignInfluencer(selectedCampaign.id, iid)}
            onUnassign={(iid) => unassignInfluencer(selectedCampaign.id, iid)}
            onDeleteInfluencer={deleteInfluencer}
            onLightbox={setLightbox}
          />
        )}

        {activeTab === "campaign" && !selectedCampaign && (
          <div className="max-w-3xl mx-auto text-center py-16 sm:py-20 bg-[#0B2738] border border-white/10 rounded-3xl">
            <div className="text-4xl sm:text-5xl mb-3">🔍</div>
            <h3 className="text-base sm:text-lg font-black">Campaign not found</h3>
          </div>
        )}

        {activeTab === "analytics" && (
          <Analytics
            campaigns={campaigns}
            posts={posts}
            influencers={dedupedInfluencers}
            companyInfluencers={dedupedCompanyInfluencers}
          />
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0B2738]/95 backdrop-blur border-t border-white/10">
        <div className={`grid ${isAdmin ? "grid-cols-5" : "grid-cols-4"}`}>
          {navItems.map((item) => {
            const I = item.icon;
            const active = activeTab === item.key || (activeTab === "campaign" && item.key === "campaigns");
            return (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); if (item.key !== "campaign") setSelectedCampaignId(null); }}
                className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors relative ${
                  active ? "text-[#3FA9F5]" : "text-white/50"
                }`}
              >
                <I className="w-5 h-5" />
                <span className="truncate max-w-full px-0.5">{item.label}</span>
                {active && <span className="absolute top-0 h-0.5 w-8 bg-[#0072B9] rounded-full" />}
              </button>
            );
          })}
          {isAdmin && (
            <button
              onClick={() => setActiveTab("add_campaign")}
              className={`flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                activeTab === "add_campaign" ? "text-[#3FA9F5]" : "text-white/50"
              }`}
            >
              <Icon.Plus className="w-5 h-5" />
              <span>New</span>
            </button>
          )}
        </div>
      </nav>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-3 sm:p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="preview" className="max-w-full max-h-full rounded-2xl object-contain" />
        </div>
      )}
    </div>
  );
}

/* =================================================================
   LOGIN PAGE
   ================================================================= */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const ok = onLogin(email, password);
    if (!ok) setErr("Invalid credentials.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-[#081E2C] via-[#0A2436] to-[#0E2F45]">
      <div className="w-full max-w-md bg-[#0B2738] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            <span className="text-[#3FA9F5]">Login</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-white/60">Campaign, Influencer & Data Management Platform</p>
        </div>

        {err && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-[11px] sm:text-xs font-semibold">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-3 sm:space-y-4 text-xs">
          <div>
            <label className="block font-bold text-white/80 mb-1.5">Email Address</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@agency.com"
              className="w-full bg-[#081E2C] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-[#0072B9] text-[13px]"
            />
          </div>
          <div>
            <label className="block font-bold text-white/80 mb-1.5">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#081E2C] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-[#0072B9] text-[13px]"
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-[#0072B9] hover:brightness-110 font-extrabold text-white text-xs shadow-lg transition-all">
            Sign In to Dashboard
          </button>
        </form>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#081E2C] border border-white/10 space-y-2.5">
          <span className="text-[10px] sm:text-[11px] font-bold text-white/60 uppercase tracking-wider block">
            Quick Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => { setEmail("admin@agency.com"); setPassword("admin123"); }}
              className="p-2.5 rounded-xl bg-[#0B2738] hover:bg-[#12374D] border border-white/10 text-left text-[#3FA9F5] font-bold cursor-pointer"
            >
              👑 Admin<span className="block text-[10px] text-white/50 font-normal">Full Access</span>
            </button>
            <button
              type="button"
              onClick={() => { setEmail("viewer@agency.com"); setPassword("viewer123"); }}
              className="p-2.5 rounded-xl bg-[#0B2738] hover:bg-[#12374D] border border-white/10 text-left text-emerald-400 font-bold cursor-pointer"
            >
              👁️ Viewer<span className="block text-[10px] text-white/50 font-normal">Read Only</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   TOP NAV
   ================================================================= */
function TopNav({
  currentUser, isAdmin, activeTab, setActiveTab,
  notifications, unreadCount, onMarkAllRead, onLogout, onNewCampaign,
  drawerOpen, setDrawerOpen,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen]   = useState(false);

  const tabs = [
    { key: "dashboard",   label: "Dashboard",   icon: Icon.Dashboard },
    { key: "campaigns",   label: "Campaigns",   icon: Icon.Campaign },
    { key: "influencers", label: "Influencers", icon: Icon.Users },
    { key: "analytics",   label: "Analytics",   icon: Icon.Chart },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B2738]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-lg text-white/80 hover:bg-white/5"
              aria-label="Open menu"
            >
              <Icon.Menu className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveTab("dashboard")} className="flex items-center gap-2 min-w-0">
              <span className="text-base sm:text-lg font-black text-white tracking-tight whitespace-nowrap">
                <span className="text-[#3FA9F5]"></span>
              </span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-3 lg:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.key
                    ? "bg-[#0072B9] text-white shadow-md shadow-[#0072B9]/30"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {isAdmin && (
              <button
                onClick={onNewCampaign}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs shadow-md"
              >
                <Icon.Plus className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Add Campaign</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 relative"
                aria-label="Notifications"
              >
                <Icon.Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#0072B9] text-white text-[9px] font-black flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="fixed sm:absolute right-3 sm:right-0 left-3 sm:left-auto top-16 sm:top-auto sm:mt-2 sm:w-80 bg-[#0B2738] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-extrabold text-xs">Activity</span>
                    <button onClick={onMarkAllRead} className="text-[10px] text-[#3FA9F5] font-bold">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1.5">
                    {notifications.length === 0 && (
                      <div className="p-3 text-center text-xs text-white/40">No activity yet.</div>
                    )}
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-[#081E2C] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-white text-[11px]">{n.title}</strong>
                          <span className="text-[9.5px] text-white/40">{n.created_at?.slice(11, 16)}</span>
                        </div>
                        <p className="text-[11px] text-white/70">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative md:pl-2 md:border-l md:border-white/10">
              <button
                onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }}
                className="flex items-center gap-2"
              >
                <div className="text-right hidden md:block leading-tight">
                  <span className="block font-bold text-white text-xs truncate max-w-[120px]">{currentUser.name}</span>
                  <span className="block text-[10px] text-white/50 truncate max-w-[120px]">{currentUser.role_title}</span>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0072B9] flex items-center justify-center font-black text-xs sm:text-sm">
                  {currentUser.name.charAt(0)}
                </div>
              </button>
              {userOpen && (
                <div className="fixed sm:absolute right-3 sm:right-0 left-3 sm:left-auto top-16 sm:top-auto sm:mt-2 sm:w-56 bg-[#0B2738] border border-white/10 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <span className="block font-bold text-xs">{currentUser.name}</span>
                    <span className="block text-[10px] text-white/50 break-all">{currentUser.email}</span>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase ${
                      isAdmin ? "bg-[#0072B9]/30 text-[#3FA9F5]" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {isAdmin ? "👑 Admin" : "👁️ Viewer"}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full mt-1 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Icon.Logout className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-[#0B2738] border-r border-white/10 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-lg font-black text-white tracking-tight">
                Campaign <span className="text-[#3FA9F5]">Hub</span>
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:bg-white/5"
                aria-label="Close menu"
              >
                <Icon.Close className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-1">
              {tabs.map((t) => {
                const I = t.icon;
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setActiveTab(t.key); }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-colors ${
                      active ? "bg-[#0072B9] text-white" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <I className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {isAdmin && (
              <div className="px-3 pt-2">
                <button
                  onClick={() => { onNewCampaign(); setDrawerOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-sm"
                >
                  <Icon.Plus className="w-4 h-4" />
                  Add Campaign
                </button>
              </div>
            )}

            <div className="mt-auto p-3 border-t border-white/10 space-y-2">
              <div className="px-3 py-2">
                <span className="block font-bold text-xs truncate">{currentUser.name}</span>
                <span className="block text-[10px] text-white/50 truncate">{currentUser.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Icon.Logout className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =================================================================
   DASHBOARD
   ================================================================= */
function Dashboard({
  currentUser, isAdmin, campaigns, posts, influencers, companyInfluencers,
  onOpenCampaign, onAddCampaign, onClearAll, notifications, onGoToInfluencers,
}) {
  const totalCampaigns          = campaigns.length;
  const activeCampaigns         = campaigns.filter((c) => c.status === "Active").length;
  const completedCampaigns      = campaigns.filter((c) => c.status === "Completed").length;
  const totalInfluencers        = influencers.length;
  const totalCompanyInfluencers = companyInfluencers.length;
  const totalPosts              = posts.length;
  const publishedPosts          = posts.filter((p) => p.status === "Published").length;

  const statCards = [
    { label: "Active Campaigns", value: activeCampaigns, sub: `${completedCampaigns} completed`, note: `${totalCampaigns} total`, color: PRIMARY },
    { label: "Total Posts", value: totalPosts, sub: `${publishedPosts} published`, note: "Across all campaigns", color: "#0EA5E9" },
    {
      label: "Influencers",
      value: totalInfluencers,
      sub: `${totalCompanyInfluencers} in company list`,
      note: "Unique handles",
      color: "#22C55E",
      onClick: onGoToInfluencers,
    },
    { label: "Recent Activity", value: notifications.length, sub: "Latest events", note: "Last 30 records", color: "#F59E0B" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B2738] via-[#0E2F45] to-[#0A2436] border border-[#0072B9]/30 p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#0072B9]/20 border border-[#0072B9]/40 text-[#3FA9F5] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              ✨ Campaign-Centric Platform
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              Welcome back, <br className="sm:hidden" />{currentUser.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
              Each campaign is a parent container for its posts, media, platforms and assigned influencers.
            </p>
          </div>
          {isAdmin && (
            <div className="flex flex-row sm:flex-col gap-2 shrink-0">
              <button onClick={onAddCampaign} className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5">
                <Icon.Plus className="w-3.5 h-3.5" />
                Add Campaign
              </button>
              <button onClick={onClearAll} className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-bold border border-red-500/30">
                Reset DB
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((s) => (
          <div
            key={s.label}
            onClick={s.onClick}
            className={`bg-[#0B2738] border border-white/10 p-4 sm:p-5 rounded-2xl shadow-xl space-y-1 ${s.onClick ? "cursor-pointer hover:border-[#0072B9]/60 transition-colors" : ""}`}
          >
            <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase">{s.label}</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{s.value}</div>
            <div className="text-[11px] pt-2 border-t border-white/10" style={{ color: s.color }}>
              {s.sub}
            </div>
            <div className="text-[10px] text-white/40">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Campaigns Overview</h3>
        </div>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 sm:py-10 space-y-3">
            <p className="text-xs text-white/50">No campaigns yet.</p>
            {isAdmin && (
              <button onClick={onAddCampaign} className="px-4 py-2 rounded-xl bg-[#0072B9] text-white font-bold text-xs">
                Create First Campaign
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80">
                <thead className="text-[#3FA9F5] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2 pr-3">#</th>
                    <th className="py-2 pr-3">Campaign</th>
                    <th className="py-2 pr-3">Client</th>
                    <th className="py-2 pr-3">Start</th>
                    <th className="py-2 pr-3">Posts</th>
                    <th className="py-2 pr-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.slice(0, 5).map((c, i) => {
                    const cp = posts.filter((p) => p.campaign_id === c.id).length;
                    return (
                      <tr key={c.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="py-2.5 pr-3 font-mono text-white/40">{i + 1}</td>
                        <td className="py-2.5 pr-3 font-bold text-white">{c.name}</td>
                        <td className="py-2.5 pr-3">{c.client}</td>
                        <td className="py-2.5 pr-3 font-mono text-white/60">{c.start_date || "—"}</td>
                        <td className="py-2.5 pr-3 text-[#3FA9F5] font-mono font-bold">{cp}</td>
                        <td className="py-2.5 pr-3">
                          <button onClick={() => onOpenCampaign(c.id)} className="text-[#3FA9F5] hover:underline font-bold">
                            Open →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {campaigns.slice(0, 5).map((c) => {
                const cp = posts.filter((p) => p.campaign_id === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => onOpenCampaign(c.id)}
                    className="w-full text-left bg-[#081E2C] border border-white/10 rounded-xl p-3 active:scale-[0.99] transition-transform"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-white text-sm truncate">{c.name}</span>
                      <span className="text-[#3FA9F5] text-[10px] font-bold shrink-0">{cp} posts</span>
                    </div>
                    <div className="text-[11px] text-white/60 space-y-1">
                      <div className="flex justify-between"><span>Client</span><span className="text-white/90">{c.client}</span></div>
                      <div className="flex justify-between"><span>Start</span><span className="font-mono">{c.start_date || "—"}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =================================================================
   COMPANY INFLUENCERS PAGE
   ================================================================= */
function CompanyInfluencersPage({ influencers, isAdmin, onCreate, onImport, onDelete, onDeleteAll }) {
  const [showAdd, setShowAdd]       = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState([]);
  const [catOpen, setCatOpen]       = useState(false);

  const toggleCat = (c) => {
    setCatFilter((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const filtered = influencers.filter((inf) => {
    if (catFilter.length && !catFilter.includes((inf.category || "A").toUpperCase())) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hay = `${inf.name || ""} ${inf.handle || ""} ${inf.profile_link || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const totalFollowers = filtered.reduce((s, i) => s + (Number(i.followers) || 0), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B2738] via-[#0E2F45] to-[#0A2436] border border-[#0072B9]/30 p-4 sm:p-6 lg:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#0072B9]/20 border border-[#0072B9]/40 text-[#3FA9F5] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              🎯 Company Influencer Database
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              Influencers
            </h1>
            <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
              Company-wide master list — ye campaign se alag hai. Yahan add karne se koi campaign me automatically add nahi hoga.
            </p>
          </div>
          <div className="flex flex-row sm:flex-col gap-2 shrink-0">
            <div className="text-center sm:text-right">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">{influencers.length}</div>
              <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#0B2738] border border-white/10 p-4 rounded-2xl shadow-xl">
          <span className="text-[10px] font-bold text-white/50 uppercase">Total Influencers</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{influencers.length}</div>
        </div>
        <div className="bg-[#0B2738] border border-white/10 p-4 rounded-2xl shadow-xl">
          <span className="text-[10px] font-bold text-white/50 uppercase">Filtered</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{filtered.length}</div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-[#0B2738] border border-white/10 p-4 rounded-2xl shadow-xl">
          <span className="text-[10px] font-bold text-white/50 uppercase">Combined Reach</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{formatFollowers(totalFollowers)}</div>
        </div>
      </div>

      <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div className="relative flex-1 min-w-0">
            <Icon.Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, handle or profile…"
              className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-[#0072B9]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button onClick={() => setCatOpen(!catOpen)}
                className="bg-[#081E2C] border border-white/15 text-white rounded-xl px-3 py-2.5 text-[11px] font-bold flex items-center justify-between gap-2 min-w-[130px]">
                <span className="truncate">{catFilter.length === 0 ? "All Categories" : `Cat: ${catFilter.join(", ")}`}</span>
                <Icon.Chevron className={`w-3 h-3 text-white/50 shrink-0 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              {catOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-1 w-48 bg-[#0B2738] border border-white/15 rounded-xl shadow-2xl p-3 z-20 space-y-2">
                  {CATEGORIES.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-xs text-white/80 hover:text-white cursor-pointer">
                      <input type="checkbox" checked={catFilter.includes(c)} onChange={() => toggleCat(c)}
                        className="accent-[#0072B9] w-3.5 h-3.5" />
                      <span>Category {c}</span>
                    </label>
                  ))}
                  <div className="pt-2 border-t border-white/10 flex gap-2">
                    <button onClick={() => setCatOpen(false)}
                      className="flex-1 py-1.5 rounded-lg bg-[#0072B9] text-white text-[10px] font-bold">Done</button>
                    <button onClick={() => { setCatFilter([]); setCatOpen(false); }}
                      className="flex-1 py-1.5 rounded-lg bg-white/10 text-white/80 text-[10px] font-bold">Clear</button>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <>
                <button onClick={() => setShowImport(true)}
                  className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5">
                  <Icon.Upload className="w-3.5 h-3.5" />
                  Import
                </button>
                <button onClick={() => setShowAdd(true)}
                  className="px-3 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5">
                  <Icon.Plus className="w-3.5 h-3.5" />
                  Add
                </button>
                {influencers.length > 0 && (
                  <button onClick={onDeleteAll}
                    className="px-3 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold">
                    Delete All
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#0B2738] border border-white/10 rounded-2xl text-center py-10 sm:py-12 space-y-3">
          <div className="text-3xl sm:text-4xl">🌟</div>
          <p className="text-xs text-white/50 px-4">
            {influencers.length === 0
              ? "Company influencers list abhi empty hai. Add ya Import karo."
              : search || catFilter.length > 0
                ? "Koi influencer match nahi hua."
                : "No influencers."}
          </p>
          {isAdmin && influencers.length === 0 && (
            <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-xl bg-[#0072B9] text-white font-bold text-xs">
              Add First Influencer
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-[#0B2738] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#3FA9F5] uppercase text-[10px] tracking-wider bg-[#081E2C]">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Handle</th>
                    <th className="py-3 px-4">Profile</th>
                    <th className="py-3 px-4">Followers</th>
                    <th className="py-3 px-4">Category</th>
                    {isAdmin && <th className="py-3 px-4">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inf, i) => (
                    <tr key={inf.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="py-2.5 px-4 font-mono text-white/40">{i + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-white">{inf.name}</td>
                      <td className="py-2.5 px-4 text-white/80 font-mono">{inf.handle}</td>
                      <td className="py-2.5 px-4 text-white/60 truncate max-w-[220px]">
                        {inf.profile_link
                          ? <a href={inf.profile_link} target="_blank" rel="noopener noreferrer" className="text-[#3FA9F5] hover:underline">{inf.profile_link}</a>
                          : "—"}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-emerald-400 font-bold">{formatFollowers(inf.followers)}</td>
                      <td className="py-2.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black text-[#3FA9F5] bg-[#0072B9]/20 border border-[#0072B9]/40">
                          {inf.category}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="py-2.5 px-4">
                          <button
                            onClick={() => window.confirm(`Delete ${inf.name}?`) && onDelete(inf.id)}
                            className="text-red-400 hover:text-red-300 font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-2.5">
            {filtered.map((inf) => (
              <div key={inf.id} className="bg-[#0B2738] border border-white/10 rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm truncate">{inf.name}</div>
                    <div className="text-[11px] text-white/60 font-mono truncate">{inf.handle}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-[#3FA9F5] bg-[#0072B9]/20 border border-[#0072B9]/40 shrink-0">
                    Cat {inf.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="text-emerald-400 font-mono font-bold">{formatFollowers(inf.followers)} followers</span>
                  {inf.profile_link && (
                    <a href={inf.profile_link} target="_blank" rel="noopener noreferrer"
                      className="text-[#3FA9F5] hover:underline">Profile →</a>
                  )}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => window.confirm(`Delete ${inf.name}?`) && onDelete(inf.id)}
                    className="w-full py-2 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-400 border border-red-500/30 text-[11px] font-bold"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {showAdd && (
        <InfluencerModal
          onClose={() => setShowAdd(false)}
          onSave={(form) => { onCreate(form); setShowAdd(false); }}
        />
      )}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={(rows) => { onImport(rows); setShowImport(false); }}
        />
      )}
    </div>
  );
}

/* =================================================================
   ADD CAMPAIGN
   ================================================================= */
function AddCampaign({ isAdmin, onCancel, onCreate }) {
  const [form, setForm] = useState({
    name: "", client: "", category: "Brand Awareness",
    start_date: todayISO(), end_date: "",
    status: "Active", description: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="border-b border-white/10 pb-3 sm:pb-4 flex items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white">CREATE NEW CAMPAIGN</h2>
          <p className="text-[11px] sm:text-xs text-white/50">Parent container for posts & influencers</p>
        </div>
        <button onClick={onCancel} className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold text-xs shrink-0">
          ← Back
        </button>
      </div>

      <div className="bg-[#0B2738] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
        <form onSubmit={(e) => { e.preventDefault(); onCreate(form); }} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-white/80 mb-1.5">Campaign Name *</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#0072B9]" />
            </div>
            <div>
              <label className="block font-bold text-white/80 mb-1.5">Client Name *</label>
              <input required value={form.client} onChange={(e) => update("client", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#0072B9]" />
            </div>
            <div>
              <label className="block font-bold text-white/80 mb-1.5">Category</label>
              <input value={form.category} onChange={(e) => update("category", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#0072B9]" />
            </div>
            <div>
              <label className="block font-bold text-white/80 mb-1.5">Start Date *</label>
              <input type="date" required value={form.start_date} onChange={(e) => update("start_date", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-[#0072B9]" />
            </div>
            <div>
              <label className="block font-bold text-white/80 mb-1.5">End Date</label>
              <input type="date" value={form.end_date} onChange={(e) => update("end_date", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-[#0072B9]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-white/80 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#0072B9]">
                {CAMPAIGN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-white/80 mb-1.5">Description</label>
              <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)}
                className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-[#0072B9] resize-none" />
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-white/10">
            <button type="button" onClick={onCancel} className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs">
              Cancel
            </button>
            {isAdmin && (
              <button type="submit" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2">
                <Icon.Check className="w-4 h-4" />
                Save Campaign
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

/* =================================================================
   CAMPAIGNS LIST
   ================================================================= */
function CampaignsList({ campaigns, posts, isAdmin, onOpen, onDelete, onAdd }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white">CAMPAIGNS</h2>
          <p className="text-[11px] sm:text-xs text-white/50">Each campaign is a parent container</p>
        </div>
        {isAdmin && (
          <button onClick={onAdd} className="px-3 sm:px-4 py-2 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0">
            <Icon.Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Campaign</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-[#0B2738] border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <div className="text-3xl sm:text-4xl">🚀</div>
          <h3 className="text-base sm:text-lg font-black text-white">No Campaigns Yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {campaigns.map((c) => {
            const cp = posts.filter((p) => p.campaign_id === c.id).length;
            const statusColor =
              c.status === "Active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
              c.status === "Completed" ? "bg-white/10 text-white/60 border-white/10" :
              "bg-amber-500/20 text-amber-400 border-amber-500/30";
            return (
              <div key={c.id} className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl hover:border-[#0072B9]/50 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                    {c.status}
                  </span>
                  <span className="text-[10px] font-bold text-[#3FA9F5] uppercase truncate max-w-[100px]">{c.category || "—"}</span>
                </div>
                <h3 className="font-black text-white text-sm sm:text-base mb-1 truncate">{c.name}</h3>
                <p className="text-[11px] sm:text-xs text-white/60 mb-3 truncate">Client: <span className="text-white/90 font-bold">{c.client}</span></p>
                <div className="flex items-center justify-between text-[11px] text-white/50 mb-4">
                  <span className="font-mono">{c.start_date || "—"}</span>
                  <span className="text-[#3FA9F5] font-bold">{cp} posts</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button onClick={() => onOpen(c.id)} className="flex-1 py-2 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs">
                    Open →
                  </button>
                  {isAdmin && (
                    <button onClick={() => window.confirm("Delete campaign? Orphan influencers will also be removed.") && onDelete(c.id)}
                      className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900/50 text-red-400 border border-red-500/30"
                      aria-label="Delete campaign"
                    >
                      <Icon.Trash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =================================================================
   CAMPAIGN DETAIL
   ================================================================= */
function CampaignDetail({
  campaign, view, setView, isAdmin,
  posts, allInfluencers, campaignInfluencers,
  onBack, onUpdateCampaign, onSaveSocial, onAddPlatform, onDeletePlatform,
  onSavePost, onDeletePost,
  onCreateInfluencer, onImportInfluencers, onAssign, onUnassign, onDeleteInfluencer, onLightbox,
}) {
  const [showEdit,       setShowEdit]       = useState(false);
  const [showSocial,     setShowSocial]     = useState(false);
  const [showPlatform,   setShowPlatform]   = useState(false);
  const [showPost,       setShowPost]       = useState(false);
  const [showInfluencer, setShowInfluencer] = useState(false);
  const [showImport,     setShowImport]     = useState(false);
  const [viewPost,       setViewPost]       = useState(null);
  const [editingPost,    setEditingPost]    = useState(null);

  const social    = JSON.parse(campaign.social_links || "{}");
  const platforms = JSON.parse(campaign.campaign_platforms || "[]");

  const [catFilter, setCatFilter] = useState([]);
  const [catOpen, setCatOpen]     = useState(false);

  const filteredInfluencers = campaignInfluencers.filter((ci) => {
    const inf = allInfluencers.find((i) => i.id === ci.influencer_id);
    if (!inf) return false;
    if (catFilter.length && !catFilter.includes((inf.category || "A").toUpperCase())) return false;
    return true;
  }).map((ci) => allInfluencers.find((i) => i.id === ci.influencer_id)).filter(Boolean);

  const tabs = [
    { key: "overview",    label: "Overview",    count: posts.length },
    { key: "posts",       label: "Posts",       count: posts.length },
    { key: "influencers", label: "Influencers", count: filteredInfluencers.length },
    { key: "media",       label: "Media",       count: posts.filter((p) => p.media_path).length },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B2738] via-[#0E2F45] to-[#0A2436] border border-[#0072B9]/30 p-4 sm:p-6 lg:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <button onClick={onBack} className="text-[11px] font-bold text-white/50 hover:text-[#3FA9F5]">
              ← All Campaigns
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white break-words leading-tight">{campaign.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                campaign.status === "Active"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-white/10 text-white/70 border-white/10"
              }`}>{campaign.status}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#0072B9]/20 border border-[#0072B9]/40 text-[#3FA9F5]">
                {campaign.category || "Campaign"}
              </span>
              <span className="text-[11px] text-white/60 break-all">
                Client: <strong className="text-white/90">{campaign.client}</strong>
              </span>
            </div>
          </div>
          {isAdmin && (
            <button onClick={() => setShowEdit(true)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5">
              <Icon.Edit className="w-3.5 h-3.5" />
              Edit Campaign
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-white/10 -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setView(t.key)}
              className={`px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-colors ${
                view === t.key ? "bg-[#0072B9] text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {t.label} <span className="text-[10px] opacity-70">({t.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {view === "overview" && (
          <OverviewTab
            campaign={campaign}
            posts={posts}
            campaignInfluencers={filteredInfluencers}
            social={social}
            platforms={platforms}
            isAdmin={isAdmin}
            onOpenSocial={() => setShowSocial(true)}
            onOpenPlatform={() => setShowPlatform(true)}
            onDeletePlatform={onDeletePlatform}
          />
        )}

        {view === "posts" && (
          <PostsTab
            posts={posts}
            isAdmin={isAdmin}
            onNew={() => { setEditingPost(null); setShowPost(true); }}
            onEdit={(p) => { setEditingPost(p); setShowPost(true); }}
            onDelete={onDeletePost}
            onView={(p) => setViewPost(p)}
            onLightbox={onLightbox}
          />
        )}

        {view === "influencers" && (
          <InfluencersTab
            influencers={filteredInfluencers}
            isAdmin={isAdmin}
            catFilter={catFilter}
            setCatFilter={setCatFilter}
            catOpen={catOpen}
            setCatOpen={setCatOpen}
            onOpenAdd={() => setShowInfluencer(true)}
            onOpenImport={() => setShowImport(true)}
            onUnassign={onUnassign}
            onDeleteInfluencer={onDeleteInfluencer}
          />
        )}

        {view === "media" && <MediaTab posts={posts} onLightbox={onLightbox} />}
      </div>

      {showEdit && (
        <EditCampaignModal
          campaign={campaign}
          onClose={() => setShowEdit(false)}
          onSave={(form) => { onUpdateCampaign(form); setShowEdit(false); }}
        />
      )}
      {showSocial && (
        <SocialModal
          social={social}
          onClose={() => setShowSocial(false)}
          onSave={(links) => { onSaveSocial(links); setShowSocial(false); }}
        />
      )}
      {showPlatform && (
        <PlatformModal
          onClose={() => setShowPlatform(false)}
          onAdd={(n, u) => { onAddPlatform(n, u); setShowPlatform(false); }}
        />
      )}
      {showPost && (
        <PostModal
          post={editingPost}
          onClose={() => { setShowPost(false); setEditingPost(null); }}
          onSave={(form) => { onSavePost(form, editingPost?.id || ""); setShowPost(false); setEditingPost(null); }}
        />
      )}
      {showInfluencer && (
        <InfluencerModal
          onClose={() => setShowInfluencer(false)}
          onSave={(form) => { onCreateInfluencer(form); setShowInfluencer(false); }}
        />
      )}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={(rows) => { onImportInfluencers(rows); setShowImport(false); }}
        />
      )}
      {viewPost && <ViewPostModal post={viewPost} onClose={() => setViewPost(null)} onLightbox={onLightbox} />}
    </div>
  );
}

/* =================================================================
   OVERVIEW TAB
   ================================================================= */
function OverviewTab({
  campaign, posts, campaignInfluencers, social, platforms,
  isAdmin, onOpenSocial, onOpenPlatform, onDeletePlatform,
}) {
  const socialIcons = {
    instagram: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
    facebook:  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
    twitter:   "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg",
    linkedin:  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
    youtube:   "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg",
  };

  return (
    <>
      <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
          Campaign Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs">
          {[
            ["Client",     campaign.client],
            ["Category",   campaign.category || "—"],
            ["Status",     campaign.status],
            ["Start Date", campaign.start_date || "—"],
            ["End Date",   campaign.end_date || "—"],
            ["Created",    campaign.created_at || ""],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#081E2C] p-3 sm:p-3.5 rounded-xl border border-white/10">
              <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">{k}</span>
              <span className="text-white font-bold break-all">{v}</span>
            </div>
          ))}
          <div className="bg-[#081E2C] p-3 sm:p-3.5 rounded-xl border border-white/10 sm:col-span-2 lg:col-span-3">
            <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">Description</span>
            <span className="text-white/80 leading-relaxed">
              {campaign.description || <em className="text-white/40">No description.</em>}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">🌐 Social Media Handles</h3>
          {isAdmin && (
            <button onClick={onOpenSocial} className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0072B9] hover:brightness-110 text-white font-bold text-[11px] shrink-0">
              + Edit
            </button>
          )}
        </div>
        {Object.keys(social).length === 0 ? (
          <p className="text-xs text-white/40 italic text-center py-4">No social handles added.</p>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SOCIAL_KEYS.map((k) => {
              if (!social[k]) return null;
              return (
                <a key={k} href={social[k]} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-[#081E2C] border border-white/10 hover:border-[#0072B9]/60 transition-all">
                  <img src={socialIcons[k]} alt={k} className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ filter: "invert(38%) sepia(85%) saturate(1954%) hue-rotate(180deg) brightness(95%) contrast(92%)" }} />
                  <span className="text-[11px] sm:text-xs font-bold text-white/70 group-hover:text-white">{SOCIAL_LABELS[k]}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-3">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">🚀 Platforms Campaign Ran On</h3>
            <p className="text-[10.5px] text-white/40 mt-0.5">Manually add sites where this campaign was published</p>
          </div>
          {isAdmin && (
            <button onClick={onOpenPlatform} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] self-start sm:self-auto">
              + Add Platform
            </button>
          )}
        </div>
        {platforms.length === 0 ? (
          <p className="text-xs text-white/40 italic text-center py-4">No platforms added.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#3FA9F5] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2 pr-3">#</th>
                    <th className="py-2 pr-3">Site Name</th>
                    <th className="py-2 pr-3">URL</th>
                    <th className="py-2 pr-3">Added</th>
                    {isAdmin && <th className="py-2 pr-3">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((p, i) => (
                    <tr key={p.id} className="border-t border-white/5">
                      <td className="py-2.5 pr-3 font-mono text-white/40">{i + 1}</td>
                      <td className="py-2.5 pr-3 font-bold text-white">{p.site_name}</td>
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2">
                          <a href={p.site_url} target="_blank" rel="noopener noreferrer"
                            className="text-[#3FA9F5] hover:underline truncate max-w-[280px]">{p.site_url}</a>
                          <button onClick={() => navigator.clipboard?.writeText(p.site_url)}
                            className="text-white/50 hover:text-white p-1 rounded bg-white/5 border border-white/10">
                            <Icon.Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3 font-mono text-white/50 text-[10.5px]">
                        {(p.added_at || "").slice(0, 10)}
                      </td>
                      {isAdmin && (
                        <td className="py-2.5 pr-3">
                          <button onClick={() => window.confirm("Remove?") && onDeletePlatform(p.id)}
                            className="text-red-400 hover:text-red-300 font-bold">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-2">
              {platforms.map((p) => (
                <div key={p.id} className="bg-[#081E2C] border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white text-sm truncate">{p.site_name}</span>
                    <span className="text-[10px] text-white/40 font-mono shrink-0">{(p.added_at || "").slice(0, 10)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={p.site_url} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] text-[#3FA9F5] hover:underline truncate flex-1">{p.site_url}</a>
                    <button onClick={() => navigator.clipboard?.writeText(p.site_url)}
                      className="p-1.5 rounded bg-white/5 border border-white/10 text-white/60">
                      <Icon.Copy className="w-3 h-3" />
                    </button>
                  </div>
                  {isAdmin && (
                    <button onClick={() => window.confirm("Remove?") && onDeletePlatform(p.id)}
                      className="text-[11px] text-red-400 font-bold">Delete</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Posts",       posts.length],
          ["Influencers", campaignInfluencers.length],
          ["Media Files", posts.filter((p) => p.media_path).length],
        ].map(([k, v]) => (
          <div key={k} className="bg-[#0B2738] border border-white/10 p-3 sm:p-5 rounded-2xl shadow-xl">
            <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase">{k}</span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">{v}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =================================================================
   POSTS TAB
   ================================================================= */
function PostsTab({ posts, isAdmin, onNew, onEdit, onDelete, onView, onLightbox }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Posts</h3>
        {isAdmin && (
          <button onClick={onNew} className="px-3 sm:px-4 py-2 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shrink-0">
            <Icon.Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Post</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="bg-[#0B2738] border border-white/10 rounded-2xl text-center py-10 sm:py-12 space-y-3">
          <div className="text-3xl sm:text-4xl">📝</div>
          <p className="text-xs text-white/50">No posts yet.</p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-[#0B2738] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#3FA9F5] uppercase text-[10px] tracking-wider bg-[#081E2C]">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Media</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p, i) => {
                    const isVid = isVideoFile(p.media_path);
                    return (
                      <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono text-white/40">{i + 1}</td>
                        <td className="py-2.5 px-4">
                          {!p.media_path ? (
                            <span className="text-[10px] text-white/30 font-mono">No media</span>
                          ) : isVid ? (
                            <span className="text-[10px] text-[#3FA9F5] font-mono">🎥 Video</span>
                          ) : (
                            <img src={p.media_path} alt="" className="w-10 h-10 rounded object-cover cursor-zoom-in border border-white/10"
                              onClick={() => onLightbox(p.media_path)} />
                          )}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-white">{p.title}</td>
                        <td className="py-2.5 px-4 text-white/80 font-bold">{p.platform}</td>
                        <td className="py-2.5 px-4 text-white/60">{p.post_type}</td>
                        <td className="py-2.5 px-4 font-mono text-white/60">{p.published_date || "—"}</td>
                        <td className="py-2.5 px-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="py-2.5 px-4 space-x-3">
                          <button onClick={() => onView(p)} className="text-white/70 hover:text-white font-bold">View</button>
                          {isAdmin && (
                            <>
                              <button onClick={() => onEdit(p)} className="text-[#3FA9F5] hover:brightness-110 font-bold">Edit</button>
                              <button onClick={() => window.confirm("Delete?") && onDelete(p.id)}
                                className="text-red-400 hover:text-red-300 font-bold">Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {posts.map((p) => {
              const isVid = isVideoFile(p.media_path);
              return (
                <div key={p.id} className="bg-[#0B2738] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex gap-3 p-3">
                    <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center overflow-hidden shrink-0">
                      {!p.media_path ? (
                        <span className="text-[9px] text-white/30 font-mono text-center px-1">No media</span>
                      ) : isVid ? (
                        <span className="text-[10px] text-[#3FA9F5] font-mono">🎥</span>
                      ) : (
                        <img src={p.media_path} alt="" className="w-full h-full object-cover"
                          onClick={() => onLightbox(p.media_path)} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-white text-sm truncate">{p.title}</span>
                        <StatusBadge status={p.status} />
                      </div>
                      <div className="text-[11px] text-white/60 space-y-0.5">
                        <div>{p.platform} • {p.post_type}</div>
                        <div className="font-mono text-white/50">{p.published_date || "—"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 pb-3">
                    <button onClick={() => onView(p)} className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs flex items-center justify-center gap-1.5">
                      <Icon.Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                    {isAdmin && (
                      <>
                        <button onClick={() => onEdit(p)} className="p-2 rounded-lg bg-[#0072B9]/20 text-[#3FA9F5] border border-[#0072B9]/40">
                          <Icon.Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => window.confirm("Delete?") && onDelete(p.id)}
                          className="p-2 rounded-lg bg-red-950/50 text-red-400 border border-red-500/30">
                          <Icon.Trash className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

function StatusBadge({ status }) {
  const cls =
    status === "Published" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
    : status === "Scheduled" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
    : "bg-white/10 text-white/60";
  return <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold whitespace-nowrap ${cls}`}>{status}</span>;
}

/* =================================================================
   CAMPAIGN INFLUENCERS TAB
   ================================================================= */
function InfluencersTab({
  influencers, isAdmin, catFilter, setCatFilter,
  catOpen, setCatOpen, onOpenAdd, onOpenImport, onUnassign, onDeleteInfluencer,
}) {
  const toggleCat = (c) => {
    setCatFilter((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider shrink-0">Campaign Influencers</h3>
          <div className="relative">
            <button onClick={() => setCatOpen(!catOpen)}
              className="bg-[#081E2C] border border-white/15 text-white rounded-lg px-2.5 sm:px-3 py-1.5 text-[11px] font-bold flex items-center justify-between gap-2 min-w-[110px] sm:min-w-[140px]">
              <span className="truncate">{catFilter.length === 0 ? "All Categories" : `Selected: ${catFilter.join(", ")}`}</span>
              <Icon.Chevron className={`w-3 h-3 text-white/50 shrink-0 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-1 w-48 bg-[#0B2738] border border-white/15 rounded-xl shadow-2xl p-3 z-20 space-y-2">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-xs text-white/80 hover:text-white cursor-pointer">
                    <input type="checkbox" checked={catFilter.includes(c)} onChange={() => toggleCat(c)}
                      className="accent-[#0072B9] w-3.5 h-3.5" />
                    <span>Category {c}</span>
                  </label>
                ))}
                <div className="pt-2 border-t border-white/10 flex gap-2">
                  <button onClick={() => setCatOpen(false)}
                    className="flex-1 py-1.5 rounded-lg bg-[#0072B9] text-white text-[10px] font-bold">Done</button>
                  <button onClick={() => { setCatFilter([]); setCatOpen(false); }}
                    className="flex-1 py-1.5 rounded-lg bg-white/10 text-white/80 text-[10px] font-bold">Clear</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <>
              <button onClick={onOpenImport} className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                <Icon.Upload className="w-3.5 h-3.5" />
                Import
              </button>
              <button onClick={onOpenAdd} className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                <Icon.Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </>
          )}
        </div>
      </div>

      {influencers.length === 0 ? (
        <div className="bg-[#0B2738] border border-white/10 rounded-2xl text-center py-10 sm:py-12 space-y-3">
          <div className="text-3xl sm:text-4xl">🌟</div>
          <p className="text-xs text-white/50 px-4">
            {catFilter.length > 0 ? `No influencers in selected categories (${catFilter.join(", ")}).` : "No influencers assigned yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-[#0B2738] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#3FA9F5] uppercase text-[10px] tracking-wider bg-[#081E2C]">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Handle</th>
                    <th className="py-3 px-4">Profile</th>
                    <th className="py-3 px-4">Followers</th>
                    <th className="py-3 px-4">Category</th>
                    {isAdmin && <th className="py-3 px-4">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {influencers.map((inf, i) => (
                    <tr key={inf.id} className="border-t border-white/5 hover:bg-white/5">
                      <td className="py-2.5 px-4 font-mono text-white/40">{i + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-white">{inf.name}</td>
                      <td className="py-2.5 px-4 text-white/80 font-mono">{inf.handle}</td>
                      <td className="py-2.5 px-4 text-white/60 truncate max-w-[200px]">
                        {inf.profile_link
                          ? <a href={inf.profile_link} target="_blank" rel="noopener noreferrer" className="text-[#3FA9F5] hover:underline">{inf.profile_link}</a>
                          : "—"}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-emerald-400 font-bold">{formatFollowers(inf.followers)}</td>
                      <td className="py-2.5 px-4 font-mono font-black text-[#3FA9F5]">{inf.category}</td>
                      {isAdmin && (
                        <td className="py-2.5 px-4 space-x-3">
                          <button onClick={() => window.confirm("Remove from this campaign only?") && onUnassign(inf.id)}
                            className="text-amber-400 hover:text-amber-300 font-bold">Unassign</button>
                          <button onClick={() => window.confirm("Delete this influencer permanently?") && onDeleteInfluencer(inf.id)}
                            className="text-red-400 hover:text-red-300 font-bold">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-2.5">
            {influencers.map((inf) => (
              <div key={inf.id} className="bg-[#0B2738] border border-white/10 rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm truncate">{inf.name}</div>
                    <div className="text-[11px] text-white/60 font-mono truncate">{inf.handle}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-[#3FA9F5] bg-[#0072B9]/20 border border-[#0072B9]/40 shrink-0">
                    Cat {inf.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="text-emerald-400 font-mono font-bold">{formatFollowers(inf.followers)} followers</span>
                  {inf.profile_link && (
                    <a href={inf.profile_link} target="_blank" rel="noopener noreferrer"
                      className="text-[#3FA9F5] hover:underline">Profile →</a>
                  )}
                </div>
                {isAdmin && (
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => window.confirm("Remove from this campaign only?") && onUnassign(inf.id)}
                      className="py-2 rounded-lg bg-amber-950/50 hover:bg-amber-900/50 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                      Unassign
                    </button>
                    <button onClick={() => window.confirm("Delete this influencer permanently?") && onDeleteInfluencer(inf.id)}
                      className="py-2 rounded-lg bg-red-950/50 hover:bg-red-900/50 text-red-400 border border-red-500/30 text-[11px] font-bold">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/* =================================================================
   MEDIA TAB
   ================================================================= */
function MediaTab({ posts, onLightbox }) {
  const mediaItems = posts.filter((p) => p.media_path);
  return (
    <>
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Media</h3>
      </div>
      {mediaItems.length === 0 ? (
        <div className="bg-[#0B2738] border border-white/10 rounded-2xl text-center py-10 sm:py-12">
          <div className="text-3xl sm:text-4xl">🖼️</div>
          <p className="text-xs text-white/50 mt-2">No media yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {mediaItems.map((p) => (
            <div key={p.id} className="bg-[#081E2C] border border-white/10 rounded-xl overflow-hidden">
              <div className="w-full h-28 sm:h-36 bg-black flex items-center justify-center overflow-hidden">
                {isVideoFile(p.media_path) ? (
                  <video className="w-full h-full object-cover" controls preload="metadata" src={p.media_path} />
                ) : (
                  <img src={p.media_path} alt="" className="w-full h-full object-cover cursor-zoom-in hover:opacity-90"
                    onClick={() => onLightbox(p.media_path)} />
                )}
              </div>
              <div className="p-2 sm:p-2.5 text-[10.5px] sm:text-[11px] text-white/80 truncate">{p.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* =================================================================
   ANALYTICS
   ================================================================= */
function Analytics({ campaigns, posts, influencers, companyInfluencers }) {
  const totalCampaigns     = campaigns.length;
  const activeCampaigns    = campaigns.filter((c) => c.status === "Active").length;
  const completedCampaigns = campaigns.filter((c) => c.status === "Completed").length;
  const totalInfluencers   = influencers.length;
  const totalCompanyInfs   = companyInfluencers ? companyInfluencers.length : 0;
  const totalPosts         = posts.length;
  const publishedPosts     = posts.filter((p) => p.status === "Published").length;

  const chartStatus = { Active: 0, Completed: 0, Paused: 0, Draft: 0 };
  campaigns.forEach((c) => { chartStatus[c.status] = (chartStatus[c.status] || 0) + 1; });

  const chartCategory = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  influencers.forEach((inf) => {
    const c = (inf.category || "A").toUpperCase();
    chartCategory[c] = (chartCategory[c] || 0) + 1;
  });

  const chartPlatform = {};
  posts.forEach((p) => {
    const pl = p.platform || "Other";
    chartPlatform[pl] = (chartPlatform[pl] || 0) + 1;
  });

  const monthLabels = [], monthValues = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setMonth(d.getMonth() - i);
    const key = d.toISOString().slice(0, 7);
    monthLabels.push(d.toLocaleString("en", { month: "short" }));
    monthValues.push(campaigns.filter((c) => (c.created_at || "").slice(0, 7) === key).length);
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const commonOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "right",
        labels: { color: "#ffffff", padding: 12, boxWidth: 10, boxHeight: 10, font: { size: 10 } },
      },
    },
  };

  const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0, color: "#94A3B8", font: { size: 9 } }, grid: { color: "rgba(255,255,255,0.06)" } },
      x: { grid: { display: false }, ticks: { color: "#94A3B8", font: { size: 9 } } },
    },
  };

  const kpis = [
    { label: "Total Campaigns", value: totalCampaigns, sub: `${activeCampaigns} active`, color: PRIMARY },
    { label: "Total Posts", value: totalPosts, sub: `${publishedPosts} published`, color: "#0EA5E9" },
    { label: "Influencers", value: totalInfluencers, sub: `${totalCompanyInfs} in company list`, color: "#22C55E" },
    {
      label: "Completion Rate",
      value: `${totalCampaigns > 0 ? Math.round((completedCampaigns / totalCampaigns) * 100) : 0}%`,
      sub: `${completedCampaigns} completed`, color: "#F59E0B",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b border-white/10 pb-3 sm:pb-4">
        <h2 className="text-lg sm:text-xl font-black text-white">ANALYTICS</h2>
        <p className="text-[11px] sm:text-xs text-white/50">Campaign-focused KPIs — visual insights</p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-gradient-to-br from-[#0B2738] to-[#081E2C] border border-white/10 p-4 sm:p-5 rounded-2xl shadow-xl space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase">{k.label}</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{k.value}</div>
            <div className="text-[11px] pt-2 border-t border-white/10" style={{ color: k.color }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <ChartCard title="Campaign Status Distribution">
          <Doughnut
            data={{
              labels: Object.keys(chartStatus),
              datasets: [{
                data: Object.values(chartStatus),
                backgroundColor: CHART_PALETTE.slice(0, 4),
                borderColor: "#0B2738", borderWidth: 3,
              }],
            }}
            options={{ ...commonOptions, cutout: "60%" }}
          />
        </ChartCard>

        <ChartCard title="Influencers by Category (Campaign)">
          <Pie
            data={{
              labels: Object.keys(chartCategory).map((c) => "Category " + c),
              datasets: [{
                data: Object.values(chartCategory),
                backgroundColor: CHART_PALETTE,
                borderColor: "#0B2738", borderWidth: 3,
              }],
            }}
            options={commonOptions}
          />
        </ChartCard>

        <ChartCard title="Campaigns (Last 6 Months)">
          <Bar
            data={{
              labels: monthLabels,
              datasets: [{
                label: "Campaigns",
                data: monthValues,
                backgroundColor: "rgba(0, 114, 185, 0.85)",
                borderColor: PRIMARY, borderWidth: 1.5, borderRadius: 8, maxBarThickness: 50,
              }],
            }}
            options={barOptions}
          />
        </ChartCard>

        <ChartCard title="Posts by Platform">
          <Bar
            data={{
              labels: Object.keys(chartPlatform).length ? Object.keys(chartPlatform) : ["No Data"],
              datasets: [{
                label: "Posts",
                data: Object.values(chartPlatform).length ? Object.values(chartPlatform) : [0],
                backgroundColor: "rgba(14, 165, 233, 0.85)",
                borderColor: "#0EA5E9", borderWidth: 1.5, borderRadius: 8, maxBarThickness: 50,
              }],
            }}
            options={{ ...barOptions, indexAxis: "y" }}
          />
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[#0B2738] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
      <h3 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/10 pb-2 sm:pb-3">{title}</h3>
      <div className="h-56 sm:h-64 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* =================================================================
   MODALS
   ================================================================= */
function ModalWrapper({ children, onClose, maxW = "sm:max-w-xl" }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div
        className={`bg-[#0B2738] border border-white/10 w-full ${maxW} rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
      <h3 className="font-extrabold text-white text-sm sm:text-base">{title}</h3>
      <button onClick={onClose} className="p-1.5 -mr-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5" aria-label="Close">
        <Icon.Close className="w-4 h-4" />
      </button>
    </div>
  );
}

function EditCampaignModal({ campaign, onClose, onSave }) {
  const [form, setForm] = useState({
    name: campaign.name, client: campaign.client,
    category: campaign.category || "", start_date: campaign.start_date || "",
    end_date: campaign.end_date || "", status: campaign.status || "Active",
    description: campaign.description || "",
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader title="✏️ Edit Campaign" onClose={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Campaign Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Client *</label>
          <input required value={form.client} onChange={(e) => update("client", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Category</label>
          <input value={form.category} onChange={(e) => update("category", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Start Date</label>
          <input type="date" value={form.start_date} onChange={(e) => update("start_date", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-mono" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">End Date</label>
          <input type="date" value={form.end_date} onChange={(e) => update("end_date", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-mono" />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Status</label>
          <select value={form.status} onChange={(e) => update("status", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-bold">
            {CAMPAIGN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold">Cancel</button>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold">Save</button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function SocialModal({ social, onClose, onSave }) {
  const [links, setLinks] = useState({ ...social });
  const update = (k, v) => setLinks((l) => ({ ...l, [k]: v }));

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader title="🌐 Edit Social Handles" onClose={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(links); }} className="space-y-3 text-xs">
        {SOCIAL_KEYS.map((k) => (
          <div key={k}>
            <label className="block font-bold text-white/80 mb-1">{SOCIAL_LABELS[k]} URL</label>
            <input type="url" value={links[k] || ""} onChange={(e) => update(k, e.target.value)}
              placeholder={`https://${k}.com/yourhandle`}
              className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
          </div>
        ))}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold">Cancel</button>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold">Save</button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function PlatformModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [url, setUrl]   = useState("");
  return (
    <ModalWrapper onClose={onClose} maxW="sm:max-w-lg">
      <ModalHeader title="🚀 Add Platform" onClose={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onAdd(name, url); }} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-white/80 mb-1">Site Name *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g. MG OOH, Brandly, Adsy"
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Campaign URL *</label>
          <input type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/campaign/12345"
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold">Cancel</button>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Add</button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function PostModal({ post, onClose, onSave }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    platform: post?.platform || "Instagram",
    post_type: post?.post_type || "Image",
    post_url: post?.post_url || "",
    media_path: post?.media_path || "",
    caption: post?.caption || "",
    notes: post?.notes || "",
    status: post?.status || "Draft",
    published_date: post?.published_date || todayISO(),
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("media_path", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <ModalWrapper onClose={onClose} maxW="sm:max-w-2xl">
      <ModalHeader title={post ? "✏️ Edit Post" : "+ Add New Post"} onClose={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Title *</label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Platform *</label>
          <select value={form.platform} onChange={(e) => update("platform", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-bold">
            {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Type *</label>
          <select value={form.post_type} onChange={(e) => update("post_type", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-bold">
            {POST_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Post URL</label>
          <input type="url" value={form.post_url} onChange={(e) => update("post_url", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Upload Media</label>
          <input type="file" accept=".jpg,.jpeg,.png,.webp,.mp4"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="w-full text-white/60 bg-[#081E2C] border border-white/15 rounded-xl p-2.5 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#0072B9] file:text-white file:font-bold file:text-[11px]" />
          {form.media_path && (
            <p className="text-[10.5px] text-amber-400 mt-1 truncate">
              {form.media_path.startsWith("data:") ? "New file selected" : `Current: ${form.media_path}`}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Caption</label>
          <textarea rows={3} value={form.caption} onChange={(e) => update("caption", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-white/80 mb-1">Notes</label>
          <textarea rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Date</label>
          <input type="date" value={form.published_date} onChange={(e) => update("published_date", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-mono" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Status</label>
          <select value={form.status} onChange={(e) => update("status", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-bold">
            {POST_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold">Cancel</button>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold">Save</button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function InfluencerModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", handle: "", profile_link: "", followers: 0, category: "A",
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader title="👤 Add Influencer" onClose={onClose} />
      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
        <div>
          <label className="block font-bold text-white/80 mb-1">Full Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Handle *</label>
          <input required value={form.handle} onChange={(e) => update("handle", e.target.value)} placeholder="@handle"
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Profile Link</label>
          <input type="url" value={form.profile_link} onChange={(e) => update("profile_link", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Followers</label>
          <input type="number" value={form.followers} onChange={(e) => update("followers", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-mono" />
        </div>
        <div>
          <label className="block font-bold text-white/80 mb-1">Category *</label>
          <select value={form.category} onChange={(e) => update("category", e.target.value)}
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 font-bold">
            {CATEGORIES.map((c) => <option key={c} value={c}>Category {c}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold">Cancel</button>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0072B9] hover:brightness-110 text-white font-bold">Add</button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function ImportModal({ onClose, onImport }) {
  const [sheetUrl, setSheetUrl] = useState("");
  const [csvRaw, setCsvRaw]     = useState("");
  const [file, setFile]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let rows = [];

      if (sheetUrl.trim()) {
        const csvText = await fetchSheetCsv(sheetUrl.trim());
        rows = parseCsvRows(csvText);
      } else if (file) {
        const ext = (file.name.split(".").pop() || "").toLowerCase();
        if (ext === "csv") {
          const text = await file.text();
          rows = parseCsvRows(text);
        } else if (ext === "xlsx" || ext === "xls") {
          rows = await parseExcelFile(file);
        } else {
          throw new Error("Unsupported file type. Use .csv, .xlsx or .xls");
        }
      } else if (csvRaw.trim()) {
        rows = parseCsvRows(csvRaw);
      } else {
        throw new Error("Please provide a Google Sheet URL, upload a file, or paste CSV.");
      }

      if (!rows.length) throw new Error("No valid data found in the source.");
      onImport(rows);
    } catch (err) {
      setError(err.message || "Import failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader title="📊 Import Influencers" onClose={onClose} />
      <form onSubmit={submit} className="space-y-4 text-xs">
        <div className="p-3 sm:p-4 rounded-xl bg-[#0072B9]/10 border border-[#0072B9]/30 space-y-2">
          <label className="block font-bold text-[#3FA9F5]">🔗 Google Sheets URL</label>
          <input
            type="url"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="w-full bg-[#081E2C] border border-white/15 text-white rounded-xl p-2.5 text-xs"
          />
          <p className="text-[10px] text-white/50 leading-relaxed">
            Sheet ko <strong className="text-white/80">"Anyone with the link → Viewer"</strong> share karo
            (ya File → Share → Publish to web).
          </p>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-[#081E2C] border border-white/10 space-y-2">
          <label className="block font-bold text-emerald-400">📁 CSV / Excel File</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-white/60 bg-[#081E2C] border border-white/15 rounded-xl p-2.5 file:mr-2 sm:file:mr-3 file:py-1.5 file:px-2 sm:file:px-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:font-bold file:text-[11px]"
          />
          {file && (
            <p className="text-[10.5px] text-emerald-300 break-all">Selected: {file.name}</p>
          )}
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-[#081E2C] border border-white/10 space-y-2">
          <label className="block font-bold text-white/80">📋 Or Paste CSV</label>
          <textarea
            rows={4}
            value={csvRaw}
            onChange={(e) => setCsvRaw(e.target.value)}
            placeholder="1, John Doe, @johndoe, https://instagram.com/johndoe, 1.5M, A"
            className="w-full bg-[#081E2C] border border-white/15 text-white font-mono p-2.5 sm:p-3 rounded-xl text-[11px] sm:text-xs"
          />
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10.5px] text-white/60 leading-relaxed">
          <strong className="text-white/80 block mb-1">Expected columns:</strong>
          S.No | Name | Handle | Profile Link | Followers (1.5M / 500K / 1500) | Category (A–F)
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-[11px] font-semibold">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 text-white/80 font-bold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {loading ? "Importing…" : "Import"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function ViewPostModal({ post, onClose, onLightbox }) {
  const isVid = isVideoFile(post.media_path);
  return (
    <ModalWrapper onClose={onClose} maxW="sm:max-w-2xl">
      <ModalHeader title="Post Details" onClose={onClose} />
      <div className="space-y-3 text-xs">
        {post.media_path ? (
          isVid
            ? <video className="w-full max-h-64 sm:max-h-72 rounded-xl bg-black" controls src={post.media_path} />
            : <img src={post.media_path} alt="" className="w-full max-h-64 sm:max-h-72 object-contain rounded-xl bg-black cursor-zoom-in"
                onClick={() => onLightbox(post.media_path)} />
        ) : (
          <div className="p-4 rounded-xl bg-[#081E2C] border border-white/10 text-white/40 text-[11px] font-mono text-center">
            No media
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            ["Title", `${post.title}`],
            ["Platform / Type", `${post.platform} | ${post.post_type}`],
            ["Status", post.status],
            ["Date", post.published_date || "—"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#081E2C] p-2.5 sm:p-3 rounded-xl border border-white/10">
              <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">{k}</span>
              <span className="text-white font-bold text-[11px] sm:text-xs break-words">{v}</span>
            </div>
          ))}
        </div>
        {post.caption && (
          <div className="bg-[#081E2C] p-3 rounded-xl border border-white/10">
            <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">Caption</span>
            <p className="text-white/80 leading-relaxed">{post.caption}</p>
          </div>
        )}
        {post.notes && (
          <div className="bg-[#081E2C] p-3 rounded-xl border border-white/10">
            <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">Notes</span>
            <p className="text-white/80 leading-relaxed">{post.notes}</p>
          </div>
        )}
        {post.post_url && (
          <div className="bg-[#081E2C] p-3 rounded-xl border border-white/10">
            <span className="block text-[10px] uppercase font-bold text-white/40 mb-1">URL</span>
            <a href={post.post_url} target="_blank" rel="noopener noreferrer"
              className="text-[#3FA9F5] hover:underline break-all">{post.post_url}</a>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}