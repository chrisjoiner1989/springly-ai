"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SpriglyLogo from "@/components/ui/SpriglyLogo";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-4xl">
            {/* Logo */}
            <div className="mb-12 flex justify-center">
              <div className="p-8">
                <SpriglyLogo size="xl" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Welcome to <span className="text-primary">Sprigly</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A modern task management and collaboration platform with
              AI-powered insights, real-time chat, and intelligent kanban
              boards.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/auth/register"
                className="bg-primary text-primary-foreground font-semibold py-4 px-10 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="/auth/login"
                className="border border-border text-foreground font-semibold py-4 px-10 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
              >
                Sign In
              </a>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div className="card p-8 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                AI-Powered Tasks
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Organize your work with intelligent task prioritization,
                drag-and-drop kanban boards, and AI-generated insights.
              </p>
            </div>

            <div className="card p-8 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Smart Events
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Schedule and manage events with our intuitive calendar
                interface, team coordination tools, and automated reminders.
              </p>
            </div>

            <div className="card p-8 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Real-time Chat
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Collaborate with your team through instant messaging, file
                sharing, and real-time communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
