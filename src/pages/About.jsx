import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const team = [
  {
    name: "Jay Joshi",
    role: "Project Lead",
    email: "jayjoshi9923@gmail.com",
    github: "https://github.com/JayJoshi9923",
    linkedin: "https://www.linkedin.com/in/jay-joshi-ba778325b/",
    photo: "JayPhoto.jpg",
  },
  {
    name: "Vedant Dhepe",
    role: "Full Stack Developer",
    email: "vedantdhepe101@gmail.com",
    github: "https://github.com/VedantDhepe",
    linkedin: "https://linkedin.com/in/VedantDhepe",
    photo: "VedantPhoto.jpg",
  },
  {
    name: "Nishant Bayaskar",
    role: "ML/DA Engineer",
    email: "bayaskarnishant6@gmail.com",
    github: "https://github.com/alpha31032005",
    linkedin: "https://linkedin.com/in/nishant-bayaskar-ba1323262",
    photo: "NishantPhoto.jpg",
  },
  {
    name: "Bhumika Thakare",
    role: "Frontend Developer",
    email: "bhumikathakare@gmail.com",
    github: "https://github.com/member4",
    linkedin: "https://linkedin.com/in/member4",
    photo: "https://avatars.githubusercontent.com/u/91714690?v=4",
  },
  {
    name: "Madhura Bathe",
    role: "AI/ML Engineer",
    email: "member5@email.com",
    github: "https://github.com/member5",
    linkedin: "https://linkedin.com/in/member5",
    photo: "https://avatars.githubusercontent.com/u/91714690?v=4",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">About GrievX</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            A smart civic complaint management platform built to empower citizens and authorities with fast, transparent, and data-driven issue resolution.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Citizens</h3>
            <p className="text-gray-600 leading-relaxed">Instantly report civic issues and get real-time updates. Your complaint reaches the right authority, and you can track progress at every stage.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Admins</h3>
            <p className="text-gray-600 leading-relaxed">Centralized dashboard to resolve cases, prioritize tasks, and communicate with citizens—making municipality processes fast and fair.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">For Supervisors</h3>
            <p className="text-gray-600 leading-relaxed">Monitor complaint volumes, overdue cases, and team performance. Ensure high-impact problems are resolved efficiently.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Impact</h3>
            <p className="text-gray-600 leading-relaxed">Detailed area support with every district & taluka covered. Simple forms, mobile-ready design, clear language for everyone.</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition">
                <img
                  src={member.photo || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-4">{member.role}</p>
                  <div className="flex gap-3">
                    <a href={`mailto:${member.email}`} className="p-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg transition">
                      <FaEnvelope />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 hover:bg-gray-800 text-gray-700 hover:text-white rounded-lg transition">
                      <FaGithub />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white rounded-lg transition">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}