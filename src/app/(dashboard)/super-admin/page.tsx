export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Super Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Admin Management</h2>
            <p className="text-gray-600">Manage admin accounts and roles</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">System Settings</h2>
            <p className="text-gray-600">Configure system-wide settings</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Security</h2>
            <p className="text-gray-600">Manage security settings and logs</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Total Users</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Active Admins</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">System Health</h3>
            <p className="text-2xl font-bold text-green-600">Good</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Last Backup</h3>
            <p className="text-gray-600">Never</p>
          </div>
        </div>
      </div>
    </div>
  )
} 