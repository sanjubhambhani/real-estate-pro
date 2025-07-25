import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "lib/mongodb"
import Agent from "models/agent"
import Admin from "models/admin"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { JWT_SECRET } = serverRuntimeConfig

export async function POST(request) {
  try {
    await connectDB()

    const { otp } = await request.json()
    if (!otp)
      return NextResponse.json({ message: "OTP is required" }, { status: 400 })

    const token = jwt.verify(otp, JWT_SECRET, (err, decoded) => {
      if (err) return null
      return decoded
    })
    if (!token)
      return NextResponse.json(
        { message: "Invalid OTP, please try again." },
        { status: 401 }
      )

    let user = null
    switch (token.collection) {
      case "agents":
        user = await Agent.findOne({ _id: token.id })
        break
      case "admins":
        user = await Admin.findOne({ _id: token.id })
        break
    }

    if (!user)
      return NextResponse.json({ message: "Agent not found" }, { status: 404 })
    if (!user.active)
      return NextResponse.json({ message: "Agent inactive" }, { status: 401 })
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
