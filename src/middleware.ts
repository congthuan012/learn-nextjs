import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
      matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
      const cookie = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

      if (request.nextUrl.pathname.startsWith('/admin') && !cookie) {
            return NextResponse.rewrite(new URL('/login', request.url));
      }

      if (cookie && request.nextUrl.pathname.startsWith('/login')) {
            return NextResponse.rewrite(new URL('/', request.url));
      }
};