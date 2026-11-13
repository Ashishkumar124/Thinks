/* apps/web/src/pages/api/data.js */
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "store.json");

const EMPTY = {
  campaigns: [],
  influencers: [],
  campaignInfluencers: [],
  posts: [],
  notifications: [],
  companyInfluencers: [],
};

async function readData() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch (e) {
    if (e.code !== "ENOENT") console.error("[store] read error:", e.message);
    return { ...EMPTY };
  }
}

async function writeData(data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = FILE + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, FILE);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "GET") {
    const data = await readData();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    try {
      const merged = { ...(await readData()) };
      for (const k of Object.keys(EMPTY)) {
        if (k in req.body) merged[k] = req.body[k];
      }
      await writeData(merged);
      console.log("[store] saved keys:", Object.keys(req.body).join(", "));
      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error("[store] write error:", e);
      return res.status(500).json({ ok: false, error: String(e) });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}