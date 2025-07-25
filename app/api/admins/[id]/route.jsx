import { NextResponse } from "next/server"

import connectDB from "lib/mongodb"
import Admin from "models/admin"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const admin = await Admin.findOne({ _id: id })
    if (!admin)
      return NextResponse.json({ message: "Admin not found" }, { status: 404 })

    return NextResponse.json(admin, { status: 200 })
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
    const admin = await Admin.findOne({ _id: id })
    if (!admin)
      return NextResponse.json({ message: "Admin not found" }, { status: 404 })

    const data = await request.json()
    await admin.updateOne(data)

    return NextResponse.json(await Admin.findOne({ _id: id }), { satus: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
