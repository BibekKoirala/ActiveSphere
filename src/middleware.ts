import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware (req: NextRequest) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req , secret: "cPZyRbRKx0jRqLB+5STfoW+JgvzHi+/m3ajVaen6M/U="})
  if (token) {
    // Signed in - Forward the token to the API by adding it to the request headers
    const response = NextResponse.next();
    response.headers.set('Authorization', `${JSON.stringify(token)}`); // Set the token in the Authorization header
    
    return response;
  } else {
    // Not Signed in - Return a 401 Unauthorized response
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/dashboard', '/api/posts', '/create-post', ],
}

