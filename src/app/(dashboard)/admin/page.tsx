export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">User Management</h2>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Content Management</h2>
            <p className="text-gray-600">Manage website content and resources</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Analytics</h2>
            <p className="text-gray-600">View site statistics and reports</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {/* Add activity list here */}
          <p className="text-gray-600">No recent activities</p>
        </div>
      </div>
    </div>
  )
} 