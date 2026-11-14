// Vercel entry point for the Brief Builder: the same handler the Netlify
// Function uses (netlify/functions/brief.mts). Needs ANTHROPIC_API_KEY in the
// Vercel project's environment variables; without it the page shows the
// built-in preview brief instead.
import handler from "../netlify/functions/brief.mts";

export const POST = (req: Request) => handler(req);
