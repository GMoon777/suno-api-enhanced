import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect API routes with API key authentication
 * @param request - The incoming request
 */
export function middleware(request: NextRequest) {
  // Only apply to /api routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const apiKey = request.headers.get('x-api-key');

    // Skip auth check for OPTIONS requests (CORS preflight)
    if (request.method === 'OPTIONS') {
      return NextResponse.next();
    }

    if (!apiKey || apiKey !== process.env.SUNO_DOCKER_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
              'Content-Type, Authorization, x-api-key'
          }
        }
      );
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/api/:path*'
};
