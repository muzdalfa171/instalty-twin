export default function CopilotPage() {
  return (
    <div className="min-h-screen bg-white text-black px-8 py-6">
      <h1 className="text-xl font-semibold mb-6">AI Copilot</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-medium mb-2">Chat Assistant</h2>
          <p className="text-gray-600 mb-4">Get instant help with your questions and tasks</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Start Chat →</button>
        </div>

        <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-medium mb-2">Document Analysis</h2>
          <p className="text-gray-600 mb-4">Upload documents for AI-powered insights</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Analyze Files →</button>
        </div>

        <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-medium mb-2">Smart Templates</h2>
          <p className="text-gray-600 mb-4">Generate content with AI templates</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Use Templates →</button>
        </div>
      </div>
    </div>
  )
}