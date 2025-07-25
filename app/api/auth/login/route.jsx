import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "lib/mongodb"
import { sendMail } from "lib/mailgun"
import Agent from "models/agent"
import Admin from "models/admin"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { JWT_SECRET, APP_URL } = serverRuntimeConfig

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
        { message: "Email address is required" },
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

    const otp = jwt.sign(
      { collection, id: user._id, role: "otp" },
      JWT_SECRET,
      {
        expiresIn: "5m",
        algorithm: "HS256",
      }
    )
    await user.updateOne({ otp })

    const loginLink = `${APP_URL}?otp=${otp}`
    console.log(loginLink)
    await sendMail({
      to: user.email,
      subject: "Dashboard Login Link",
      text: `Hi ${user.name},\n\Dashboard Login Link: ${loginLink}`,
    })

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
