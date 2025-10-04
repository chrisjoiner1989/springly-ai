"use client";

import Navigation from "@/components/layout/Navigation";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Chat</h1>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
              New Chat
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="text-lg leading-6 font-medium text-foreground mb-4">
                  Conversations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          JD
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Hey, how's the project going?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          AS
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        Alice Smith
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Can we schedule a meeting?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-muted-foreground rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          BJ
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        Bob Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Thanks for the update!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card h-96 flex flex-col">
                <div className="px-4 py-5 border-b border-border">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          JD
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <p className="text-sm text-foreground">
                            Hey, how's the project going?
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          2:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
                          <p className="text-sm">
                            It's going well! We're on track to meet the
                            deadline.
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          2:32 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <p className="text-sm text-foreground">
                            That's great to hear! Any blockers?
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          2:35 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-4 border-t border-border">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
