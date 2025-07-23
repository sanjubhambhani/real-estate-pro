import { NextResponse } from "next/server"

import connectDB from "../../../../lib/mongodb"
import Admin from "../../../../models/Admin"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const admin = await Admin.findOne({ _id: id })
    if (!admin)
      return NextResponse.json({ message: "Admin not found" }, { status: 404 })
    return new Response(JSON.stringify(admin), {
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
