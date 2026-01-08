import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaCamera, FaCheckCircle } from "react-icons/fa";

const districtsData = {
  "Ahmednagar": ["Ahmednagar", "Shrigonda", "Kopargaon", "Rahata", "Akole", "Sangamner", "Parner", "Rahuri", "Shrirampur", "Nevasa", "Shevgaon", "Pathardi", "Jamkhed"],
  "Akola": ["Akola", "Akot", "Balapur", "Murtizapur", "Patur", "Telhara"],
  "Amravati": ["Amravati", "Bhatkuli", "Nandgaon Khandeshwar", "Dharni", "Chikhaldara", "Achalpur", "Chandurbazar", "Morshi", "Warud", "Daryapur", "Anjangaon Surji", "Chandur Bazar", "Dhamangaon Railway", "Tiosa"],
  "Aurangabad": ["Aurangabad", "Kannad", "Vaijapur", "Gangapur", "Sillod", "Soegaon", "Khuldabad", "Phulambri", "Paithan"],
  "Beed": ["Beed", "Ashti", "Patoda", "Shirur (Kasar)", "Georai", "Majalgaon", "Ambajogai", "Parli", "Wadwani", "Kaij", "Dharur"],
  "Bhandara": ["Bhandara", "Tumsar", "Mohadi", "Sakoli", "Pauni", "Lakhani", "Lakhandur"],
  "Buldhana": ["Buldhana", "Chikhli", "Deulgaon Raja", "Malkapur", "Motala", "Nandura", "Sangrampur", "Shegaon", "Jalgaon Jamod", "Lonar", "Mehkar"],
  "Chandrapur": ["Chandrapur", "Ballarpur", "Bhadravati", "Warora", "Chimur", "Nagbhid", "Mul", "Saoli", "Gondpipri", "Korpana", "Pombhurna", "Rajura", "Tadoor"],
  "Dhule": ["Dhule", "Sakri", "Shirpur"],
  "Gadchiroli": ["Gadchiroli", "Armori", "Sironcha", "Kurkheda", "Desaiganj (Wadsa)", "Aheri", "Chimur", "Dhanora", "Mulchera", "Bhamragad", "Etapalli", "Chamorshi"],
  "Gondia": ["Gondia", "Tirora", "Tumsar", "Arjuni Morgaon", "Salekasa", "Sadak Arjuni", "Deori"],
  "Hingoli": ["Hingoli", "Basmath", "Kalamnuri", "Sengaon", "Aundha Nagnath"],
  "Jalgaon": ["Jalgaon", "Bhusawal", "Erandol", "Chalisgaon", "Jamner", "Pachora", "Parola", "Bodwad", "Dharangaon", "Muktainagar", "Raver", "Yawal", "Amalner"],
  "Jalna": ["Jalna", "Ambad", "Partur", "Ghansawangi", "Mantha", "Bhokardan", "Badnapur", "Sindkhed Raja"],
  "Kolhapur": ["Karvir", "Panhala", "Hatkanangle", "Shirol", "Gadhinglaj", "Radhanagari", "Chandgad", "Kagal", "Ajara"],
  "Latur": ["Latur", "Renapur", "Udgir", "Nilanga", "Ausa", "Jalkot", "Shirur Anantpal", "Deoni"],
  "Mumbai City": ["Mumbai"],
  "Mumbai Suburban": ["Andheri", "Borivali", "Kurla"],
  "Nagpur": ["Nagpur", "Kamptee", "Ramtek", "Katol", "Narkhed", "Kalameshwar", "Parshivni", "Hingna", "Umred", "Mouda"],
  "Nanded": ["Nanded", "Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahur", "Mudkhed", "Moktali", "Mukhed", "Naigaon (Khairgaon)", "Umri"],
  "Nandurbar": ["Nandurbar", "Akkalkuwa", "Taloda", "Shahada", "Dhadgaon", "Navapur"],
  "Nashik": ["Nashik", "Sinnar", "Dindori", "Igatpuri", "Malegaon", "Nandgaon", "Yeola", "Deola", "Baglan", "Chandwad", "Kalwan", "Trimbak"],
  "Osmanabad": ["Osmanabad", "Tuljapur", "Bhum", "Paranda", "Kalamb", "Vashi", "Lohara", "Umarga"],
  "Palghar": ["Vasai", "Palghar", "Dahanu", "Talasari", "Jawhar", "Mokhada", "Vikramgad", "Wada"],
  "Parbhani": ["Parbhani", "Pathri", "Sonpeth", "Manwath", "Gangakhed", "Palam", "Jintur", "Sailu", "Purna"],
  "Pune": ["Pune City", "Haveli", "Khed", "Shirur", "Junnar", "Ambegaon", "Mawal", "Mulshi", "Bhor", "Baramati", "Indapur", "Daund"],
  "Raigad": ["Alibag", "Pen", "Panvel", "Khalapur", "Uran", "Karjat", "Roha", "Sudhagad", "Mahad", "Poladpur", "Shrivardhan", "Mangaon", "Murud"],
  "Ratnagiri": ["Ratnagiri", "Sangameshwar", "Chiplun", "Guhagar", "Khed", "Mandangad", "Dapoli", "Lanja"],
  "Sangli": ["Sangli", "Miraj", "Kavathe Mahankal", "Tasgaon", "Palus", "Jath", "Atpadi", "Khanapur", "Walwa", "Shirala"],
  "Satara": ["Satara", "Karad", "Wai", "Khandala", "Phaltan", "Man", "Mahabaleshwar", "Jaoli", "Patan"],
  "Sindhudurg": ["Kudal", "Sawantwadi", "Vengurla", "Malwan", "Devgad", "Vaibhavwadi", "Dodamarg", "Kanakavali"],
  "Solapur": ["Solapur North", "Solapur South", "Akkalkot", "Barshi", "Madha", "Karmala", "Pandharpur", "Mohol", "Malshiras", "Sangola", "Mangalwedha"],
  "Thane": ["Thane", "Bhiwandi", "Kalyan", "Ulhasnagar", "Ambarnath", "Murbad", "Shahapur", "Vasai", "Palghar", "Dahanu", "Jawhar", "Mokhada", "Talasari", "Vikramgad", "Wada"],
  "Wardha": ["Wardha", "Deoli", "Hinganghat", "Arvi", "Samudrapur", "Seloo", "Ashti", "Karanja"],
  "Washim": ["Washim", "Risod", "Malegaon", "Mangrulpir", "Karanja", "Manora"],
  "Yavatmal": ["Yavatmal", "Wani", "Maregaon", "Pandharkawada (Kelapur)", "Ralegaon", "Ghatanji", "Darwha", "Ner", "Digras", "Arni", "Pusad", "Mahagaon", "Umarkhed", "Kalamb"],
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    state: "Maharashtra",
    district: "",
    taluka: "",
    profilePic: "",
  });
  const [previewPic, setPreviewPic] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(old => ({
      ...old,
      [name]: value,
      ...(name === "district" && { taluka: "" })
    }));
  }

  function handlePicUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewPic(ev.target.result);
      setForm((old) => ({ ...old, profilePic: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone || !form.address || !form.district || !form.taluka || !form.gender || !form.dob) {
      setError("Please fill all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    (async () => {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        profilePic: form.profilePic || "",
      };
      const ok = await register(payload);
      setLoading(false);
      if (ok) {
        setSuccess(true);
        setError("");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Registration failed. Email may already be registered.");
      }
    })();
  }

  const talukaOptions = form.district ? districtsData[form.district] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join GrievX to make your voice heard</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
              <FaCheckCircle className="text-emerald-600 text-lg" />
              <div>
                <p className="text-emerald-900 font-semibold">Registration successful!</p>
                <p className="text-emerald-700 text-sm">Redirecting to login...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-semibold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Profile Picture</label>
              <div className="flex justify-center">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-32 h-32 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all"
                >
                  {previewPic ? (
                    <img src={previewPic || "/placeholder.svg"} alt="Preview" className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <div className="text-center">
                      <FaCamera className="text-blue-500 text-3xl mx-auto mb-2" />
                      <p className="text-xs text-gray-600">Upload photo</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileRef} onChange={handlePicUpload} className="hidden" />
              </div>
            </div>

            {/* Personal Information Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <select
                    name="state"
                    value={form.state}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select District</option>
                    {Object.keys(districtsData).map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Taluka *</label>
                  <select
                    name="taluka"
                    value={form.taluka}
                    onChange={handleChange}
                    required
                    disabled={!form.district}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-50"
                  >
                    <option value="">Select Taluka</option>
                    {talukaOptions.map((tal) => (
                      <option key={tal} value={tal}>{tal}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role *</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="citizen">Citizen</option>
                  <option value="admin">Admin</option>
                  <option value="chief">Chief</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}