import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "../../lib/chatbot";

// ── Route handler ──────────────────────────────────────────────────────────────

interface ChatRequest {
  message: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
}

type RateLimitEntry = {
  tokens: number;
  firstRequest: number;
  blockedUntil?: number;
};

const store = new Map<string, RateLimitEntry>();

const MAX_TOKENS = 3000;
const WINDOW_MS = 8*60*60*1000; // 8 hours
const BLOCK_TIME = 8*60*60*1000; // 8 hours

const ipTracker = new Map<string, { ips: Set<string>; firstSeen: number }>();

// ── Helper functions ───────────────────────────────────────────────────────────
function getIP(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function trackIPChange(userAgent: string, ip: string) {
  const now = Date.now();
  
  if (!ipTracker.has(userAgent)) {
    ipTracker.set(userAgent, { ips: new Set(), firstSeen: now });
  }

  const data = ipTracker.get(userAgent)!;

  // reset cada 8h
  if (now - data.firstSeen > WINDOW_MS) {
    data.ips.clear();
    data.firstSeen = now;
  }

  data.ips.add(ip);

  if (data.ips.size > 20) return true;

  return false; // No bloquear
}

function checkRateLimit(ip: string, userAgent: string): {
  blocked: boolean;
  entry: RateLimitEntry;
} {

  const key = `${ip}-${userAgent}`;
  const now = Date.now();

  let entry = store.get(key);

  if (!entry) {
    entry = { tokens: 0, firstRequest: now, blockedUntil: undefined, };
    store.set(key, entry);
  }
  //reset ventana
  if (now - entry.firstRequest > WINDOW_MS) {
    entry.tokens = 0;
    entry.firstRequest = now;
    entry.blockedUntil = undefined;
  }

  if (store.size > 10000) {
    const firstKey = store.keys().next().value;
    if (firstKey !== undefined) {
      store.delete(firstKey);
    }
  }

  //esta bloqueado
  if (entry.blockedUntil !== undefined && now < entry.blockedUntil) {
    return {blocked: true, entry};
  }

  return { blocked: false, entry };
}

function estimateTokens(text: string): number {
  if (!text) return 0;
  // Estimación simple: 1 token ≈ 4 caracteres en inglés
  return Math.ceil(text.length / 4);
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req);
    const ua = req.headers.get("user-agent") || "unknown";

    if (trackIPChange(ua, ip)) {
      return NextResponse.json({
        answer:
          "Se detectó comportamiento inusual. Por favor utilice el formulario de contacto.",
        noMatch: true,
      });
    }

    const {blocked, entry} = checkRateLimit(ip , ua);

    if (blocked) {
      return NextResponse.json({
        answer: "Ha superado el limite de uso. Por favor, envie su consulta mediante email o formulario.",
        noMatch: true,
      })
    }

    const { message, history = [] } = (await req.json()) as ChatRequest;

    if (!message?.trim()) {
      return NextResponse.json({ answer: "", noMatch: false }, { status: 400 });
    }

    const estimated = estimateTokens(message);

    if (entry.tokens + estimated > MAX_TOKENS) {
      entry.blockedUntil = Date.now() + BLOCK_TIME;
      return NextResponse.json({
        answer: "Ha superado el limite de uso. Por favor, envie su consulta mediante email o formulario.",
        noMatch: true,
      })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const messages: Anthropic.MessageParam[] = [
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: message.trim() },
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const raw =
      response.content?.[0]?.type === "text"
        ? response.content[0].text
        : "";

    const inputTokens = response.usage?.input_tokens ?? estimated;
    const outputTokens = response.usage?.output_tokens ?? estimateTokens(raw);

    entry.tokens += inputTokens + outputTokens;

    try {
      const parsed = JSON.parse(raw) as { answer: string; noMatch: boolean };
      return NextResponse.json(parsed);
    } catch {
      // Fallback if model doesn't return valid JSON
      return NextResponse.json({ answer: raw, noMatch: false });
    }
  } catch (err) {
    console.error("[chat API error]", err);
    return NextResponse.json(
      {
        answer:
          "Lo siento, hubo un error al procesar su consulta. Por favor, intente nuevamente.",
        noMatch: false,
      },
      { status: 500 }
    );
  }
}
