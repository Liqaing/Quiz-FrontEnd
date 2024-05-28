import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get("quiz-session")?.value;    
    if (!cookie && !request.nextUrl.pathname.startsWith('/account/login')) {
        return NextResponse.redirect(new URL('/account/login', request.url))
    }

    if (cookie && !request.nextUrl.pathname.startsWith('/')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: ['/((?!api|register|_next/static|_next/image|.*\\.png$).*)'],
}