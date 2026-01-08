import React, { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaClock } from "react-icons/fa";

const initialComplaints = [];

function ComplaintCard({ complaint }) {
  const statusColor = complaint.status === "Resolved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";
  const statusIcon = complaint.status === "Resolved" ? <FaCheckCircle /> : <FaClock />;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {complaint.imageUrl && (
        <img
          src={complaint.imageUrl || "/placeholder.svg"}
          alt={complaint.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{complaint.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Category:</span> {complaint.category}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Location:</span> {complaint.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Duration:</span> {complaint.duration}
          </div>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold ${statusColor}`}>
          {statusIcon}
          {complaint.status}
        </div>
      </div>
    </div>
  );
}

function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    duration: "",
    imageUrl: ""
  });
  const [previewPhoto, setPreviewPhoto] = useState("");
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewPhoto(ev.target.result);
    reader.readAsDataURL(file);
    setForm({ ...form, imageUrl: "" });
  };

  const handleImageUrlChange = (e) => {
    setForm({ ...form, imageUrl: e.target.value });
    setPreviewPhoto(e.target.value);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewPhoto(ev.target.result);
      reader.readAsDataURL(file);
      setForm({ ...form, imageUrl: "" });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.category || !form.location || !form.duration) return;

    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API}/api/v1/complaints`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: form.title,
            category: form.category,
            location: form.location,
            duration: form.duration,
            imageUrl: previewPhoto || form.imageUrl || "",
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.message || 'Failed to submit complaint');
          return;
        }

        const data = await res.json();
        const complaint = data?.complaint || ({
          ...form,
          id: Date.now(),
          status: 'Pending',
          imageUrl: previewPhoto
        });

        onSubmit(complaint);
        setForm({ title: "", category: "", location: "", duration: "", imageUrl: "" });
        setPreviewPhoto("");
      } catch (err) {
        console.error(err);
        alert('Network error while submitting complaint');
      }
    })();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-2xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a Complaint</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Eg: Damaged streetlight at Main Road"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Category</option>
              <option value="Road">Road</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ward 3, near city library"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Duration of Problem *</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Eg: 4 days"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Photo</label>
          <div
            className="border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <FaCloudUploadAlt className="text-4xl text-blue-500 mx-auto mb-3" />
            <p className="font-semibold text-gray-900 mb-1">Click or drag & drop to upload</p>
            <p className="text-xs text-gray-600">PNG, JPG or GIF. Max 10MB</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Or paste image URL here"
              value={form.imageUrl}
              onChange={handleImageUrlChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
          </div>

          {previewPhoto && (
            <div className="mt-4">
              <img src={previewPhoto || "/placeholder.svg"} alt="Preview" className="h-32 mx-auto rounded-lg border border-gray-200" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);

  useEffect(() => {
    (async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API}/api/v1/complaints/me`, { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        setComplaints(data.complaints || []);
      } catch (err) {
        console.error('Failed to fetch complaints', err);
      }
    })();
  }, []);

  const handleAddComplaint = (data) => {
    setComplaints([data, ...complaints]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 text-sm mt-1">Create and track your civic complaints</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ComplaintForm onSubmit={handleAddComplaint} />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Complaints</h2>
          {complaints.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">No complaints yet. Submit one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map(comp => <ComplaintCard key={comp._id || comp.id} complaint={comp} />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}