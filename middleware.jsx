import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
  const token = request.headers.get("authorization") || null
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  // public
  const isAuth = request.nextUrl.pathname.startsWith("/api/auth")
  if (isAuth) return NextResponse.next()
  const isLead = request.nextUrl.pathname.startsWith("/api/lead")
  if (isLead) return NextResponse.next()

  // private
  const isApi = request.nextUrl.pathname.startsWith("/api")
  if (isApi) {
    if (!token)
      return new NextResponse(
        JSON.stringify({
          message: "Auth Token is missing.",
        }),
        { status: 500 }
      )

    try {
      await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      })
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          message: "Auth Token is invalid.",
        }),
        { status: 500 }
      )
    }
  }

  return NextResponse.next()
}
