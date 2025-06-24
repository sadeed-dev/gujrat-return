"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Users, CheckCircle } from 'lucide-react'
import React from "react"
const Contact = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    })

    // Reset form after successful submission
    setTimeout(() => {
      if (formStatus.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }
    }, 500)
  }

  const officeLocations = [
    {
      name: "Head Office",
      address: "123 Rural Development Center, Village Square, District Name, State - 123456",
      phone: "+91 98765 43210",
      email: "info@gramseva.org",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM",
    },
    {
      name: "Regional Office - North",
      address: "45 Community Hub, Sector 7, Uttarakhand - 248001",
      phone: "+91 87654 32109",
      email: "north@gramseva.org",
      hours: "Monday - Friday: 9:30 AM - 5:30 PM",
    },
    {
      name: "Regional Office - South",
      address: "78 Rural Tech Park, Hosur Road, Karnataka - 560100",
      phone: "+91 76543 21098",
      email: "south@gramseva.org",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM",
    },
  ]

  const faqItems = [
    {
      question: "How can I partner with GramSeva?",
      answer:
        "Organizations interested in partnering with us can fill out the contact form on this page or email us directly at partnerships@gramseva.org with details about your organization and partnership interests.",
    },
    {
      question: "How long does it take to get a response?",
      answer:
        "We typically respond to all inquiries within 48 hours during business days. For urgent matters, please call our helpline at +91 98765 43210.",
    },
    {
      question: "Can I visit your offices without an appointment?",
      answer:
        "While we welcome visitors, we recommend scheduling an appointment to ensure that the relevant team members are available to meet with you and address your specific needs.",
    },
    {
      question: "Do you provide support in local languages?",
      answer:
        "Yes, our team members speak multiple Indian languages including Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati to ensure effective communication with all communities.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or want to learn more about our programs? We're here to help. Reach out to us through any of
            the channels below.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-6 w-6 text-[oklch(0.7_0.15_160deg)] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>

                {formStatus.submitted && formStatus.success ? (
                  <div className="bg-[oklch(0.95_0.05_160deg)] border border-[oklch(0.85_0.1_160deg)] rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-0.5 mr-2" />
                      <p className="text-gray-700">{formStatus.message}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.7_0.15_160deg)] focus:border-transparent"
                      ></textarea>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[oklch(0.7_0.15_160deg)]"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center mb-6">
                  <MapPin className="h-6 w-6 text-[oklch(0.7_0.15_160deg)] mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Head Office</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">
                      123 Rural Development Center, Village Square, District Name, State - 123456, India
                    </p>
                  </div>
                  <div className="flex">
                    <Phone className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">+91 98765 43210</p>
                  </div>
                  <div className="flex">
                    <Mail className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">info@gramseva.org</p>
                  </div>
                  <div className="flex">
                    <Clock className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="mt-6">
                  <iframe
                    title="Office Location"
                    className="w-full h-64 rounded-lg border border-gray-300"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.19151911508096!3d28.613844082429215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1653594168197!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="bg-[oklch(0.95_0.05_160deg)] rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Join Our Team</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Interested in working with us? We're always looking for passionate individuals to join our mission.
                </p>
                {/* <Link
                  to="/careers"
                  className="inline-flex items-center text-[oklch(0.7_0.15_160deg)] font-medium hover:text-[oklch(0.6_0.15_160deg)]"
                >
                  View Career Opportunities
                  <svg
                    className="ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">OUR LOCATIONS</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Regional Offices</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have regional offices across India to better serve rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{office.address}</p>
                  </div>
                  <div className="flex">
                    <Phone className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{office.phone}</p>
                  </div>
                  <div className="flex">
                    <Mail className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{office.email}</p>
                  </div>
                  <div className="flex">
                    <Clock className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{office.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">FREQUENTLY ASKED QUESTIONS</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Common Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to frequently asked questions about contacting us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-700 mb-4">
              Can't find the answer you're looking for? Check our comprehensive FAQ page or contact us directly.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)]"
            >
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our mission to empower rural communities and create sustainable development opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
            >
              Register Your Village
            </Link>
            {/* <Link
              to="/donate"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[oklch(0.65_0.15_160deg)/50]"
            >
              Support Our Work
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
