import OpenAI from "openai";

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export interface TaskSuggestion {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  reasoning: string;
}

export interface TaskAnalysis {
  suggestedPriority: "low" | "medium" | "high";
  reasoning: string;
  estimatedHours: number;
  dependencies: string[];
  suggestions: string[];
}

/**
 * Analyze a task and provide AI-powered insights
 */
export async function analyzeTask(
  title: string,
  description: string,
  dueDate?: string,
  existingTasks: string[] = []
): Promise<TaskAnalysis> {
  if (!openai) {
    return {
      suggestedPriority: "medium",
      reasoning:
        "AI features require OpenAI API key. Please configure OPENAI_API_KEY in your environment variables.",
      estimatedHours: 2,
      dependencies: [],
      suggestions: [
        "Configure OpenAI API key for AI features",
        "Review task manually",
      ],
    };
  }

  try {
    const prompt = `
You are an AI productivity assistant. Analyze this task and provide insights:

Task: ${title}
Description: ${description}
Due Date: ${dueDate || "Not specified"}
Existing Tasks: ${existingTasks.join(", ") || "None"}

Please provide:
1. Priority level (low/medium/high) based on urgency and importance
2. Reasoning for the priority
3. Estimated hours to complete
4. Any dependencies on other tasks
5. 2-3 actionable suggestions for completing this task

Respond in JSON format:
{
  "suggestedPriority": "medium",
  "reasoning": "This task is important but not urgent...",
  "estimatedHours": 4,
  "dependencies": ["task1", "task2"],
  "suggestions": ["Break into smaller tasks", "Set up development environment"]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    // Parse JSON response
    const analysis = JSON.parse(response);
    return analysis;
  } catch (error) {
    console.error("AI analysis error:", error);

    // Fallback response
    return {
      suggestedPriority: "medium",
      reasoning:
        "Unable to analyze task automatically. Please review manually.",
      estimatedHours: 2,
      dependencies: [],
      suggestions: ["Review task requirements", "Break into smaller steps"],
    };
  }
}

/**
 * Generate smart task suggestions based on project context
 */
export async function generateTaskSuggestions(
  projectContext: string,
  existingTasks: string[] = []
): Promise<TaskSuggestion[]> {
  if (!openai) {
    return [
      {
        title: "Configure OpenAI API Key",
        description:
          "Set up your OpenAI API key to enable AI-powered task suggestions",
        priority: "high",
        estimatedHours: 0.5,
        reasoning: "Required for AI features to work",
      },
      {
        title: "Review Project Requirements",
        description: "Go through all project documentation and requirements",
        priority: "high",
        estimatedHours: 1,
        reasoning: "Important foundation task",
      },
    ];
  }

  try {
    const prompt = `
You are an AI project management assistant. Based on this project context, suggest 3-5 relevant tasks:

Project Context: ${projectContext}
Existing Tasks: ${existingTasks.join(", ") || "None"}

For each suggested task, provide:
- Clear, actionable title
- Detailed description
- Priority level (low/medium/high)
- Estimated hours
- Brief reasoning

Respond in JSON format:
{
  "suggestions": [
    {
      "title": "Set up development environment",
      "description": "Install and configure all necessary tools...",
      "priority": "high",
      "estimatedHours": 2,
      "reasoning": "Foundation task needed before other work"
    }
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 800,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response);
    return result.suggestions || [];
  } catch (error) {
    console.error("AI suggestion error:", error);

    // Fallback suggestions
    return [
      {
        title: "Review project requirements",
        description: "Go through all project documentation and requirements",
        priority: "high",
        estimatedHours: 1,
        reasoning: "Important foundation task",
      },
      {
        title: "Set up project structure",
        description: "Create necessary folders and initial files",
        priority: "medium",
        estimatedHours: 2,
        reasoning: "Organize project for better development",
      },
    ];
  }
}

/**
 * Get productivity insights based on task data
 */
export async function getProductivityInsights(
  completedTasks: Array<{
    title: string;
    priority: string;
    estimatedHours: number;
    actualHours?: number;
  }>,
  currentTasks: Array<{ title: string; priority: string; dueDate?: string }>
): Promise<string> {
  if (!openai) {
    return "AI insights require OpenAI API key. Configure OPENAI_API_KEY in your environment variables to enable productivity insights.";
  }

  try {
    const prompt = `
Analyze this productivity data and provide insights:

Completed Tasks: ${JSON.stringify(completedTasks)}
Current Tasks: ${JSON.stringify(currentTasks)}

Provide 2-3 actionable insights about:
- Time estimation accuracy
- Priority distribution
- Workload balance
- Suggestions for improvement

Keep response concise and actionable (max 200 words).
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 300,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Unable to generate insights at this time."
    );
  } catch (error) {
    console.error("AI insights error:", error);
    return "Unable to generate productivity insights. Keep tracking your tasks for better analysis.";
  }
}
