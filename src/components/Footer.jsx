import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaArrowRight } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">GrievX</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Empowering residents, enabling change. Smart civic complaint management.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/VedantDhepe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/vedant-dhepe-460985252/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:grievX@gmail.com"
                aria-label="Email"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="tel:+917972261841"
                aria-label="Phone"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <FaPhoneAlt size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:grievX@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <FaEnvelope size={16} />
                  Email Support
                </a>
              </li>
              <li>
                <a
                  href="tel:+917972261841"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <FaPhoneAlt size={16} />
                  +91-7972261841
                </a>
              </li>
              <li className="text-gray-400 text-sm pt-2">Available 24/7 for assistance</li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-6">Get Involved</h4>
            <p className="text-gray-400 text-sm mb-4">
              Help us improve civic engagement. Contribute to a better community.
            </p>
            <a
              href="https://github.com/VedantDhepe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>&copy; {currentYear} GrievX. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
