"use client";

import { useState } from "react";
import { TaskAnalysis, analyzeTask } from "@/lib/ai";
import { Task } from "@prisma/client";

interface AITaskAnalyzerProps {
  task: Task;
  existingTasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export default function AITaskAnalyzer({
  task,
  existingTasks,
  onUpdateTask,
}: AITaskAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TaskAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");

    try {
      const existingTaskTitles = existingTasks
        .filter((t) => t.id !== task.id)
        .map((t) => t.title);

      const aiAnalysis = await analyzeTask(
        task.title,
        task.description || "",
        task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
        existingTaskTitles
      );

      setAnalysis(aiAnalysis);
      setShowAnalysis(true);
    } catch (error) {
      setError("Failed to analyze task. Please try again.");
      console.error("AI analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyAnalysis = () => {
    if (!analysis) return;

    onUpdateTask(task.id, {
      priority: analysis.suggestedPriority,
    });

    setShowAnalysis(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded transition-colors disabled:opacity-50"
      >
        {isAnalyzing ? (
          <span className="flex items-center gap-1">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-700"></div>
            Analyzing...
          </span>
        ) : (
          "🤖 AI Analyze"
        )}
      </button>

      {showAnalysis && analysis && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">AI Analysis</h4>
              <button
                onClick={() => setShowAnalysis(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Suggested Priority:
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                    analysis.suggestedPriority
                  )}`}
                >
                  {analysis.suggestedPriority}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">
                  Reasoning:
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.reasoning}
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700">
                  Estimated Hours:
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {analysis.estimatedHours}h
                </span>
              </div>

              {analysis.dependencies.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Dependencies:
                  </span>
                  <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                    {analysis.dependencies.map((dep, index) => (
                      <li key={index}>{dep}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-gray-700">
                  Suggestions:
                </span>
                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleApplyAnalysis}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Apply Priority
              </button>
              <button
                onClick={() => setShowAnalysis(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm z-50">
          {error}
        </div>
      )}
    </div>
  );
}
