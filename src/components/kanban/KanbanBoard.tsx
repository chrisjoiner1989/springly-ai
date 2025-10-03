"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@prisma/client";
import AITaskAnalyzer from "../tasks/AITaskAnalyzer";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

interface TaskCardProps {
  task: Task;
  allTasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

function TaskCard({ task, allTasks, onTaskUpdate }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: "border-red-500 bg-red-50",
    medium: "border-yellow-500 bg-yellow-50",
    low: "border-green-500 bg-green-50",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 bg-white rounded-lg shadow-sm border-l-4 ${
        priorityColors[task.priority as keyof typeof priorityColors] ||
        "border-gray-500 bg-gray-50"
      } ${isDragging ? "opacity-50" : ""} cursor-grab active:cursor-grabbing`}
    >
      <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
      {task.description && (
        <p className="text-xs text-gray-600 mt-1">{task.description}</p>
      )}
      {task.dueDate && (
        <p className="text-xs text-gray-500 mt-2">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="mt-2 flex justify-end">
        <AITaskAnalyzer
          task={task}
          existingTasks={allTasks}
          onUpdateTask={onTaskUpdate}
        />
      </div>
    </div>
  );
}

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  allTasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

function Column({ id, title, tasks, allTasks, onTaskUpdate }: ColumnProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[400px]">
      <h3 className="font-semibold text-gray-800 mb-4 text-center">{title}</h3>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              allTasks={allTasks}
              onTaskUpdate={onTaskUpdate}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanBoard({ tasks, onTaskUpdate }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setTodoTasks(tasks.filter((task) => task.status === "todo"));
    setInProgressTasks(tasks.filter((task) => task.status === "in_progress"));
    setDoneTasks(tasks.filter((task) => task.status === "done"));
  }, [tasks]);

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    // Find the current task
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Update the task status
    onTaskUpdate(taskId, { status: newStatus });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column
          id="todo"
          title="To Do"
          tasks={todoTasks}
          allTasks={tasks}
          onTaskUpdate={onTaskUpdate}
        />
        <Column
          id="in_progress"
          title="In Progress"
          tasks={inProgressTasks}
          allTasks={tasks}
          onTaskUpdate={onTaskUpdate}
        />
        <Column
          id="done"
          title="Done"
          tasks={doneTasks}
          allTasks={tasks}
          onTaskUpdate={onTaskUpdate}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            allTasks={tasks}
            onTaskUpdate={onTaskUpdate}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
