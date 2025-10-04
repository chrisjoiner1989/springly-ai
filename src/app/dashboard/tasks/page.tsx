"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Navigation from "@/components/layout/Navigation";
import AITaskCreator from "@/components/tasks/AITaskCreator";
import AISetupNotice from "@/components/ui/AISetupNotice";
import { Task } from "@prisma/client";

export default function TasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    if (status === "authenticated") {
      fetchTasks();
    }
  }, [status, router]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, ...updates }),
      });

      if (response.ok) {
        // Update local state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    priority: string;
    estimatedHours: number;
  }) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks((prevTasks) => [data.task, ...prevTasks]);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading tasks...</p>
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
          {/* AI Setup Notice */}
          <AISetupNotice />

          {/* AI Task Creator */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">
              Task Management
            </h1>
            <AITaskCreator
              onTaskCreate={handleCreateTask}
              existingTasks={tasks.map((task) => task.title)}
            />
          </div>

          <KanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        </div>
      </div>
    </div>
  );
}
