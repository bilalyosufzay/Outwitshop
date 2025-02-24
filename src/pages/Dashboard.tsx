
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Hello, {user?.email}! Welcome to your dashboard.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard content cards */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Quick Stats</h2>
            <p className="mt-2 text-gray-600">Your activity overview</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <p className="mt-2 text-gray-600">Your latest actions</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            <p className="mt-2 text-gray-600">Important updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
