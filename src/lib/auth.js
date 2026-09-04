import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

// ── Email Provider (Resend) ────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Shared email sender — used by betterAuth for:
 *  • Email address verification (initial sign-up)
 *  • Change-email confirmation
 */
const sendEmail = async ({ to, subject, html }) => {
  await resend.emails.send({
    from: "delivered+nexthire@resend.dev", // resend demo email for testing phase only
    to,
    subject,
    html,
  });
};

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  baseURL: process.env.BETTER_AUTH_URL,
  // social providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  // additonal field for user document
  user: {
    additionalFields: {
      role: { defaultValue: "seeker" },
      plan: { defaultValue: "seeker_free" },
    },

    // ── Change Email ────────────────────────────────────────────────────
    changeEmail: {
      enabled: true,
      // Require email verification before the new address takes effect
      sendChangeEmailConfirmation: true,
    },

    // ── Delete Account ──────────────────────────────────────────────────
    deleteUser: {
      enabled: true,
    },
  },

  // ── Email Verification ──────────────────────────────────────────────────
  emailVerification: {
    /**
     * Called by betterAuth for:
     *  1. Initial sign-up verification
     *  2. Change-email confirmation (betterAuth passes the new address as `user.email`)
     *  3. Resend verification requests
     *
     * @param {{ user: object, url: string, token: string }} payload
     */
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your NextHire email address",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#09090b;color:#e4e4e7;border-radius:12px">
            <h1 style="font-size:22px;font-weight:700;color:#ffffff;margin-bottom:8px">Verify your email</h1>
            <p style="font-size:14px;color:#a1a1aa;line-height:1.6;margin-bottom:24px">
              Click the button below to verify your email address for your NextHire account.
              This link expires in&nbsp;<strong style="color:#e4e4e7">1 hour</strong>.
            </p>
            <a href="${url}"
               style="display:inline-block;padding:12px 28px;background:#00a6fb;color:#000;font-weight:700;font-size:14px;border-radius:8px;text-decoration:none">
              Verify Email Address
            </a>
            <p style="margin-top:24px;font-size:12px;color:#52525b">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      });
    },
  },

  // plugins
});
