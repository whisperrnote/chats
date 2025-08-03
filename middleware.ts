import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { middleware as authMiddleware } from '@/middleware/auth';
import { middleware as rateLimitMiddleware } from '@/middleware/rateLimit';

// Compose all middlewares in order
export function middleware(req: NextRequest) {
  // Rate limiting first
  const rateLimitResult = rateLimitMiddleware(req);
  if (rateLimitResult instanceof NextResponse && rateLimitResult !== NextResponse.next()) {
    return rateLimitResult;
  }

  // Custom auth
  const authResult = authMiddleware(req);
  if (authResult instanceof NextResponse && authResult !== NextResponse.next()) {
    return authResult;
  }

  // If all pass, continue
  return NextResponse.next();
}

// Export matcher config as a plain object literal
export const config = {
  matcher: [
    // Add all patterns you want to match here (merge from all middlewares if needed)
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif).*)',
  ],
};
