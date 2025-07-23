import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "../../../../lib/mongodb"
import Agent from "../../../../models/agent"
import Admin from "../../../../models/Admin"

const JWT_SECRET = "tmp"

export async function POST(request) {
  try {
    await connectDB()

    const { email, collection } = await request.json()
    if (!(collection == "agents" || collection == "admins"))
      return NextResponse.json(
        { message: "Invalid collection" },
        { status: 400 }
      )
    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )

    let user = null
    switch (collection) {
      case "agents":
        user = await Agent.findOne({ email: email.toLowerCase() })
        break
      case "admins":
        user = await Admin.findOne({ email: email.toLowerCase() })
        break
    }

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    if (!user.active)
      return NextResponse.json({ message: "User inactive" }, { status: 401 })

    const otp = jwt.sign({ collection, id: user._id }, JWT_SECRET, {
      expiresIn: "5m",
    })
    await user.updateOne({ otp })

    // TODO: Email Notification: Agent Dashboard Login Link
    console.log("MagicLink: ", `http://localhost:3000/auth/verify/${otp}`)

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
