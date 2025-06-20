"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  Laptop,
  GraduationCap,
  Heart,
  Leaf,
  Wallet,
  Home,
  Lightbulb,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import React from 'react'
import digital from '../../public/assets/services/digital.avif'
import education from '../../public/assets/services/education.avif'
import financialInclusion from '../../public/assets/services/financial-inclusion.avif'
import healthcare from '../../public/assets/services/healthcare.avif'
import infrastructure from '../../public/assets/services/infrastructure.jpg'
import agriculture from '../../public/assets/services/agriculture.avif'
import servicesImg from '../../public/assets/services/services.jpg'
import innovativeImg from '../../public/assets/services/innovative.avif'
import testimonial1 from "../../public/assets/testmonials/testimonial-image2.jpg"
import testimonial2 from "../../public/assets/testmonials/testimonial-image3.jpg"

const Services = () => {
  const [activeTab, setActiveTab] = useState("digital")

  const serviceCategories = [
    { id: "digital", name: "Digital Services", icon: Laptop },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "healthcare", name: "Healthcare", icon: Heart },
    { id: "agriculture", name: "Agriculture", icon: Leaf },
    { id: "financial", name: "Financial Inclusion", icon: Wallet },
    { id: "infrastructure", name: "Infrastructure", icon: Home },
  ]

  const serviceDetails = {
    digital: {
      title: "Digital Services",
      description:
        "Our digital services aim to bridge the technological divide and bring the benefits of the digital revolution to rural communities. Through our network of trained facilitators, we provide access to essential online services.",
      image: digital,
      services: [
        "Government Scheme Registration",
        "Digital Banking Assistance",
        "Online Bill Payments",
        "E-commerce Access",
        "Digital Literacy Training",
        "Documentation Services",
      ],
    },
    education: {
      title: "Education Services",
      description:
        "We believe that quality education is the foundation for sustainable development. Our education services focus on improving access to learning resources and enhancing educational outcomes in rural areas.",
      image: education,
      services: [
        "Digital Learning Centers",
        "Supplementary Education Programs",
        "Teacher Training Initiatives",
        "Educational Content Development",
        "Scholarship Programs",
        "Career Guidance Services",
      ],
    },
    healthcare: {
      title: "Healthcare Services",
      description:
        "Access to quality healthcare is a significant challenge in rural areas. Our healthcare services leverage technology and community resources to improve health outcomes in remote communities.",
      image: healthcare,
      services: [
        "Telemedicine Facilitation",
        "Health Awareness Campaigns",
        "Mobile Health Clinics",
        "Maternal & Child Health Programs",
        "Health Insurance Assistance",
        "Medical Camp Organization",
      ],
    },
    agriculture: {
      title: "Agriculture Services",
      description:
        "Agriculture is the backbone of rural economies. Our agricultural services aim to enhance productivity, sustainability, and market access for farmers through technology and training.",
        image: agriculture,
      services: [
        "Sustainable Farming Practices",
        "Market Linkage Facilitation",
        "Agricultural Technology Training",
        "Crop Advisory Services",
        "Weather Information Services",
        "Organic Certification Support",
      ],
    },
    financial: {
      title: "Financial Inclusion",
      description:
        "Financial inclusion is essential for economic empowerment. Our financial services focus on bringing banking, insurance, and other financial services to underserved rural populations.",
      image: financialInclusion,
      services: [
        "Bank Account Opening Assistance",
        "Digital Payment Facilitation",
        "Microfinance Linkages",
        "Financial Literacy Programs",
        "Insurance Enrollment Support",
        "Pension Scheme Registration",
      ],
    },
    infrastructure: {
      title: "Infrastructure Development",
      description:
        "Quality infrastructure is crucial for rural development. We support communities in planning, implementing, and maintaining sustainable infrastructure projects.",
      image: infrastructure,
      services: [
        "Water Management Solutions",
        "Renewable Energy Projects",
        "Community Building Construction",
        "Road Development Facilitation",
        "Sanitation Infrastructure",
        "Digital Infrastructure Setup",
      ],
    },
  }

  const featuredServices = [
    {
      icon: Users,
      title: "Bank Loan Recovery & Delivery",
      description: "Comprehensive training programs to build essential digital skills in rural populations.",
      category: "Bank",
    },
    {
      icon: Heart,
      title: "Startup Consultancy & MSME Services",
      description: "Connecting rural patients with qualified doctors through video consultations.",
      category: "Startup",
    },
    {
      icon: GraduationCap,
      title: "Channel009 News Reporting",
      description: "Community centers equipped with digital learning resources for students.",
      category: "Channel009",
    },
    {
      icon: Wallet,
      title: "Digital Gram Panchayat Website Creation",
      description: "Facilitating access to banking, insurance, and other financial services.",
      category: "Digital",
    },
  ]

  const testimonials = [
    {
      name: "Ramesh Kumar",
      village: "Bhimtal, Uttarakhand",
      image: testimonial2   ,
      quote:
        "The digital literacy training has transformed my life. I now help my entire village access government schemes online, saving them time and money.",
    },
    {
      name: "Lakshmi Devi",
      village: "Chitrakoot, Madhya Pradesh",
      image: testimonial1,
      quote:
        "The telemedicine service has been a blessing for our remote village. My mother received specialist consultation without traveling 50 km to the nearest hospital.",
    },
    {
      name: "Suresh Patel",
      village: "Anand, Gujarat",
      image: testimonial2 ,
      quote:
        "The agricultural advisory services helped me adopt modern farming techniques. My crop yield has increased by 30% while using less water and fertilizer.",
    },
  ]

  const innovations = [
    {
      title: "Mobile Service Units",
      description: "Specially equipped vehicles that bring essential services to remote villages on a scheduled basis.",
    },
    {
      title: "Offline Digital Resources",
      description:
        "Digital content and applications that work without internet connectivity for areas with limited connectivity.",
    },
    {
      title: "Community Service Hubs",
      description:
        "Integrated centers that offer multiple services under one roof, managed by trained community members.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive solutions designed to address the unique needs of rural communities and drive sustainable
            development.
          </p>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">WHAT WE OFFER</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our range of services designed to empower rural communities.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                  activeTab === category.id
                    ? "bg-[oklch(0.7_0.15_160deg)] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(category.id)}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden  "  >
            {Object.keys(serviceDetails).map((key) => (
              <div key={key} className={activeTab === key ? "block" : "hidden"} >
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className="h-64 md:h-auto">
                    <img
                      src={serviceDetails[key].image || "/placeholder.svg"}
                      alt={serviceDetails[key].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8" style={{cursor:'pointer'}}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{serviceDetails[key].title}</h3>
                    <p className="text-gray-600 mb-6">{serviceDetails[key].description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {serviceDetails[key].services.map((service, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/services/${key}`}
                        className="inline-flex items-center text-[oklch(0.7_0.15_160deg)] font-medium hover:text-[oklch(0.6_0.15_160deg)]"
                      >
                        {/* Learn More <ArrowRight className="ml-2 h-4 w-4" /> */}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">FEATURED SERVICES</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Most Popular Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These services have created significant impact in rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <div key={index} className="bg-[oklch(0.7_0.15_160deg)] text-white rounded-lg shadow-md p-6 text-center">
                <service.icon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-[oklch(0.5_0.15_160deg)]">
                  {service.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <img
                src={servicesImg}
                alt="Our Service Process"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">OUR APPROACH</h6>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Deliver Services</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our service delivery approach is designed to ensure accessibility, quality, and sustainability. We work
                closely with communities to understand their needs and customize our solutions accordingly.
              </p>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[oklch(0.7_0.15_160deg)] text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg font-bold text-gray-900">Community Assessment</h5>
                    <p className="text-gray-600">
                      We conduct thorough assessments to understand the specific needs and challenges of each community.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[oklch(0.7_0.15_160deg)] text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg font-bold text-gray-900">Solution Design</h5>
                    <p className="text-gray-600">
                      Based on the assessment, we design customized service solutions that address specific community
                      needs.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[oklch(0.7_0.15_160deg)] text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg font-bold text-gray-900">Local Facilitator Training</h5>
                    <p className="text-gray-600">
                      We identify and train local facilitators who deliver services within their communities.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[oklch(0.7_0.15_160deg)] text-white font-bold">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg font-bold text-gray-900">Continuous Support</h5>
                    <p className="text-gray-600">
                      We provide ongoing support, monitoring, and improvement to ensure service quality and
                      sustainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">TESTIMONIALS</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Beneficiaries Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from individuals and communities who have benefited from our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-gray-600 text-sm">{testimonial.village}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">INNOVATION</h6>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Innovative Service Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                We constantly innovate to develop new service models that address emerging challenges in rural
                communities. Our innovation approach combines technology, community participation, and sustainable
                practices.
              </p>
              <div className="space-y-6">
                {innovations.map((innovation, index) => (
                  <div key={index} className="flex">
                    <Lightbulb className="h-6 w-6 text-[oklch(0.7_0.15_160deg)] mr-3 mt-1 flex-shrink-2 flex-column colo" />
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">{innovation.title}</h5>
                      <p className="text-gray-600">{innovation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  to="/innovations"
                  className="inline-flex items-center justify-center px-5 py-3 border  border-transparent  font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)] mb-10"
                >
                  Explore Innovations
                </Link>
              </div>
            </div>
            <div className="mb-10 lg:mb-0 order-1 lg:order-2">
              <img
                src={innovativeImg}
                alt="Innovation in Services"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Our Services?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Whether you're a community seeking services or an organization looking to partner with us, we're here to
            help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
            >
              Request Services
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[oklch(0.65_0.15_160deg)/50]"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
