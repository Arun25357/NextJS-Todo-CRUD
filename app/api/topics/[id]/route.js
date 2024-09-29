import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";

export async function PUT(request, { params }) {
    const { id } = params;
  
    try {
      // Log the incoming request body
      const requestBody = await request.json();
      console.log("Request body:", requestBody);
  
      const { newTitle: title, newDescription: description, newStatus: status, newDueDate: dueDate } = requestBody;
  
      if (!title || !description || !status || !dueDate) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }
  
      await connectMongoDB();
  
      const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
  
      if (!updatedTopic) {
        return NextResponse.json({ message: "Topic not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Topic updated successfully", updatedTopic }, { status: 200 });
  
    } catch (error) {
      console.error("Error updating topic:", error);
      return NextResponse.json({ message: "Error updating topic" }, { status: 500 });
    }
  }
  

export async function GET(request, { params }) {
    const { id } = params;
    
    await connectMongoDB();
    
    // Find the topic by ID and return it
    const topic = await Topic.findOne({ _id: id });
    
    return NextResponse.json({ topic }, { status: 200 });
}
