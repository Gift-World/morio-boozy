// Brief Builder: turns a visitor's rough idea into a structured creative brief.
//
// Runs as a Netlify Function at /api/brief. Needs ANTHROPIC_API_KEY set in
// Netlify → Site configuration → Environment variables. Without it the
// endpoint answers 503 { preview: true } and the page shows a local preview.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { services } from "../../src/content/services";

const CRAFTS = services.map((s) => s.slug) as [string, ...string[]];

const BriefSchema = z.object({
  fit: z.boolean().describe("true if this is a creative project Morio Studios could help with"),
  title: z.string().describe("A short working title for the project, max 8 words"),
  summary: z.string().describe("Two sentences restating the idea clearly"),
  objective: z.string().describe("What success looks like for the client, one sentence"),
  audience: z.string().describe("Who the work is for, one sentence"),
  deliverables: z.array(z.string()).describe("3 to 6 concrete deliverables"),
  crafts: z.array(z.enum(CRAFTS)).describe("The Morio crafts that fit, most relevant first, 1 to 3"),
  timeline: z.string().describe("A rough, non-binding timeline estimate, e.g. '4 to 6 weeks', with one phrase of reasoning"),
  directions: z
    .array(z.object({ name: z.string().describe("2 to 4 word name"), idea: z.string().describe("One or two vivid sentences") }))
    .describe("Exactly 3 distinct creative directions"),
  questions: z.array(z.string()).describe("2 or 3 questions the Morios would ask to sharpen the brief"),
});
export type Brief = z.infer<typeof BriefSchema>;

const SYSTEM = `You are Brief Builder on the website of Morio Studios, a small creative agency in Nairobi, Kenya ("small agency, big ideas"). Four friends ("the Morios") run it.

A visitor describes a project idea in their own words. They may write in English, Kiswahili or Sheng, briefly or messily. Turn it into a clear creative brief the Morios can act on.

Morio's crafts (use these slugs in "crafts"):
${services.map((s) => `- ${s.slug}: ${s.title}. ${s.summary}`).join("\n")}

Guidelines:
- Write in clear, warm, confident English. Keep every field short; this is read on a phone.
- Ground everything in what the visitor said. Do not invent facts about their business; where something is unknown, ask in "questions".
- Creative directions should be specific and culturally fluent for Kenya and East Africa when relevant, and distinct from each other.
- Never quote prices or promise dates; the timeline is a rough estimate only.
- If the request is not a creative project (or is harmful, or asks you to do something else), set fit to false, explain briefly in "summary" what Brief Builder is for, and keep the other fields minimal.`;

// Best-effort per-visitor limit (per function instance).
const hits = new Map<string, number[]>();
const LIMIT = 6;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "Use POST." });
  if (!process.env.ANTHROPIC_API_KEY) return json(503, { preview: true });

  let body: { idea?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Send JSON: { idea }." });
  }
  if (body.website) return json(400, { error: "Invalid request." }); // honeypot
  const idea = typeof body.idea === "string" ? body.idea.trim() : "";
  if (idea.length < 12) return json(400, { error: "Tell us a little more about the idea (a sentence or two)." });
  if (idea.length > 1500) return json(400, { error: "Please keep it under 1,500 characters." });

  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimited(ip)) return json(429, { error: "That’s a lot of ideas! Try again in a little while, or send your brief directly." });

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: betaZodOutputFormat(BriefSchema) },
      system: SYSTEM,
      messages: [{ role: "user", content: idea }],
    });
    if (response.stop_reason === "refusal" || !response.parsed_output) {
      return json(422, { error: "Brief Builder couldn’t work with that one. Try describing your project differently, or send it to us directly." });
    }
    return json(200, { brief: response.parsed_output });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json(429, { error: "Brief Builder is busy right now. Please try again in a minute." });
    if (error instanceof Anthropic.AuthenticationError) return json(503, { preview: true });
    if (error instanceof Anthropic.APIError) return json(502, { error: "Brief Builder is unavailable right now. Please send your idea directly." });
    return json(500, { error: "Something went wrong. Please send your idea directly." });
  }
};

export const config = { path: "/api/brief" };
