import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { middleware as authMiddleware } from '@/middleware/auth';
import civicMiddleware, { config as civicConfig } from '@/middleware/civic';
import { middleware as rateLimitMiddleware } from '@/middleware/rateLimit';

// Compose all middlewares in order
export function middleware(req: NextRequest) {
  // Rate limiting first
  const rateLimitResult = rateLimitMiddleware(req);
  if (rateLimitResult instanceof NextResponse && rateLimitResult !== NextResponse.next()) {
    return rateLimitResult;
  }

  // Civic auth
  const civicResult = civicMiddleware(req);
  if (civicResult instanceof NextResponse && civicResult !== NextResponse.next()) {
    return civicResult;
  }

  // Custom auth
  const authResult = authMiddleware(req);
  if (authResult instanceof NextResponse && authResult !== NextResponse.next()) {
    return authResult;
  }

  // If all pass, continue
  return NextResponse.next();
}

// Export matcher config (merge as needed)
export const config = {
  matcher: civicConfig.matcher,
};
