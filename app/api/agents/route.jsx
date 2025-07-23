import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import connectDB from "lib/mongodb"
import Agent from "models/agent"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { JWT_SECRET } = serverRuntimeConfig

export async function GET() {
  try {
    await connectDB()
    const agents = await Agent.find()
    return NextResponse.json(agents, { status: 201 })
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
    const agent = await new Agent(payload).save()

    const token = jwt.sign(
      { collection: "agents", id: agent._id.toString() },
      JWT_SECRET
    )
    await agent.updateOne({ token })

    // TODO: Email Notification: Agent Invite

    return NextResponse.json(
      { message: "Agent created successfully" },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
