import React, { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { company, logoUrl, navLinks } from '@/data/site';
import { cn } from '@/lib/utils';

function Logo({ dark }) {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${company.name} home`}>
      <img
        src={logoUrl}
        alt={company.name}
        className={cn('h-10 w-auto object-contain sm:h-11', !dark && 'brightness-0 invert')}
      />
    </Link>
  );
}

function linkClass(scrolled, isActive) {
  return cn(
    'relative text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors',
    scrolled
      ? isActive
        ? 'text-[#0072B9]'
        : 'text-[#071923]/70 hover:text-[#0072B9]'
      : isActive
        ? 'text-white'
        : 'text-white/75 hover:text-white',
    isActive && 'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#0072B9]'
  );
}

// Detect the Contact Us link inside navLinks
const isContactLink = (l) =>
  l?.href === '/contact-us/' || l?.href === '/contact-us' || /contact\s*us/i.test(l?.label || '');

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const services = navLinks.find((l) => l.children);
  const hasContactInNavLinks = navLinks.some(isContactLink);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'bg-white shadow-[0_1px_0_0_rgba(7,25,35,0.08)]' : 'bg-transparent'
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 transition-all duration-300 sm:px-8',
          scrolled ? 'h-16' : 'h-20 md:h-24'
        )}
      >
        <Logo dark={scrolled || open} />

        {/* ---------------- DESKTOP NAV ---------------- */}
        <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((l) => {
            const item = l.children ? (
              <div key={l.label} className="relative group">
                <NavLink
                  to={l.href}
                  className={({ isActive }) =>
                    cn(
                      linkClass(scrolled || open, isActive || location.pathname.startsWith('/services')),
                      'inline-flex items-center gap-1'
                    )
                  }
                >
                  {l.label}
                  <ChevronDown size={14} className="opacity-70 transition-transform group-hover:rotate-180" />
                </NavLink>
                <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="border border-[#071923]/08 bg-white p-2 shadow-xl shadow-[#071923]/10">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        className={cn(
                          'block px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#071923]/75 transition-colors hover:bg-[#EAF6FC] hover:text-[#0072B9]',
                          location.pathname === c.href && 'bg-[#EAF6FC] text-[#0072B9]'
                        )}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={l.label}
                to={l.href}
                end={l.href === '/'}
                className={({ isActive }) => linkClass(scrolled || open, isActive)}
              >
                {l.label}
              </NavLink>
            );

            // Inject "Dashboard" right after Contact Us
            return (
              <Fragment key={`desktop-${l.label ?? l.href}`}>
                {item}
                {isContactLink(l) && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => linkClass(scrolled || open, isActive)}
                  >
                    Dashboard
                  </NavLink>
                )}
              </Fragment>
            );
          })}

          {/* Fallback: if Contact Us is not in navLinks, show Dashboard at the end */}
          {!hasContactInNavLinks && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => linkClass(scrolled || open, isActive)}
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* ---------------- RIGHT ACTIONS ---------------- */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact-us/"
            className="hidden bg-[#0072B9] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-px hover:bg-[#005a92] active:scale-[0.98] sm:inline-block"
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={cn(
              'grid h-11 w-11 place-items-center border lg:hidden',
              scrolled || open ? 'border-[#071923]/15 text-[#071923]' : 'border-white/25 text-white'
            )}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {open && (
        <div className="max-h-[80dvh] overflow-y-auto border-t border-[#071923]/08 bg-white px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((l) => {
              const item = l.children ? (
                <div key={l.label} className="border-b border-[#071923]/08">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold uppercase tracking-tight text-[#071923]"
                  >
                    {l.label}
                    <ChevronDown size={18} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
                  </button>
                  {servicesOpen && (
                    <div className="pb-3 pl-3">
                      <Link to={l.href} className="block py-2 text-sm font-medium text-[#0072B9]">
                        All Services
                      </Link>
                      {services.children.map((c) => (
                        <Link key={c.href} to={c.href} className="block py-2 text-sm text-[#071923]/70">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className="border-b border-[#071923]/08 py-4 text-lg font-semibold uppercase tracking-tight text-[#071923]"
                >
                  {l.label}
                </Link>
              );

              // Inject "Dashboard" right after Contact Us in mobile too
              return (
                <Fragment key={`mobile-${l.label ?? l.href}`}>
                  {item}
                  {isContactLink(l) && (
                    <Link
                      to="/dashboard"
                      className="border-b border-[#071923]/08 py-4 text-lg font-semibold uppercase tracking-tight text-[#071923]"
                    >
                      Dashboard
                    </Link>
                  )}
                </Fragment>
              );
            })}

            {/* Fallback for mobile if Contact Us is not in navLinks */}
            {!hasContactInNavLinks && (
              <Link
                to="/dashboard"
                className="border-b border-[#071923]/08 py-4 text-lg font-semibold uppercase tracking-tight text-[#071923]"
              >
                Dashboard
              </Link>
            )}
          </nav>
          <Link
            to="/contact-us/"
            className="mt-6 block bg-[#0072B9] px-6 py-4 text-center text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white"
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  );
}