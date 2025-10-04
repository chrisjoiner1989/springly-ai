"use client";

import Navigation from "@/components/layout/Navigation";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Events</h1>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Add Event
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg leading-6 font-medium text-foreground mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-400 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-r-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                        Team Meeting
                      </p>
                      <p className="text-sm text-teal-700 dark:text-teal-300">
                        Today at 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-primary bg-primary/10 p-4 rounded-r-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        Project Review
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow at 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-4 border-muted-foreground bg-muted p-4 rounded-r-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">
                        Client Presentation
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Friday at 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg leading-6 font-medium text-foreground mb-4">
                Calendar
              </h3>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                <div className="font-medium text-muted-foreground py-2">
                  Mon
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Tue
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Wed
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Thu
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Fri
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Sat
                </div>
                <div className="font-medium text-muted-foreground py-2">
                  Sun
                </div>

                <div className="py-2 text-muted-foreground">25</div>
                <div className="py-2 text-muted-foreground">26</div>
                <div className="py-2 text-muted-foreground">27</div>
                <div className="py-2 text-muted-foreground">28</div>
                <div className="py-2 text-muted-foreground">29</div>
                <div className="py-2 text-muted-foreground">30</div>
                <div className="py-2 text-muted-foreground">31</div>

                <div className="py-2 text-foreground">1</div>
                <div className="py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 rounded">
                  2
                </div>
                <div className="py-2 text-foreground">3</div>
                <div className="py-2 text-foreground">4</div>
                <div className="py-2 bg-primary/20 text-primary rounded">5</div>
                <div className="py-2 text-foreground">6</div>
                <div className="py-2 text-foreground">7</div>

                <div className="py-2 text-foreground">8</div>
                <div className="py-2 text-foreground">9</div>
                <div className="py-2 text-foreground">10</div>
                <div className="py-2 text-foreground">11</div>
                <div className="py-2 text-foreground">12</div>
                <div className="py-2 text-foreground">13</div>
                <div className="py-2 text-foreground">14</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
