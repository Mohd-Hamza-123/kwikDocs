import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    
    const { pathname } = request.nextUrl

    console.log("pathname : ", pathname)

    const token = request.cookies.get("session")?.value

    // if (
    //     ["/create-docs", "/create-tech", "/update-docs"].includes(pathname)
    // ) {
    //     if (!token) {
    //         return NextResponse.redirect(new URL("/login", request.url));
    //     }
    // }

    return NextResponse.next();
}


export const config = {
    matcher: [
        '/create-docs',
        '/create-tech',
        '/update-docs',
    ],
}

