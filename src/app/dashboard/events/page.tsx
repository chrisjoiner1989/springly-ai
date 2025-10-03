export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Events</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </a>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Team Meeting</p>
                        <p className="text-sm text-green-700">Today at 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-800">Project Review</p>
                        <p className="text-sm text-blue-700">Tomorrow at 10:00 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-purple-800">Client Presentation</p>
                        <p className="text-sm text-purple-700">Friday at 3:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Calendar</h3>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  <div className="font-medium text-gray-500 py-2">Mon</div>
                  <div className="font-medium text-gray-500 py-2">Tue</div>
                  <div className="font-medium text-gray-500 py-2">Wed</div>
                  <div className="font-medium text-gray-500 py-2">Thu</div>
                  <div className="font-medium text-gray-500 py-2">Fri</div>
                  <div className="font-medium text-gray-500 py-2">Sat</div>
                  <div className="font-medium text-gray-500 py-2">Sun</div>
                  
                  <div className="py-2 text-gray-400">25</div>
                  <div className="py-2 text-gray-400">26</div>
                  <div className="py-2 text-gray-400">27</div>
                  <div className="py-2 text-gray-400">28</div>
                  <div className="py-2 text-gray-400">29</div>
                  <div className="py-2 text-gray-400">30</div>
                  <div className="py-2 text-gray-400">31</div>
                  
                  <div className="py-2">1</div>
                  <div className="py-2 bg-green-100 text-green-800 rounded">2</div>
                  <div className="py-2">3</div>
                  <div className="py-2">4</div>
                  <div className="py-2 bg-blue-100 text-blue-800 rounded">5</div>
                  <div className="py-2">6</div>
                  <div className="py-2">7</div>
                  
                  <div className="py-2">8</div>
                  <div className="py-2">9</div>
                  <div className="py-2">10</div>
                  <div className="py-2">11</div>
                  <div className="py-2">12</div>
                  <div className="py-2">13</div>
                  <div className="py-2">14</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

