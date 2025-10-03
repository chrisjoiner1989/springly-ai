export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Chat</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                New Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Conversations
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            JD
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          John Doe
                        </p>
                        <p className="text-sm text-gray-500">
                          Hey, how's the project going?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            AS
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Alice Smith
                        </p>
                        <p className="text-sm text-gray-500">
                          Can we schedule a meeting?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            BJ
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Bob Johnson
                        </p>
                        <p className="text-sm text-gray-500">
                          Thanks for the update!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white shadow rounded-lg h-96 flex flex-col">
                <div className="px-4 py-5 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          JD
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <p className="text-sm text-gray-800">
                            Hey, how's the project going?
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-blue-500 text-white rounded-lg px-4 py-2">
                          <p className="text-sm">
                            It's going well! We're on track to meet the
                            deadline.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          2:32 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <p className="text-sm text-gray-800">
                            That's great to hear! Any blockers?
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">2:35 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
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
