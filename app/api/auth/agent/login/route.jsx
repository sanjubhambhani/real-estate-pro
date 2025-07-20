import { NextResponse } from "next/server"
import clientPromise from "../../../../../lib/mongodb"
import moment from "moment"

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db()

    const { email } = await request.json()
    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )

    const user = await db
      .collection("agents")
      .findOne({ email: email.toLowerCase() })
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 401 })

    // generate otp & otpExpire
    const otp = Math.floor(100000 + Math.random() * 900000)
    const otpExpire = moment().add(10, "minutes").unix()

    // update user
    user.otp = otp
    user.otpExpire = otpExpire
    user.lastLogin = moment().unix()
    await db.collection("agents").updateOne({ _id: user._id }, { $set: user })

    // TODO: email notification
    console.log("OTP: ", otp)
    console.log(
      "MagicLink: ",
      `http://localhost:3000/auth/agent?user=${user._id}&token=${otp}`
    )

    // TODO: encrypt token and send.

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
