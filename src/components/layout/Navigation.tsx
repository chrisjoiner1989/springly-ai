"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import SpriglyLogo from "@/components/ui/SpriglyLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  DashboardIcon,
  TasksIcon,
  EventsIcon,
  ChatIcon,
} from "@/components/ui/Icons";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "Tasks", href: "/dashboard/tasks", icon: TasksIcon },
    { name: "Events", href: "/dashboard/events", icon: EventsIcon },
    { name: "Chat", href: "/dashboard/chat", icon: ChatIcon },
  ];

  const isActive = (href: string) => pathname === href;

  if (status === "loading") {
    return (
      <nav
        className={`bg-background shadow-sm border-b border-border ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <nav
      className={`bg-background shadow-sm border-b border-border ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center"
              >
                <SpriglyLogo size="md" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="hidden sm:block">
              <span className="text-sm text-muted-foreground">
                Welcome,{" "}
                <span className="font-medium text-foreground">
                  {session.user?.name || session.user?.email}
                </span>
              </span>
            </div>

            <button
              onClick={() => signOut()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
