import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle } from "react-icons/fa";
import { useEffect, useState } from "react";

function StatCard({ icon: Icon, value, label, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API}/api/v1/complaints`, { credentials: 'include' });
        if (!res.ok) return setLoading(false);
        const data = await res.json();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error('Failed to load complaints', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const pending = complaints.filter(c => c.status !== 'Resolved').length;
  const highPriority = complaints.filter(c => {
    if (!c.createdAt) return false;
    const days = Math.floor((Date.now() - new Date(c.createdAt).getTime()) / (24*60*60*1000));
    return c.status !== 'Resolved' && days > 7;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Manage complaints and monitor performance</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={FaClipboardList} value={total} label="Total Complaints" color="blue" />
          <StatCard icon={FaCheckCircle} value={resolved} label="Resolved" color="green" />
          <StatCard icon={FaHourglassHalf} value={pending} label="Pending" color="amber" />
          <StatCard icon={FaExclamationTriangle} value={highPriority} label="High Priority" color="red" />
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Complaints</h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">Loading complaints...</div>
          ) : complaints.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">No complaints found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Priority</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.slice(0, 20).map((complaint) => {
                    const days = complaint.createdAt ? Math.floor((Date.now() - new Date(complaint.createdAt).getTime()) / (24*60*60*1000)) : 0;
                    const priority = complaint.status !== 'Resolved' && days > 7 ? 'High' : (days > 3 ? 'Medium' : 'Low');
                    const priorityColor = priority === 'High' ? 'text-red-600 bg-red-50' : priority === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50';
                    const statusColor = complaint.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : complaint.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800';

                    return (
                      <tr key={complaint._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-mono text-gray-600 truncate">{complaint._id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium truncate">{complaint.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{complaint.category}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
                            {priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                            {complaint.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}