import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with actual database operations
let conversations = [
  {
    id: 1,
    participants: ["user1", "user2"],
    messages: [
      {
        id: 1,
        senderId: "user2",
        senderName: "John Doe",
        content: "Hey, how's the project going?",
        timestamp: "2024-01-15T14:30:00Z",
      },
      {
        id: 2,
        senderId: "user1",
        senderName: "You",
        content: "It's going well! We're on track to meet the deadline.",
        timestamp: "2024-01-15T14:32:00Z",
      },
      {
        id: 3,
        senderId: "user2",
        senderName: "John Doe",
        content: "That's great to hear! Any blockers?",
        timestamp: "2024-01-15T14:35:00Z",
      },
    ],
    lastMessage: "2024-01-15T14:35:00Z",
    createdAt: "2024-01-15T14:30:00Z",
  },
  {
    id: 2,
    participants: ["user1", "user3"],
    messages: [
      {
        id: 4,
        senderId: "user3",
        senderName: "Alice Smith",
        content: "Can we schedule a meeting?",
        timestamp: "2024-01-15T10:15:00Z",
      },
    ],
    lastMessage: "2024-01-15T10:15:00Z",
    createdAt: "2024-01-15T10:15:00Z",
  },
];

export async function GET() {
  return NextResponse.json({ conversations }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, conversationId, message, participants } = body;

    if (action === "send_message") {
      const conversation = conversations.find(
        (conv) => conv.id === conversationId
      );
      if (!conversation) {
        return NextResponse.json(
          { success: false, message: "Conversation not found" },
          { status: 404 }
        );
      }

      const newMessage = {
        id: conversation.messages.length + 1,
        senderId: "user1", // This should come from authentication
        senderName: "You",
        content: message,
        timestamp: new Date().toISOString(),
      };

      conversation.messages.push(newMessage);
      conversation.lastMessage = newMessage.timestamp;

      return NextResponse.json(
        { success: true, message: newMessage },
        { status: 201 }
      );
    }

    if (action === "create_conversation") {
      if (!participants || participants.length === 0) {
        return NextResponse.json(
          { success: false, message: "Participants are required" },
          { status: 400 }
        );
      }

      const newConversation = {
        id: conversations.length + 1,
        participants: ["user1", ...participants], // Add current user
        messages: [],
        lastMessage: null,
        createdAt: new Date().toISOString(),
      };

      conversations.push(newConversation);

      return NextResponse.json(
        { success: true, conversation: newConversation },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
