import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import {
  FOOTER_SERVICES,
  NAV_LINKS,
} from '../data/agencyData';
import { CONTACT_INFO } from '../data/contactPageData';
import { SocialIconRow } from './contact/SocialIconRow';
import type { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute, sectionHash?: string) => void;
  onSelectService: (serviceTitle: string) => void;
  onStartProject: () => void;
}

export function Footer({
  onNavigate,
  onSelectService,
  onStartProject,
}: FooterProps) {
  const handleLinkClick = (label: string, href: string) => {
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

  return (
    <footer className="border-t border-white/[0.08] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#home');
              }}
              className="font-display inline-block text-lg font-semibold tracking-[0.14em] text-white"
            >
              WINNER <span className="wordmark-gradient">DESIGNS</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-[#A3A3A3]">
              Your Partner for Digital Wins.
            </p>

            <div className="mt-5 space-y-2.5">
              <a
                href={CONTACT_INFO.mailtoHref}
                className="flex items-center gap-2.5 text-sm text-[#A3A3A3] transition-colors duration-200 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/65" strokeWidth={1.6} />
                <span className="break-all">{CONTACT_INFO.email}</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#A3A3A3] transition-colors duration-200 hover:text-[#14E3A8]"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#14E3A8]" strokeWidth={1.6} />
                <span className="tabular-nums">WhatsApp: {CONTACT_INFO.whatsappDisplay}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="mt-7 inline-flex min-h-[40px] cursor-pointer items-center gap-2 border-b border-white/25 pb-1 text-xs font-semibold tracking-[0.08em] text-white uppercase transition-colors duration-200 hover:border-white"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((item) => {
                const routeMap: Record<string, string> = {
                  Home: '/',
                  About: '/about',
                  Services: '/services',
                  Portfolio: '/portfolio',
                  Contact: '/contact',
                };
                const href = routeMap[item.label] ?? item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.label, item.href);
                      }}
                      className="text-sm text-[#A3A3A3] transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.serviceId}>
                  <button
                    type="button"
                    onClick={() => onSelectService(item.targetTitle)}
                    className="cursor-pointer text-left text-sm text-[#A3A3A3] transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Connect
            </h3>
            <SocialIconRow variant="compact" />
          </div>
        </div>

        {/* Quiet Copyright Strip */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-[#A3A3A3] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Winner Designs. All rights reserved.</p>
          <p>Nigeria · Serving Clients Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
