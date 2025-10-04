"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import {
  TasksCardIcon,
  EventsCardIcon,
  ChatCardIcon,
} from "@/components/ui/Icons";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                    <TasksCardIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">
                      Tasks
                    </dt>
                    <dd className="text-2xl font-bold text-foreground">12</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm">
                  <a
                    href="/dashboard/tasks"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all tasks →
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                    <EventsCardIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">
                      Events
                    </dt>
                    <dd className="text-2xl font-bold text-foreground">5</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm">
                  <a
                    href="/dashboard/events"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all events →
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                    <ChatCardIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground truncate">
                      Chat
                    </dt>
                    <dd className="text-2xl font-bold text-foreground">3</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm">
                  <a
                    href="/dashboard/chat"
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View chat →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
