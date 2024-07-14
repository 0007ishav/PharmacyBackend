// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Get the redirectUrl from query parameter or cookie
    const redirectUrl = new URLSearchParams(request.nextUrl.search).get('redirectUrl') || '/';

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    if (
        token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/')
    ) {
        console.log(`Redirecting to: ${redirectUrl}`);
        return NextResponse.redirect(redirectUrl);
    }

    // Redirect to home page if the user is not authenticated
    // and trying to access dashboard
    if (!token && url.pathname.startsWith('/dashboard')) {
        console.log(`Redirecting to: ${redirectUrl}`);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}
