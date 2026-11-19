import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePort(): number {
  const portFlagIndex = process.argv.findIndex((arg) => arg === '--port');
  if (portFlagIndex !== -1 && process.argv[portFlagIndex + 1]) {
    const cliPort = Number(process.argv[portFlagIndex + 1]);
    if (Number.isFinite(cliPort) && cliPort > 0) return cliPort;
  }
  const envPort = Number(process.env.PORT);
  if (Number.isFinite(envPort) && envPort > 0) return envPort;
  return 3000;
}

const PORT = resolvePort();
const RECIPIENT_EMAIL = 'winnerwebdesign5@gmail.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactRequestBody {
  fullName?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  service?: string;
  budget?: string;
  projectDetails?: string;
  startDate?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const body = (req.body ?? {}) as ContactRequestBody;

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const businessName =
      typeof body.businessName === 'string' ? body.businessName.trim() : '';
    const service = typeof body.service === 'string' ? body.service.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const projectDetails =
      typeof body.projectDetails === 'string' ? body.projectDetails.trim() : '';
    const startDate =
      typeof body.startDate === 'string' ? body.startDate.trim() : '';

    if (!fullName || !email || !EMAIL_REGEX.test(email) || !service || !projectDetails) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please complete all required fields with a valid email address.',
      });
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey || resendApiKey === 'MY_RESEND_API_KEY') {
      res.status(503).json({
        ok: false,
        code: 'EMAIL_SERVICE_UNCONFIGURED',
        message:
          'Automated email delivery requires RESEND_API_KEY to be configured in the server environment before enquiries can be delivered directly to winnerwebdesign5@gmail.com.',
      });
      return;
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      'Winner Designs <onboarding@resend.dev>';

    const summaryHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111111; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New Project Enquiry — Winner Designs</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 8px 0; font-weight: 600;">Full Name:</td><td style="padding: 8px 0;">${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600;">Email:</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; font-weight: 600;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>` : ''}
          ${businessName ? `<tr><td style="padding: 8px 0; font-weight: 600;">Business Name:</td><td style="padding: 8px 0;">${escapeHtml(businessName)}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; font-weight: 600;">Service:</td><td style="padding: 8px 0;">${escapeHtml(service)}</td></tr>
          ${budget ? `<tr><td style="padding: 8px 0; font-weight: 600;">Estimated Budget:</td><td style="padding: 8px 0;">${escapeHtml(budget)}</td></tr>` : ''}
          ${startDate ? `<tr><td style="padding: 8px 0; font-weight: 600;">Preferred Start Date:</td><td style="padding: 8px 0;">${escapeHtml(startDate)}</td></tr>` : ''}
        </table>
        <h3 style="margin-top: 24px; margin-bottom: 8px;">Project Details</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${escapeHtml(projectDetails)}</p>
      </div>
    `;

    try {
      const agencyResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: `New Project Enquiry: ${service} — ${fullName}`,
          html: summaryHtml,
        }),
      });

      if (!agencyResponse.ok) {
        const errorText = await agencyResponse.text();
        console.error('Resend agency delivery failed:', errorText);
        res.status(502).json({
          ok: false,
          code: 'EMAIL_DELIVERY_FAILED',
          message:
            'We could not deliver your enquiry through the email service right now. Please reach out directly via WhatsApp or email.',
        });
        return;
      }

      // Send client auto-reply acknowledgement (best effort once agency email succeeds)
      let autoReplySent = false;
      try {
        const autoReplyResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [email],
            subject: 'We Received Your Project Enquiry — Winner Designs',
            text: [
              'Hello,',
              '',
              'Thank you for reaching out to Winner Designs!',
              '',
              "We've successfully received your project enquiry and appreciate your interest in working with us.",
              '',
              "We'll review the information you've provided and get back to you as soon as possible.",
              '',
              'In the meantime, feel free to explore our services and portfolio.',
              '',
              'YOUR PARTNER FOR DIGITAL WINS.',
              '',
              'Winner Designs',
            ].join('\n'),
          }),
        });
        autoReplySent = autoReplyResponse.ok;
      } catch (autoReplyError) {
        console.warn('Client auto-reply could not be sent:', autoReplyError);
      }

      res.status(200).json({
        ok: true,
        autoReplySent,
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(502).json({
        ok: false,
        code: 'EMAIL_DELIVERY_FAILED',
        message:
          'Unable to reach the email delivery service. Please try again or contact us directly via WhatsApp or email.',
      });
    }
  });

  let closeVite: (() => Promise<void>) | null = null;

  if (process.env.NODE_ENV !== 'production') {
    const hmrDisabled = process.env.DISABLE_HMR === 'true';
    const vitePromise = import('vite').then(({ createServer: createViteServer }) =>
      createViteServer({
        server: {
          middlewareMode: true,
          hmr: !hmrDisabled,
          ws: hmrDisabled ? false : undefined,
        },
        appType: 'spa',
      })
    );

    vitePromise
      .then((vite) => {
        closeVite = () => vite.close();
      })
      .catch((error) => {
        console.error('Failed to initialize Vite dev middleware:', error);
      });

    app.use((req, res, next) => {
      vitePromise
        .then((vite) => vite.middlewares(req, res, next))
        .catch(next);
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  const httpServer = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Winner Designs server running on http://0.0.0.0:${PORT}`);
  });

  const shutdown = () => {
    httpServer.close(() => {
      if (closeVite) {
        closeVite().finally(() => process.exit(0));
      } else {
        process.exit(0);
      }
    });
    setTimeout(() => process.exit(0), 2000).unref();
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
