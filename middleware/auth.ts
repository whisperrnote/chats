import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // TODO: Implement real authentication check
  const isAuthenticated = true; // Replace with real logic

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}
