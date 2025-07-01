"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, ChevronDown, ChevronUp, User } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useAuth } from "../context/auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast.success("Logout successfully");
  };

  const handleProfileRedirect = () => {
    if (!user) return;

    if (user.role === "ADMIN") {
      navigate("/admin/dashBoard");
    } else if (user.role === "USER") {
      navigate("/admin/lfas");
    } else {
      navigate("/");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "LFA", path: "/lfa" },
    { name: "Work & Get Paid", path: "/work-get-paid" },
    { name: "Gram Panchayat (News)", path: "/gram-panchayat" },
    { name: "Services", path: "/services" },
    { name: "FAQs", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-1">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/assets/logo.jpeg" className="w-20 h-20 object-contain p-1" alt="logo" loading="lazy" />
            <Link to="/" className="flex-shrink-0 flex items-center ml-2">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 drop-shadow-md tracking-wide animate-pulse">
                Rural Connect
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
                >
                  <span className="capitalize">{user.name}</span>
                  {desktopDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {desktopDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    <button
                      onClick={() => {
                        handleProfileRedirect();
                        setDesktopDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" /> Profile
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setDesktopDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="flex items-center gap-1 w-full px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition-all duration-150 cursor-pointer"
              >
                <span className="capitalize">{user.name}</span>
                {mobileDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

             {mobileDropdownOpen && (
  <div className="mt-1 bg-white border border-gray-200 shadow-md rounded-md">
    <button
      onClick={() => {
        handleProfileRedirect();
        setMobileDropdownOpen(false);
        setIsOpen(false);
      }}
      className="flex cursor-pointer items-center gap-2 w-full px-4 py-3 text-left text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-t-md"
    >
      <User className="w-5 h-5" /> Profile
    </button>

    <button
      onClick={() => {
        handleLogout();
        setMobileDropdownOpen(false);
        setIsOpen(false);
      }}
      className="flex cursor-pointer items-center gap-2 w-full px-4 py-3 text-left text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-b-md"
    >
      <LogOut className="w-5 h-5" /> Logout
    </button>
  </div>
)}

            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
