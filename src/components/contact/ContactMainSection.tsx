import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import {
  CONTACT_BUDGET_OPTIONS,
  CONTACT_INFO,
  CONTACT_SERVICE_OPTIONS,
} from '../../data/contactPageData';
import { SocialIconRow } from './SocialIconRow';

interface ContactMainSectionProps {
  onBackToWebsite: () => void;
}

interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  budget: string;
  projectDetails: string;
  startDate: string;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  service?: string;
  projectDetails?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM_STATE: ContactFormState = {
  fullName: '',
  email: '',
  phone: '',
  businessName: '',
  service: CONTACT_SERVICE_OPTIONS[0],
  budget: '',
  projectDetails: '',
  startDate: '',
};

export function ContactMainSection({ onBackToWebsite }: ContactMainSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<{
    message: string;
    isUnconfigured?: boolean;
  } | null>(null);

  const validate = (): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.service.trim()) {
      nextErrors.service = 'Please select a service you are interested in.';
    }
    if (!form.projectDetails.trim() || form.projectDetails.trim().length < 10) {
      nextErrors.projectDetails =
        'Please share a brief overview of your project (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          businessName: form.businessName.trim(),
          service: form.service,
          budget: form.budget,
          projectDetails: form.projectDetails.trim(),
          startDate: form.startDate,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
        message?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        setSubmitError({
          message:
            payload?.message ||
            'Your enquiry could not be delivered right now. Please try again or reach out via WhatsApp or email.',
          isUnconfigured: payload?.code === 'EMAIL_SERVICE_UNCONFIGURED',
        });
        return;
      }

      setSubmitSuccess(true);
      setForm(INITIAL_FORM_STATE);
    } catch {
      setSubmitError({
        message:
          'Unable to connect to the submission server. Please try again or contact us directly via email or WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildMailtoFallbackHref = () => {
    const subject = encodeURIComponent(
      `Project Enquiry: ${form.service || 'Winner Designs'}`
    );
    const bodyLines = [
      `Name: ${form.fullName || '-'}`,
      `Email: ${form.email || '-'}`,
      form.phone ? `Phone: ${form.phone}` : '',
      form.businessName ? `Business: ${form.businessName}` : '',
      `Service: ${form.service || '-'}`,
      form.budget ? `Estimated Budget: ${form.budget}` : '',
      form.startDate ? `Preferred Start Date: ${form.startDate}` : '',
      '',
      'Project Details:',
      form.projectDetails || '',
    ]
      .filter(Boolean)
      .join('\n');
    return `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;
  };

  return (
    <section
      id="contact-main"
      className="border-t border-white/[0.08] bg-[#111111] py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* LEFT COLUMN: Contact Information */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 lg:col-span-5"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[#A3A3A3] uppercase">
              Direct Channels
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
              Let&apos;s Connect.
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-[#A3A3A3]">
              Whether you need a website, intelligent automation, or a complete digital solution, we&apos;re ready to hear from you.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            {/* Email Card */}
            <a
              href={CONTACT_INFO.mailtoHref}
              className="group relative block overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-6 transition-colors duration-200 hover:border-white/25"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FF2E93, #8B3DFF)',
                }}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/90">
                    <Mail className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
                      Email Us
                    </p>
                    <p className="font-display mt-1.5 break-all text-base font-medium text-white sm:text-lg">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  strokeWidth={1.75}
                />
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={CONTACT_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-sm border border-white/[0.08] bg-[#151515] p-6 transition-colors duration-200 hover:border-[#14E3A8]/40"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #18C8F0, #14E3A8)',
                }}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#14E3A8]/25 bg-[#14E3A8]/10 text-[#14E3A8]">
                    <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
                      Chat With Us
                    </p>
                    <p className="font-display mt-1.5 text-base font-medium text-white tabular-nums sm:text-lg">
                      {CONTACT_INFO.whatsappDisplay}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#14E3A8]"
                  strokeWidth={1.75}
                />
              </div>
            </a>

            {/* Location Card */}
            <div className="rounded-sm border border-white/[0.08] bg-[#151515] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-[#111111] text-white/90">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
                    Location
                  </p>
                  <p className="font-display mt-1.5 text-base font-medium text-white sm:text-lg">
                    {CONTACT_INFO.location}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#A3A3A3]">
                    {CONTACT_INFO.locationSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Configurable Social Platforms */}
          <div className="border-t border-white/[0.08] pt-7">
            <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#A3A3A3] uppercase">
              Social Media · Winner Designs
            </p>
            <SocialIconRow variant="cards" />
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Project Enquiry Form */}
        <motion.div
          id="contact-form"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.65,
            delay: prefersReducedMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="scroll-mt-24 lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-sm border border-white/[0.1] bg-[#151515] p-7 sm:p-10 lg:p-11">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FF2E93, #FF9A1F, #8B3DFF, #2F6BFF)',
              }}
            />

            {submitSuccess ? (
              <div className="py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#14E3A8]/30 bg-[#14E3A8]/10 text-[#14E3A8]">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <h3 className="font-display mt-6 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  THANK YOU FOR REACHING OUT!
                </h3>

                <p className="mt-4 max-w-lg text-base leading-[1.75] text-[#A3A3A3]">
                  Your project enquiry has been received. We appreciate your interest in Winner Designs and look forward to learning more about your project.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      onBackToWebsite();
                    }}
                    className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
                  >
                    BACK TO WEBSITE
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-sm border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/35"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-white/[0.08] pb-6">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
                    Tell Us About Your Project.
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
                    Share a few details about what you need. We&apos;ll review your enquiry and get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        Full Name <span className="text-[#FF2E93]">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        aria-invalid={Boolean(errors.fullName)}
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-xs text-[#FF4B4B]">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        Email Address <span className="text-[#FF2E93]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-[#FF4B4B]">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Business Name */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="Enter your phone number"
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-business"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        Business Name
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        value={form.businessName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            businessName: e.target.value,
                          }))
                        }
                        placeholder="Your company or brand name"
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service & Estimated Budget */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        What service are you interested in?{' '}
                        <span className="text-[#FF2E93]">*</span>
                      </label>
                      <select
                        id="contact-service"
                        required
                        value={form.service}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, service: e.target.value }))
                        }
                        aria-invalid={Boolean(errors.service)}
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      >
                        {CONTACT_SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#151515]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-2 text-xs text-[#FF4B4B]">{errors.service}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                      >
                        Estimated Project Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={form.budget}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, budget: e.target.value }))
                        }
                        className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white transition-colors focus:border-[#2F6BFF] focus:outline-none"
                      >
                        <option value="" className="bg-[#151515]">
                          Select an estimated budget
                        </option>
                        {CONTACT_BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#151515]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Preferred Start Date */}
                  <div>
                    <label
                      htmlFor="contact-start-date"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Preferred Project Start Date
                    </label>
                    <input
                      id="contact-start-date"
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, startDate: e.target.value }))
                      }
                      className="mt-2.5 w-full rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white transition-colors focus:border-[#2F6BFF] focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  {/* Row 5: Project Details */}
                  <div>
                    <label
                      htmlFor="contact-details"
                      className="block text-xs font-semibold tracking-[0.12em] text-white/90 uppercase"
                    >
                      Project Details <span className="text-[#FF2E93]">*</span>
                    </label>
                    <textarea
                      id="contact-details"
                      rows={5}
                      required
                      value={form.projectDetails}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          projectDetails: e.target.value,
                        }))
                      }
                      placeholder="Tell us about your business, what you want to achieve, and how we can help..."
                      aria-invalid={Boolean(errors.projectDetails)}
                      className="mt-2.5 w-full resize-y rounded-sm border border-white/15 bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#A3A3A3]/55 transition-colors focus:border-[#2F6BFF] focus:outline-none"
                    />
                    {errors.projectDetails && (
                      <p className="mt-2 text-xs text-[#FF4B4B]">
                        {errors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* Honest Error & Fallback Panel */}
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
                        <div className="text-xs leading-relaxed text-white/90">
                          <p className="font-semibold text-white">
                            Submission Could Not Be Delivered Automatically
                          </p>
                          <p className="mt-1 text-[#A3A3A3]">
                            {submitError.message}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <a
                              href={buildMailtoFallbackHref()}
                              className="inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 text-xs font-semibold text-white hover:border-white"
                            >
                              <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                              <span>Send via Email App</span>
                            </a>
                            <a
                              href={CONTACT_INFO.whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border-b border-[#14E3A8]/60 pb-0.5 text-xs font-semibold text-[#14E3A8] hover:border-[#14E3A8]"
                            >
                              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                              <span>Send via WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy Reassurance + Submit Button */}
                  <div className="flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
                    <p className="max-w-xs text-xs leading-relaxed text-[#A3A3A3]">
                      Your information is kept private and will only be used to respond to your enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex min-h-[50px] shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-sm bg-white px-7 py-3.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Enquiry</span>
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.75}
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
