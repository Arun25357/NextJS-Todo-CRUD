import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

// POST handler to create a new topic
export async function POST(request) {
  try {
    await connectMongoDB(); // Connect to MongoDB

    // Destructure title, description, status, and dueDate from the request body
    const { title, description, status = "incomplete", dueDate } = await request.json();

    // Create the topic with the provided fields
    await Topic.create({ title, description, status, dueDate });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json({ message: "Error creating topic" }, { status: 500 });
  }
}

// GET handler to fetch all topics
export async function GET() {
  try {
    await connectMongoDB(); // Connect to MongoDB

    // Fetch all topics from the database
    const topics = await Topic.find();

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ message: "Error fetching topics" }, { status: 500 });
  }
}

// DELETE handler to delete a topic by ID
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    
    await connectMongoDB(); // Connect to MongoDB

    // Delete the topic by its ID
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json({ message: "Error deleting topic" }, { status: 500 });
  }
}
