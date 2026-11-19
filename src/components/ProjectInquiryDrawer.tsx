import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  X,
} from 'lucide-react';
import { SERVICES } from '../data/agencyData';
import { CONTACT_INFO } from '../data/contactPageData';

interface ProjectInquiryDrawerProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  brief?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProjectInquiryDrawer({
  isOpen,
  initialService,
  onClose,
}: ProjectInquiryDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || SERVICES[0].title);
  const [brief, setBrief] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    setErrors({});
    setSubmitError(null);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!brief.trim() || brief.trim().length < 12) {
      nextErrors.brief = 'Please share a brief overview of your project (at least 12 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitError(null);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim(),
          service,
          projectDetails: brief.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        setSubmitError(
          payload?.message ||
            'Your enquiry could not be delivered right now. Please contact us directly via email or WhatsApp.'
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        'Unable to reach the submission server. Please reach out directly via email or WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Project Enquiry: ${service}`
  )}&body=${encodeURIComponent(
    `Name: ${name || '-'}\nEmail: ${email || '-'}\nService: ${service}\n\nProject Overview:\n${brief}`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-lg flex-col justify-between overflow-y-auto border-l border-white/[0.08] bg-[#111111] p-6 sm:p-10"
          >
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-[#A3A3A3] uppercase">
                    Project Enquiry
                  </p>
                  <h2
                    id="inquiry-drawer-title"
                    className="font-display mt-2 text-2xl font-semibold tracking-[-0.02em] text-white"
                  >
                    Start a Project
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close project enquiry panel"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-white/10 bg-[#151515] text-[#A3A3A3] transition-colors hover:border-white/25 hover:text-white"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              {submitted ? (
                <div className="mt-10 rounded-sm border border-white/[0.08] bg-[#151515] p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-[#14E3A8]/30 bg-[#14E3A8]/10 text-[#14E3A8]">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold text-white">
                    THANK YOU FOR REACHING OUT!
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[#A3A3A3]">
                    Thank you, {name}. Your project enquiry for{' '}
                    <span className="text-white">{service}</span> has been received. We look forward to building something exceptional with you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setBrief('');
                      setSubmitted(false);
                      onClose();
                    }}
                    className="mt-7 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm bg-white px-6 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-medium tracking-[0.12em] text-[#A3A3A3] uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#151515] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/50 transition-colors focus:border-white/40 focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs text-[#FF4B4B]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-medium tracking-[0.12em] text-[#A3A3A3] uppercase"
                    >
                      Email Address
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#151515] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/50 transition-colors focus:border-white/40 focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs text-[#FF4B4B]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-service"
                      className="block text-xs font-medium tracking-[0.12em] text-[#A3A3A3] uppercase"
                    >
                      Area of Interest
                    </label>
                    <select
                      id="inquiry-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#151515] px-4 py-3 text-sm text-white transition-colors focus:border-white/40 focus:outline-none"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title} className="bg-[#151515]">
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-brief"
                      className="block text-xs font-medium tracking-[0.12em] text-[#A3A3A3] uppercase"
                    >
                      Project Overview
                    </label>
                    <textarea
                      id="inquiry-brief"
                      rows={4}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Tell us about your goals, timeline, and what you want to achieve."
                      className="mt-2.5 w-full resize-none rounded-sm border border-white/15 bg-[#151515] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/50 transition-colors focus:border-white/40 focus:outline-none"
                    />
                    {errors.brief && (
                      <p className="mt-2 text-xs text-[#FF4B4B]">{errors.brief}</p>
                    )}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-sm border border-[#FF4B4B]/40 bg-[#FF4B4B]/10 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4B4B]"
                          strokeWidth={1.75}
                        />
                        <div className="text-xs leading-relaxed text-[#A3A3A3]">
                          <p className="font-semibold text-white">
                            Could Not Send Automatically
                          </p>
                          <p className="mt-1">{submitError}</p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <a
                              href={mailtoFallbackHref}
                              className="inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 font-semibold text-white hover:border-white"
                            >
                              <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                              <span>Send via Email App</span>
                            </a>
                            <a
                              href={CONTACT_INFO.whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border-b border-[#14E3A8]/60 pb-0.5 font-semibold text-[#14E3A8] hover:border-[#14E3A8]"
                            >
                              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all duration-200 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                        <span>Sending Project Brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <p className="mt-8 border-t border-white/[0.08] pt-5 text-xs text-[#A3A3A3]">
              Winner Designs · Your Partner for Digital Wins.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
