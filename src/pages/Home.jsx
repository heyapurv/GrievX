import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUserAlt, FaClipboard, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const roles = [
    {
      icon: FaUserShield,
      title: "Admin",
      description: "Resolve complaints and manage teams",
      color: "blue",
      path: "/dashboard",
    },
    {
      icon: FaUserAlt,
      title: "Citizen",
      description: "Create and track your complaints",
      color: "emerald",
      path: "/citizenDashboard",
    },
    {
      icon: FaClipboard,
      title: "Chief",
      description: "Monitor analytics and performance",
      color: "violet",
      path: "/chiefDashboard",
    },
  ];

  const colorClasses = {
    blue: "from-blue-600 to-blue-700",
    emerald: "from-emerald-600 to-emerald-700",
    violet: "from-violet-600 to-violet-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                GrievX
              </h1>
              <p className="text-slate-400 text-sm mt-1">Civic Complaint Management Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Empower Your Community
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Fast, transparent, and accountable complaint resolution. Choose your role to get started.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/20 transition-all"
          >
            Get Started <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                onClick={() => navigate(role.path)}
                className="group cursor-pointer bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${colorClasses[role.color]} rounded-lg mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                <p className="text-slate-400 mb-5">{role.description}</p>
                <div className="flex items-center gap-2 text-slate-300 group-hover:gap-3 transition-all">
                  <span className="text-sm font-semibold">Enter Dashboard</span>
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-16 border-t border-slate-700/50">
          {[
            { label: "Complaints Managed", value: "50K+" },
            { label: "Resolution Time", value: "72 hrs" },
            { label: "User Satisfaction", value: "98%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}