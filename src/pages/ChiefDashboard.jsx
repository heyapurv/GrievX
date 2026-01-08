import { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaClock } from "react-icons/fa";

const CROSS_LIMIT_DAYS = 7;

function getDaysAgo(ts) {
  return Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000));
}

export default function ChiefDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API}/api/v1/complaints`, { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        setComplaints((data.complaints || []).map(c => ({
          id: c._id,
          title: c.title,
          department: c.category,
          createdAt: new Date(c.createdAt).getTime(),
          status: c.status,
        })));
      } catch (err) {
        console.error('Failed to fetch complaints', err);
      }
    })();
  }, []);

  function handleResolve(id) {
    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API}/api/v1/complaints/${id}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: 'Resolved' })
        });
        if (!res.ok) {
          console.error('Failed to update status');
          return;
        }
        const data = await res.json();
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: data.complaint.status } : c));
      } catch (err) {
        console.error(err);
      }
    })();
  }

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const crossed = complaints.filter(
    c => c.status !== "Resolved" && getDaysAgo(c.createdAt) > CROSS_LIMIT_DAYS
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Chief Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">Monitor system performance and analytics</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-3xl text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{total}</p>
            <p className="text-gray-600 font-medium">Total Complaints</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <FaCheckCircle className="text-3xl text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{resolved}</p>
            <p className="text-gray-600 font-medium">Resolved</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <FaExclamationCircle className="text-3xl text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{crossed}</p>
            <p className="text-gray-600 font-medium">Overdue (&gt;{CROSS_LIMIT_DAYS} days)</p>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Complaints Heatmap</h3>
          <img
            src="/heatmap.jpg"
            alt="Complaints Heatmap"
            className="w-full max-w-md mx-auto rounded-lg border border-gray-200"
            loading="lazy"
          />
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">All Complaints</h2>
          </div>

          {complaints.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">No complaints found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Days</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.map((complaint) => {
                    const days = getDaysAgo(complaint.createdAt);
                    const crossed = complaint.status !== "Resolved" && days > CROSS_LIMIT_DAYS;
                    const statusColor = complaint.status === "Resolved" ? 'bg-emerald-100 text-emerald-800' : crossed ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800';

                    return (
                      <tr key={complaint.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{complaint.id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate">{complaint.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{complaint.department}</td>
                        <td className={`px-6 py-4 text-sm font-semibold ${crossed ? 'text-red-600' : 'text-gray-900'}`}>{days}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {complaint.status !== "Resolved" && (
                            <button
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-xs"
                              onClick={() => handleResolve(complaint.id)}
                            >
                              Resolve
                            </button>
                          )}
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