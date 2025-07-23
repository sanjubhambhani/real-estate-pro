import { NextResponse } from "next/server"

import connectDB from "lib/mongodb"
import Agent from "models/agent"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const agent = await Agent.findOne({ _id: id })
    if (!agent)
      return NextResponse.json({ message: "Agent not found" }, { status: 404 })
    return new Response(JSON.stringify(agent), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const agent = await Agent.findOne({ _id: id })
    if (!agent)
      return NextResponse.json({ message: "Agent not found" }, { status: 404 })

    const data = await request.json()
    await agent.updateOne(data)

    return new Response(JSON.stringify(await Agent.findOne({ _id: id })), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
