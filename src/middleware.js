import { NextResponse } from 'next/server';

export function middleware(request) {
  // Define the blocked extensions
  const blockedExtensions = [
    '.alfa',
    '.ini',
    '.php',
    'wp-content',
    'wp-admin',
    '.html',
    '.bk',
  ];

  const { pathname } = request.nextUrl;

  // Check if the pathname includes any blocked extensions
  if (blockedExtensions.some((ext) => pathname.includes(ext))) {
    // Redirect to a specific page (e.g., '/error')
    return NextResponse.redirect(new URL('/security-alert', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes
  matcher: '/:path*',
};