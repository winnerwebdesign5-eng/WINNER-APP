import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/agencyData';

export type AppRoute = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, sectionHash?: string) => void;
  onStartProject: (defaultService?: string) => void;
}

export function Navbar({
  currentRoute,
  onNavigate,
  onStartProject,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (label: string, href: string) => {
    setMobileOpen(false);
    if (label === 'About') {
      onNavigate('about');
      return;
    }
    if (label === 'Services') {
      onNavigate('services');
      return;
    }
    if (label === 'Portfolio') {
      onNavigate('portfolio');
      return;
    }
    if (label === 'Contact') {
      onNavigate('contact');
      return;
    }
    if (label === 'Home') {
      onNavigate('home', '#home');
      return;
    }
    onNavigate('home', href);
  };

  const isLinkActive = (label: string) => {
    if (label === 'About' && currentRoute === 'about') return true;
    if (label === 'Services' && currentRoute === 'services') return true;
    if (label === 'Portfolio' && currentRoute === 'portfolio') return true;
    if (label === 'Contact' && currentRoute === 'contact') return true;
    if (label === 'Home' && currentRoute === 'home') return true;
    return false;
  };

  const getHrefForItem = (label: string, fallbackHref: string) => {
    if (label === 'About') return '/about';
    if (label === 'Services') return '/services';
    if (label === 'Portfolio') return '/portfolio';
    if (label === 'Contact') return '/contact';
    if (label === 'Home') return '/';
    return fallbackHref;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-white/[0.08] bg-[#0A0A0A]/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:h-[72px] lg:px-10">
        {/* Zone 1: Single-element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Home', '#home');
          }}
          className="font-display whitespace-nowrap shrink-0 text-[15px] font-semibold tracking-[0.14em] text-white transition-opacity duration-200 hover:opacity-90 lg:text-base"
        >
          WINNER <span className="wordmark-gradient">DESIGNS</span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex lg:gap-9"
        >
          {NAV_LINKS.map((item) => {
            const active = isLinkActive(item.label);
            const targetHref = getHrefForItem(item.label, item.href);
            return (
              <a
                key={item.href}
                href={targetHref}
                aria-current={active ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.label, item.href);
                }}
                className={`group relative whitespace-nowrap shrink-0 py-1 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-white' : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-[#FF2E93] via-[#FF9A1F] to-[#2F6BFF] transition-transform duration-200 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onStartProject()}
            className="group hidden cursor-pointer items-center gap-2 whitespace-nowrap shrink-0 rounded-sm border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-[0.06em] text-white transition-all duration-200 hover:border-white/30 hover:bg-white hover:text-[#0A0A0A] md:inline-flex"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-white/10 bg-[#151515] text-white transition-colors duration-200 hover:border-white/25 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-lg md:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="mx-auto flex max-w-7xl flex-col px-6 py-6"
            >
              <div className="flex flex-col divide-y divide-white/[0.06]">
                {NAV_LINKS.map((item) => {
                  const active = isLinkActive(item.label);
                  const targetHref = getHrefForItem(item.label, item.href);
                  return (
                    <a
                      key={item.href}
                      href={targetHref}
                      aria-current={active ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.label, item.href);
                      }}
                      className={`flex min-h-[48px] items-center justify-between text-base font-medium transition-colors ${
                        active ? 'text-white' : 'text-[#A3A3A3] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span>{item.label}</span>
                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-px w-6 bg-gradient-to-r from-[#FF2E93] to-[#2F6BFF]"
                          />
                        )}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/40" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onStartProject();
                  }}
                  className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
                >
                  <span>Let's Work Together</span>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
