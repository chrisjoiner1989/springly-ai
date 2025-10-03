import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  analyzeTask,
  generateTaskSuggestions,
  getProductivityInsights,
} from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "analyze_task":
        const analysis = await analyzeTask(
          data.title,
          data.description,
          data.dueDate,
          data.existingTasks
        );
        return NextResponse.json({ success: true, analysis });

      case "generate_suggestions":
        const suggestions = await generateTaskSuggestions(
          data.projectContext,
          data.existingTasks
        );
        return NextResponse.json({ success: true, suggestions });

      case "get_insights":
        const insights = await getProductivityInsights(
          data.completedTasks,
          data.currentTasks
        );
        return NextResponse.json({ success: true, insights });

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
