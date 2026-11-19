import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar, type AppRoute } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyUsSection } from './components/WhyUsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { ProjectInquiryDrawer } from './components/ProjectInquiryDrawer';
import { ProjectPreviewModal } from './components/ProjectPreviewModal';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';
import { PortfolioProject, SERVICES } from './data/agencyData';

function getInitialRoute(): AppRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  if (path === '/about' || path.startsWith('/about/')) return 'about';
  if (path === '/services' || path.startsWith('/services/')) return 'services';
  if (path === '/portfolio' || path.startsWith('/portfolio/')) return 'portfolio';
  if (path === '/contact' || path.startsWith('/contact/')) return 'contact';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(getInitialRoute);
  const [pendingSectionHash, setPendingSectionHash] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(SERVICES[0].title);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route === 'about') {
      document.title = 'About Us — Winner Designs | Your Partner for Digital Wins';
    } else if (route === 'services') {
      document.title = 'Services — Winner Designs | Your Partner for Digital Wins';
    } else if (route === 'portfolio') {
      document.title = 'Portfolio — Winner Designs | Your Partner for Digital Wins';
    } else if (route === 'contact') {
      document.title = 'Contact — Winner Designs | Your Partner for Digital Wins';
    } else {
      document.title = 'Winner Designs — Your Partner for Digital Wins';
    }
  }, [route]);

  useEffect(() => {
    if (pendingSectionHash) {
      const hashToScroll = pendingSectionHash;
      setPendingSectionHash(null);
      const timer = window.setTimeout(() => {
        const target = document.querySelector(hashToScroll);
        if (target) {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      }, 80);
      return () => window.clearTimeout(timer);
    }
  }, [route, pendingSectionHash]);

  const handleNavigate = (targetRoute: AppRoute, sectionHash?: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nextPath =
      targetRoute === 'about'
        ? '/about'
        : targetRoute === 'services'
          ? '/services'
          : targetRoute === 'portfolio'
            ? '/portfolio'
            : targetRoute === 'contact'
              ? '/contact'
              : '/';

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    if (targetRoute !== route) {
      setRoute(targetRoute);
      if (sectionHash && sectionHash !== '#home') {
        setPendingSectionHash(sectionHash);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      return;
    }

    if (sectionHash && sectionHash !== '#home') {
      const target = document.querySelector(sectionHash);
      if (target) {
        target.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      const normalized = serviceName.toLowerCase();
      const aliasMap: Record<string, string> = {
        'creative design': 'Brand & Graphic Design',
        'digital growth solutions': 'Email Marketing & Lead Generation',
        'digital solutions': 'Web Applications & Digital Solutions',
      };
      const aliasedTitle = aliasMap[normalized];
      const matched = aliasedTitle
        ? SERVICES.find((s) => s.title === aliasedTitle)
        : SERVICES.find(
            (s) =>
              s.title.toLowerCase().includes(normalized) ||
              s.shortTitle.toLowerCase().includes(normalized) ||
              normalized.includes(s.shortTitle.toLowerCase())
          );
      setSelectedService(matched ? matched.title : SERVICES[0].title);
    }
    setDrawerOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar
          currentRoute={route}
          onNavigate={handleNavigate}
          onStartProject={handleOpenInquiry}
        />

        {route === 'about' ? (
          <AboutPage
            onStartProject={handleOpenInquiry}
            onExploreServices={() => handleNavigate('services')}
          />
        ) : route === 'services' ? (
          <ServicesPage onStartProject={handleOpenInquiry} />
        ) : route === 'portfolio' ? (
          <PortfolioPage
            onStartProject={handleOpenInquiry}
            onNavigateToServices={(hash) => handleNavigate('services', hash)}
          />
        ) : route === 'contact' ? (
          <ContactPage onBackToWebsite={() => handleNavigate('home')} />
        ) : (
          <main>
            <Hero onStartProject={handleOpenInquiry} />
            <TrustStrip />
            <AboutSection onDiscoverAbout={() => handleNavigate('about')} />
            <ServicesSection onSelectService={handleOpenInquiry} />
            <WhyUsSection />
            <PortfolioSection onSelectProject={setActiveProject} />
            <FinalCtaSection onStartProject={handleOpenInquiry} />
          </main>
        )}

        <Footer
          onNavigate={handleNavigate}
          onSelectService={handleOpenInquiry}
          onStartProject={() => handleOpenInquiry()}
        />

        <ProjectInquiryDrawer
          isOpen={drawerOpen}
          initialService={selectedService}
          onClose={() => setDrawerOpen(false)}
        />

        <ProjectPreviewModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onStartSimilar={(category) => handleOpenInquiry(category)}
        />
      </div>
    </MotionConfig>
  );
}
