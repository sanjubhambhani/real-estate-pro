import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "../../../lib/mongodb"
import Admin from "../../../models/Admin"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { JWT_SECRET } = serverRuntimeConfig

export async function GET() {
  try {
    await connectDB()
    const admins = await Admin.find()
    return NextResponse.json(admins, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()

    const { name, email } = await request.json()
    if (!email)
      return NextResponse.json({ message: "Email Required" }, { status: 400 })
    if (!name)
      return NextResponse.json({ message: "Name Required" }, { status: 400 })

    const payload = {
      active: true,
      name: name && name.trim(),
      email: email.toLowerCase(),
    }
    const admin = await new Admin(payload).save()

    const token = jwt.sign(
      { collection: "admins", id: admin._id.toString() },
      JWT_SECRET
    )
    await admin.updateOne({ token })

    // TODO: Email Notification: Admin Invite

    return NextResponse.json(
      { message: "Admins created successfully" },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
