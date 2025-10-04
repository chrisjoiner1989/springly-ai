"use client";

import { useState } from "react";

export default function AISetupNotice() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            🤖 AI Features Setup
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            To enable AI-powered task suggestions and analysis, you need to
            configure your OpenAI API key.
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <p>
              <strong>Steps to enable AI features:</strong>
            </p>
            <ol className="list-decimal list-inside ml-2 space-y-1">
              <li>
                Get an API key from{" "}
                <a
                  href="https://platform.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  OpenAI Platform
                </a>
              </li>
              <li>
                Add{" "}
                <code className="bg-blue-100 px-1 rounded">
                  OPENAI_API_KEY="your-key-here"
                </code>{" "}
                to your <code className="bg-blue-100 px-1 rounded">.env</code>{" "}
                file
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-blue-400 hover:text-blue-600 ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
