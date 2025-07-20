import { NextResponse } from "next/server"
import clientPromise from "../../../../../lib/mongodb"
import moment from "moment"

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db()

    const { email, otp } = await request.json()
    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    if (!otp)
      return NextResponse.json({ message: "OTP is required" }, { status: 400 })

    const user = await db
      .collection("agents")
      .findOne({ email: email.toLowerCase() })
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 })

    if (user.otp != otp)
      return NextResponse.json({ message: "OTP not valid" }, { status: 401 })

    if (moment().unix() > user.otpExpire)
      return NextResponse.json({ message: "OTP expired" }, { status: 401 })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
