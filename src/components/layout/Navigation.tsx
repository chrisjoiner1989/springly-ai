"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import SpriglyLogo from "@/components/ui/SpriglyLogo";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Tasks", href: "/dashboard/tasks", icon: "📋" },
    { name: "Events", href: "/dashboard/events", icon: "📅" },
    { name: "Chat", href: "/dashboard/chat", icon: "💬" },
  ];

  const isActive = (href: string) => pathname === href;

  if (status === "loading") {
    return (
      <nav className={`bg-white shadow-sm border-b ${className}`}>
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
    <nav className={`bg-white shadow-sm border-b ${className}`}>
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
                      ? "bg-teal-100 text-teal-700"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className="text-sm text-gray-600">
                Welcome,{" "}
                <span className="font-medium">
                  {session.user?.name || session.user?.email}
                </span>
              </span>
            </div>

            <button
              onClick={() => signOut()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
