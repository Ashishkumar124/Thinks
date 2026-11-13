import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { budgetOptions, company, serviceOptions } from '@/data/site';

const empty = { name: '', company: '', phone: '', email: '', service: '', budget: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.service || form.service === 'none') e.service = 'Select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSent(true);
    setForm(empty);
  }

  const field =
    'w-full border border-[#071923]/15 bg-white px-4 py-3 text-sm text-[#071923] outline-none transition-colors focus:border-[#0072B9]';

  return (
    <Layout
      title="Contact Us | Think Digital Media"
      description="Contact Think Digital Media for outdoor, digital, print, events, video and branding campaigns across India."
    >
      <PageHero
        eyebrow="Contact"
        title="LET'S TALK ABOUT YOUR NEXT CAMPAIGN."
        description="Share the brief. We will come back with a clear next step."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="tdm-display text-2xl text-[#071923] sm:text-3xl">Send enquiry</h2>
            {sent && (
              <p className="mt-4 border border-[#0072B9]/30 bg-[#EAF6FC] px-4 py-3 text-sm text-[#071923]" role="status">
                Thank you. Your enquiry has been noted. We will respond shortly.
              </p>
            )}
            <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
              {[
                { key: 'name', label: 'Name', required: true },
                { key: 'company', label: 'Company' },
                { key: 'phone', label: 'Phone', required: true, type: 'tel' },
                { key: 'email', label: 'Email', required: true, type: 'email' },
              ].map((f) => (
                <label key={f.key} className="block space-y-2">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#071923]/70">
                    {f.label}
                    {f.required ? ' *' : ''}
                  </span>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    className={field}
                    aria-invalid={!!errors[f.key]}
                  />
                  {errors[f.key] && <span className="block text-xs text-red-600">{errors[f.key]}</span>}
                </label>
              ))}

              <label className="block space-y-2">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#071923]/70">Service *</span>
                <select
                  value={form.service || 'none'}
                  onChange={(e) => update('service', e.target.value === 'none' ? '' : e.target.value)}
                  className={field}
                >
                  <option value="none">Select service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && <span className="block text-xs text-red-600">{errors.service}</span>}
              </label>

              <label className="block space-y-2">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#071923]/70">Budget</span>
                <select
                  value={form.budget || 'none'}
                  onChange={(e) => update('budget', e.target.value === 'none' ? '' : e.target.value)}
                  className={field}
                >
                  <option value="none">Select budget</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2 sm:col-span-2">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#071923]/70">Message *</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className={field}
                />
                {errors.message && <span className="block text-xs text-red-600">{errors.message}</span>}
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="min-h-[52px] bg-[#0072B9] px-10 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#005a92] active:scale-[0.98]"
                >
                  Send enquiry
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-8">
            <div className="bg-[#071923] p-8 text-white">
              <h2 className="tdm-display text-2xl">Get in touch</h2>
              <ul className="mt-8 space-y-6 text-sm text-white/70">
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[#4FB4E8]" />
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white">
                    {company.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#4FB4E8]" />
                  <a href={`mailto:${company.email}`} className="hover:text-white">
                    {company.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#4FB4E8]" />
                  <span>
                    {company.address}
                    <br />
                    Service area: {company.reach}
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-2">
                {company.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/20 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/80 hover:border-[#0072B9]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-[#071923]/10 bg-[#EAF6FC] p-2">
              <div
                className="flex aspect-[16/11] items-center justify-center bg-[#071923]/5 text-center text-sm text-[#071923]/50"
                role="img"
                aria-label="Map placeholder for Think Digital Media office location"
              >
                Google Maps placeholder
                <br />
                {company.address}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
