import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">RuralConnect</h2>
            <p className="text-gray-300 mb-4">
              Empowering rural communities through connectivity, resources, and opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-emerald-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-emerald-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/lfa" className="text-gray-300 hover:text-emerald-400">
                  LFA Program
                </Link>
              </li>
              <li>
                <Link to="/work-get-paid" className="text-gray-300 hover:text-emerald-400">
                  Work & Get Paid
                </Link>
              </li>
              <li>
                <Link to="/gram-panchayat" className="text-gray-300 hover:text-emerald-400">
                  Gram Panchayat
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400">
                  Rural Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-emerald-400">
                  Skill Development
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-emerald-400" />
                <span className="text-gray-300">123 Rural Road, Village Center</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-emerald-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-emerald-400" />
                <span className="text-gray-300">info@ruralconnect.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RuralConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
