import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT = 100; // requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

// In-memory store for demonstration (not for production)
const ipHits: Record<string, { count: number; last: number }> = {};

export function middleware(req: NextRequest) {
  const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();

  if (!ipHits[ip] || now - ipHits[ip].last > WINDOW_MS) {
    ipHits[ip] = { count: 1, last: now };
  } else {
    ipHits[ip].count += 1;
    ipHits[ip].last = now;
  }

  if (ipHits[ip].count > RATE_LIMIT) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  return NextResponse.next();
}
