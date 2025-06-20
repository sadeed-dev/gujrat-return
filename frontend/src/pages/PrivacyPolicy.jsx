"use client"
import { Shield, UserCheck, Lock, AlertTriangle } from "lucide-react"
import React from "react"

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 font-medium mb-2 sm:mb-0">
              <strong>Last Updated:</strong> May 15, 2023
            </p>
            <div className="flex items-center text-[oklch(0.7_0.15_160deg)]">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Your Privacy Matters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <div className="prose prose-emerald max-w-none">
              <p>
                GramSeva ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile
                application, or access our services.
              </p>
              <p>
                We value the trust you place in us and recognize the importance of secure transactions and information
                privacy. This Privacy Policy describes how we collect, use, share and information privacy. This Privacy
                Policy describes how we collect, use, share, and protect information in connection with GramSeva's
                websites, mobile applications, and services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you
                have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not
                agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center mb-4">
              <UserCheck className="h-8 w-8 text-[oklch(0.7_0.15_160deg)] mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We collect several types of information from and about users of our services, including:
            </p>

            <div className="space-y-6 ">
              {/* Personal Information */}
              <div className="border border-gray-200 rounded-lg overflow-hidden" >
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("personal-info").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="personal-info" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">We may collect personal information that you provide directly to us, such as:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Name, address, email address, and phone number</li>
                    <li>Date of birth and gender</li>
                    <li>Government-issued identification details (for certain services)</li>
                    <li>Employment information and skills (for Work & Get Paid program)</li>
                    <li>Educational qualifications (for LFA program applicants)</li>
                    <li>Bank account details (for payment processing)</li>
                    <li>Village and panchayat details</li>
                  </ul>
                </div>
              </div>

              {/* Usage Information */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("usage-info").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Usage Information</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="usage-info" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">
                    We automatically collect certain information about how you access and use our services, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Log data (IP address, browser type, pages visited, time spent)</li>
                    <li>Device information (hardware model, operating system, unique device identifiers)</li>
                    <li>Location information (with your consent)</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </div>

              {/* Information from Third Parties */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("third-party-info").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Information from Third Parties</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="third-party-info" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">We may receive information about you from third parties, such as:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Government databases (for verification purposes)</li>
                    <li>Partner organizations and service providers</li>
                    <li>Social media platforms (if you connect your account)</li>
                    <li>Public sources and records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Special Categories of Data</h4>
                  <p className="text-gray-600">
                    In some cases, we may collect information that is considered sensitive, such as health information
                    (for healthcare services) or caste certificates (for government scheme eligibility). We only collect
                    this information with your explicit consent and for specific purposes related to our services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">We use the information we collect for various purposes, including:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Providing Services</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Delivering the services you request</li>
                  <li>Processing transactions and payments</li>
                  <li>Facilitating job matching (Work & Get Paid)</li>
                  <li>Enabling access to government schemes and services</li>
                  <li>Managing your account and preferences</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Communication</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Responding to your inquiries and requests</li>
                  <li>Sending service-related notifications</li>
                  <li>Providing updates about new services or features</li>
                  <li>Sending promotional communications (with your consent)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Improvement & Analysis</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Analyzing usage patterns to improve our services</li>
                  <li>Conducting research and surveys</li>
                  <li>Developing new features and services</li>
                  <li>Measuring the effectiveness of our programs</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Security & Compliance</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Protecting against fraud and unauthorized access</li>
                  <li>Verifying identity for certain services</li>
                  <li>Complying with legal obligations</li>
                  <li>Enforcing our terms and policies</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600">
              We process your information based on one or more of the following legal grounds:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mt-2">
              <li>To perform our contract with you</li>
              <li>For our legitimate interests</li>
              <li>To comply with legal obligations</li>
              <li>With your consent (which you can withdraw at any time)</li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-6">We may share your information in the following circumstances:</p>

            <div className="space-y-6 mb-6">
              {/* Service Providers */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("service-providers").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Service Providers</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="service-providers" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">
                    We share information with third-party service providers who perform services on our behalf, such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Payment processors</li>
                    <li>Cloud storage providers</li>
                    <li>Analytics companies</li>
                    <li>Customer support services</li>
                    <li>IT and security service providers</li>
                  </ul>
                  <p className="mt-3 text-gray-600">
                    These service providers are contractually obligated to use your information only to provide services
                    to us and in accordance with this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Program Partners */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("program-partners").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Program Partners</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="program-partners" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">
                    For certain programs, we may share your information with partners who help deliver our services:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Government agencies (for scheme implementation)</li>
                    <li>Employers (for Work & Get Paid program)</li>
                    <li>Training partners (for skill development programs)</li>
                    <li>Healthcare providers (for telemedicine services)</li>
                  </ul>
                  <p className="mt-3 text-gray-600">
                    We only share the information necessary for these partners to provide their services.
                  </p>
                </div>
              </div>

              {/* Legal Requirements */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center cursor-pointer"
                  onClick={() => document.getElementById("legal-requirements").classList.toggle("hidden")}
                >
                  <h3 className="text-lg font-bold text-gray-900">Legal Requirements</h3>
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div id="legal-requirements" className="px-6 py-4 border-t border-gray-200">
                  <p className="mb-3">
                    We may disclose your information if required to do so by law or in response to valid requests by
                    public authorities (e.g., a court or government agency).
                  </p>
                  <p className="mb-3">We may also disclose your information to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Enforce our terms and policies</li>
                    <li>Protect our rights, privacy, safety, or property</li>
                    <li>Protect against legal liability</li>
                    <li>Prevent fraud or illegal activities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[oklch(0.98_0.02_160deg)] border border-[oklch(0.9_0.05_160deg)] rounded-lg p-4">
              <div className="flex">
                <Lock className="h-6 w-6 text-[oklch(0.7_0.15_160deg)] mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Our Commitment</h4>
                  <p className="text-gray-600">
                    We do not sell your personal information to third parties. When we share your information with our
                    service providers and partners, we ensure they are bound by appropriate confidentiality and data
                    protection obligations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
              please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="mb-2">
                <strong>Email:</strong> privacy@gramseva.org
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <p className="mb-0">
                <strong>Address:</strong> 123 Rural Development Center, Village Square, District Name, State - 123456,
                India
              </p>
            </div>
            <p className="text-gray-600">
              We will respond to your inquiry as soon as possible and within the timeframe required by applicable law.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
