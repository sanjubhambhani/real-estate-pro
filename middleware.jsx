export default function middleware(request) {
  // Middleware logic
  // console.log("Hi, base middleware!")
}

// // middleware.js
// import { NextResponse } from 'next/server';

// export async function middleware(request) {
//   // 1. Define the paths this middleware should apply to
//   // We'll use the matcher config for this, but you can also do it conditionally here.
//   // For this example, let's assume we want to protect all /api/protected routes.

//   // 2. Get the token from the Authorization header
//   const authorizationHeader = request.headers.get('authorization');
//   const token = authorizationHeader?.split(' ')[1]; // Expecting "Bearer <token>"

//   // 3. Check if the request is for a protected API route
//   // We'll use the matcher below to ensure this middleware only runs for /api/protected
//   // but for demonstration, let's also check the URL here.
//   const isProtectedApiRoute = request.nextUrl.pathname.startsWith('/api/protected');

//   if (isProtectedApiRoute) {
//     if (!token) {
//       // If no token is found, return an unauthorized response
//       return new NextResponse(
//         JSON.stringify({ success: false, message: 'Authentication token is missing.' }),
//         { status: 401, headers: { 'content-type': 'application/json' } }
//       );
//     }

//     // In a real application, you would validate the token here.
//     // This could involve:
//     // - Verifying a JWT signature (e.g., using 'jsonwebtoken' library)
//     // - Calling an authentication service/database
//     // For this example, we'll just check for a hardcoded "valid-token"
//     if (token !== 'your_secret_valid_token') {
//       return new NextResponse(
//         JSON.stringify({ success: false, message: 'Invalid authentication token.' }),
//         { status: 403, headers: { 'content-type': 'application/json' } }
//       );
//     }

//     // If the token is valid, proceed with the request
//     // You can also modify the request by adding headers, for example, to pass user info
//     // const response = NextResponse.next();
//     // response.headers.set('x-user-id', 'someUserId');
//     // return response;
//   }

//   // Allow the request to continue if it's not a protected API route or if authenticated
//   return NextResponse.next();
// }

// // 4. Configure the middleware matcher to apply it to specific routes
// export const config = {
//   matcher: '/api/protected/:path*', // Applies to all routes under /api/protected
// };
