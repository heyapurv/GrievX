"use client"

import { useState, useRef, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef()
  const mobileRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinkStyles =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
  const activeLinkStyles = "text-blue-600 bg-blue-50 "

  return (
    <nav
      className={`w-full border-b border-gray-200 text-gray-600 sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        isScrolled ? "bg-transparent backdrop-blur-sm border-gray-200/50 text-gradient-to-br from-slate-900 via-slate-800 to-slate-900 " : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3 flex-shrink-0 rounded-full">
            <img src="/logo.png" alt="GrievX Logo" className="h-10 w-10 object-contain rounded-full" />
            <span className="text-xl font-bold tracking-tight hidden sm:inline">GrievX</span>
          </div>



          <div className={`hidden md:flex items-center gap-1 ${isScrolled ? "text-white" : "text-gray-700"}`}>
            <NavLink to="/" className={({ isActive }) => `${navLinkStyles} ${isActive ? activeLinkStyles : ""}`}>
              Home
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => `${navLinkStyles} ${isActive ? activeLinkStyles : ""}`}>
              FAQ
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkStyles} ${isActive ? activeLinkStyles : ""}`}>
              About
            </NavLink>
          </div>

     
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role === "admin" && (
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 hover:text-white ${isActive ? "bg-blue-600" : ""}`
                    }
                  >
                    Admin
                  </NavLink>
                )}
                {user.role === "citizen" && (
                  <NavLink
                    to="/citizenDashboard"
                    className={({ isActive }) =>
                      `${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 hover:text-white ${isActive ? "bg-blue-600" : ""}`
                    }
                  >
                    Citizen
                  </NavLink>
                )}
                {user.role === "chief" && (
                  <NavLink
                    to="/chiefDashboard"
                    className={({ isActive }) =>
                      `${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 hover:text-white ${isActive ? "bg-blue-600" : ""}`
                    }
                  >
                    Chief
                  </NavLink>
                )}

                {/* Profile Dropdown */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Account menu"
                    aria-expanded={dropdownOpen}
                  >
                    <FaUserCircle size={28} className="text-blue-600" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 capitalize mt-1">{user.role}</div>
                      </div>
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          logout()
                          navigate("/login")
                        }}
                        className="w-full text-left px-4 py-2 mt-1 text-red-600 hover:bg-red-50 font-medium text-sm transition-colors rounded-lg mx-2 my-1 px-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) => `${navLinkStyles} ${isActive ? activeLinkStyles : ""}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

     {/* mobile menu btn */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* for mobile  */}
        {mobileMenuOpen && (
          <div ref={mobileRef} className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-1 mt-4">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `${navLinkStyles} block ${isActive ? activeLinkStyles : ""}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `${navLinkStyles} block ${isActive ? activeLinkStyles : ""}`}
              >
                FAQ
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `${navLinkStyles} block ${isActive ? activeLinkStyles : ""}`}
              >
                About
              </NavLink>

              <div className="pt-4 border-t border-gray-200 mt-4">
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <NavLink
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block ${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 ${isActive ? "bg-blue-600" : ""}`
                        }
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    {user.role === "citizen" && (
                      <NavLink
                        to="/citizenDashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block ${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 ${isActive ? "bg-blue-600" : ""}`
                        }
                      >
                        Citizen Dashboard
                      </NavLink>
                    )}
                    {user.role === "chief" && (
                      <NavLink
                        to="/chiefDashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block ${navLinkStyles} bg-blue-500 text-white hover:bg-blue-600 ${isActive ? "bg-blue-600" : ""}`
                        }
                      >
                        Chief Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        logout()
                        navigate("/login")
                      }}
                      className="w-full text-left px-4 py-2 mt-2 text-red-600 hover:bg-red-50 font-medium text-sm transition-colors rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <NavLink
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `${navLinkStyles} block text-center ${isActive ? activeLinkStyles : ""}`
                      }
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all text-center"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
