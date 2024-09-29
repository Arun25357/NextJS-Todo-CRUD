import connectMongoDB from "@/lib/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    await connectMongoDB(); // เชื่อมต่อกับ MongoDB

    const { title, description } = await request.json();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ message: "Error creating topic" }, { status: 500 });
  }
}

export async function GET() {
    await connectMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({ topics })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}