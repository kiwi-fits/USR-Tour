import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// ── In-memory store for local development ────────────────────────────────────
// This persists as long as the Next.js dev server is running.
// On Cloudflare, the KV binding is used instead.
const memStore = new Map<string, any>();

// Pre-seed with empty arrays so the app works immediately on first load locally
const defaultValues: Record<string, any> = {
  usr_bookings: [],
};

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const { key } = params;

  try {
    // 1. Try Cloudflare KV first
    try {
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const ctx = (await getCloudflareContext()) as any;
      if (ctx?.env?.TOURISM_KV) {
        const data = await ctx.env.TOURISM_KV.get(key, 'json');
        return NextResponse.json(data ?? null);
      }
    } catch (_) {
      // Not on Cloudflare — use in-memory fallback
    }

    // 2. Local dev in-memory fallback
    const value = memStore.has(key) ? memStore.get(key) : (defaultValues[key] ?? null);
    return NextResponse.json(value);
  } catch (error) {
    console.error(`[KV GET] Error for key "${key}":`, error);
    return NextResponse.json(null);
  }
}

export async function POST(request: Request, { params }: { params: { key: string } }) {
  const { key } = params;

  try {
    const body = await request.json();

    // 1. Try Cloudflare KV first
    try {
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const ctx = (await getCloudflareContext()) as any;
      if (ctx?.env?.TOURISM_KV) {
        await ctx.env.TOURISM_KV.put(key, JSON.stringify(body));
        return NextResponse.json({ success: true });
      }
    } catch (_) {
      // Not on Cloudflare — use in-memory fallback
    }

    // 2. Local dev in-memory fallback
    memStore.set(key, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[KV POST] Error for key "${key}":`, error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
