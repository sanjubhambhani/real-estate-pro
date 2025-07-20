import { NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db()

    const { email, token } = await request.json()
    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 401 }
      )

    if (!token)
      return NextResponse.json(
        { message: "Token is required" },
        { status: 401 }
      )

    const user = await db.collection("agents").findOne({ email, token })

    if (!user)
      return NextResponse.json({ message: "User not found." }, { status: 401 })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
