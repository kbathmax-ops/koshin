// The RevOps page is served from its own host. It lives in this same app and
// Vercel project; next.config.ts rewrites that host's "/" to /revops.
// Swap NEXT_PUBLIC_REVOPS_HOST for the real domain once it's bought.
export const REVOPS_HOST = process.env.NEXT_PUBLIC_REVOPS_HOST ?? "koshin-revops.vercel.app";
export const REVOPS_URL = `https://${REVOPS_HOST}`;
