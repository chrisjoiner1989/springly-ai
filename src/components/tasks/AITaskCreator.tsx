"use client";

import { useState } from "react";

interface TaskSuggestion {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  reasoning: string;
}

interface AITaskCreatorProps {
  onTaskCreate: (task: {
    title: string;
    description: string;
    priority: string;
    estimatedHours: number;
  }) => void;
  existingTasks: string[];
}

export default function AITaskCreator({
  onTaskCreate,
  existingTasks,
}: AITaskCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectContext, setProjectContext] = useState("");
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSuggestions = async () => {
    if (!projectContext.trim()) {
      setError("Please describe your project context");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generate_suggestions",
          projectContext,
          existingTasks,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } else {
        setError("Failed to generate suggestions. Please try again.");
      }
    } catch (error) {
      setError("Failed to generate suggestions. Please try again.");
      console.error("AI suggestion error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = (suggestion: TaskSuggestion) => {
    onTaskCreate({
      title: suggestion.title,
      description: suggestion.description,
      priority: suggestion.priority,
      estimatedHours: suggestion.estimatedHours,
    });

    // Remove the accepted suggestion
    setSuggestions((prev) => prev.filter((s) => s.title !== suggestion.title));
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
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <span>🤖</span>
        AI Task Creator
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Task Suggestions
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Describe your project context and get intelligent task
                suggestions.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Context
              </label>
              <textarea
                value={projectContext}
                onChange={(e) => setProjectContext(e.target.value)}
                placeholder="e.g., Building a React e-commerce app with user authentication, payment processing, and admin dashboard..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-gray-900 bg-white"
                rows={3}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerateSuggestions}
              disabled={loading || !projectContext.trim()}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating suggestions...
                </span>
              ) : (
                "Generate AI Suggestions"
              )}
            </button>

            {suggestions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Suggested Tasks:</h4>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm">
                        {suggestion.title}
                      </h5>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          suggestion.priority
                        )}`}
                      >
                        {suggestion.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      {suggestion.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>⏱️ {suggestion.estimatedHours}h estimated</span>
                      <span>💡 {suggestion.reasoning}</span>
                    </div>

                    <button
                      onClick={() => handleAcceptSuggestion(suggestion)}
                      className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Add to Tasks
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-gray-500 hover:text-gray-700 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
