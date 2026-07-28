import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { key: string } }) {
  const { key } = params;

  try {
    let kv: any = null;

    // 1. Try to get Cloudflare context from OpenNext
    try {
      // Use dynamic import so it doesn't break standard Next.js local dev
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const ctx = (await getCloudflareContext()) as any;
      if (ctx?.env?.TOURISM_KV) {
        kv = ctx.env.TOURISM_KV;
      }
    } catch (e) {
      // Ignore: we might be in standard next dev
    }

    // Fallback: sometimes binding is directly on process.env in Edge runtime
    if (!kv && process.env.TOURISM_KV) {
      kv = process.env.TOURISM_KV;
    }

    // If we have a KV binding, use it!
    if (kv) {
      const data = await kv.get(key, 'json');
      return NextResponse.json(data || null);
    } 
    
    // 2. Local Development Fallback
    // If KV binding is missing, try falling back to local filesystem (works locally, fails gracefully on Cloudflare)
    const dbPath = path.join(process.cwd(), 'local-kv-db.json');
    
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      const db = JSON.parse(fileContent);
      return NextResponse.json(db[key] || null);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return NextResponse.json(null);
      }
      throw err;
    }

    // Default if no binding and not local dev
    console.error("KV Binding TOURISM_KV not found in environment!");
    return NextResponse.json({ error: 'KV Binding not found' }, { status: 500 });
  } catch (error) {
    console.error(`Error reading KV for key ${key}:`, error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { key: string } }) {
  const { key } = params;
  
  try {
    const body = await request.json();
    let kv: any = null;

    // 1. Try to get Cloudflare context from OpenNext
    try {
      const { getCloudflareContext } = await import('@opennextjs/cloudflare');
      const ctx = (await getCloudflareContext()) as any;
      if (ctx?.env?.TOURISM_KV) {
        kv = ctx.env.TOURISM_KV;
      }
    } catch (e) {
      // Ignore
    }

    if (!kv && process.env.TOURISM_KV) {
      kv = process.env.TOURISM_KV;
    }

    if (kv) {
      // Save data as JSON string in KV
      await kv.put(key, JSON.stringify(body));
      return NextResponse.json({ success: true });
    }
    
    // 2. Local Development Fallback
    const dbPath = path.join(process.cwd(), 'local-kv-db.json');
    
    let db: Record<string, any> = {};
    try {
      const fileContent = await fs.readFile(dbPath, 'utf-8');
      db = JSON.parse(fileContent);
    } catch (err: any) {
      // Ignore if file doesn't exist yet
    }
    
    // Update key and write back to file
    db[key] = body;
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
    console.error("KV Binding TOURISM_KV not found in environment!");
    return NextResponse.json({ error: 'KV Binding not found' }, { status: 500 });
  } catch (error) {
    console.error(`Error writing KV for key ${key}:`, error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
