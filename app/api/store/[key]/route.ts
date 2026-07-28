import { NextResponse } from 'next/server';

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
    
    // 2. Local Development Fallback (when running `npm run dev`)
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs/promises');
      const path = require('path');
      const dbPath = path.join(process.cwd(), 'local-kv-db.json');
      
      try {
        const fileContent = await fs.readFile(dbPath, 'utf-8');
        const db = JSON.parse(fileContent);
        return NextResponse.json(db[key] || null);
      } catch (err: any) {
        // If file doesn't exist, return null
        if (err.code === 'ENOENT') {
          return NextResponse.json(null);
        }
        throw err;
      }
    }

    // Default if no binding and not local dev
    return NextResponse.json(null);
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
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs/promises');
      const path = require('path');
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
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error writing KV for key ${key}:`, error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
