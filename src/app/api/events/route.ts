import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with actual database operations
let events = [
  {
    id: 1,
    title: "Team Meeting",
    description: "Weekly team standup meeting",
    date: "2024-01-15",
    time: "14:00",
    location: "Conference Room A",
    attendees: ["John Doe", "Alice Smith", "Bob Johnson"],
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Project Review",
    description: "Monthly project review and planning session",
    date: "2024-01-16",
    time: "10:00",
    location: "Main Conference Room",
    attendees: ["John Doe", "Alice Smith", "Bob Johnson", "Sarah Wilson"],
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    title: "Client Presentation",
    description: "Present project progress to client",
    date: "2024-01-19",
    time: "15:00",
    location: "Client Office",
    attendees: ["John Doe", "Alice Smith"],
    createdAt: "2024-01-14",
  },
];

export async function GET() {
  return NextResponse.json({ events }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, date, time, location, attendees } = body;

    if (!title || !date) {
      return NextResponse.json(
        { success: false, message: "Title and date are required" },
        { status: 400 }
      );
    }

    const newEvent = {
      id: events.length + 1,
      title,
      description: description || "",
      date,
      time: time || "09:00",
      location: location || "",
      attendees: attendees || [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    events.push(newEvent);

    return NextResponse.json(
      { success: true, event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    events[eventIndex] = { ...events[eventIndex], ...updates };

    return NextResponse.json(
      { success: true, event: events[eventIndex] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    events.splice(eventIndex, 1);

    return NextResponse.json(
      { success: true, message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
