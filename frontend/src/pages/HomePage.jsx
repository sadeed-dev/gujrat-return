import React from 'react'

import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import FeatureCard from "../components/FeatureCard"
import TestimonialCard from "../components/TestimonialCard"
import StatCard from "../components/StatCard"



import {
  Users,
  Briefcase,
  Building,
  Award,
  MapPin,
  Target,
  Zap,
  ArrowRight,
  Home,
  Landmark,
  Lightbulb,
} from "lucide-react"

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: "Community Building",
      description: "Bringing people together to create stronger, more resilient rural communities.",
    },
    {
      icon: Briefcase,
      title: "Work Opportunities",
      description: "Connecting rural talent with meaningful employment and income opportunities.",
    },
    {
      icon: Building,
      title: "Gram Panchayat Support",
      description: "Strengthening local governance through resources and capacity building.",
    },
    {
      icon: Award,
      title: "Skill Development",
      description: "Providing training and education to enhance employability and entrepreneurship.",
    },
    {
      icon: MapPin,
      title: "Local Resources",
      description: "Mapping and providing access to essential services and resources.",
    },
    {
      icon: Target,
      title: "Sustainable Development",
      description: "Promoting environmentally friendly practices for long-term growth.",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer, Uttar Pradesh",
      content:
        "The LFA program has transformed our village. We now have better access to markets and my income has increased by 40%.",
      image: 'assets/testimonial-image2.jpg',
        loading: "lazy" 
    },
    {
      name: "Lakshmi Devi",
      role: "Gram Panchayat Member",
      content:
        "The support and training provided to our Panchayat has helped us implement development projects more effectively.",
      image: '/assets/testmonials/testimonial-image3.jpg',
              loading: "lazy" 

    },
    {
      name: "Anand Singh",
      role: "Rural Entrepreneur",
      content:
        "Through the Work & Get Paid program, I was able to start my own small business. Now I employ 5 people from my village.",
      image:'/assets/testmonials/testimonial-image2.jpg',
              loading: "lazy" 

    },
  ]

  const stats = [
    {
      value: "500+",
      label: "Villages Covered",
      icon: Home,
    },
    {
      value: "10,000+",
      label: "Jobs Created",
      icon: Briefcase,
    },
    {
      value: "250+",
      label: "Gram Panchayats",
      icon: Landmark,
    },
    {
      value: "50+",
      label: "Innovative Projects",
      icon: Lightbulb,
    },
  ]

  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Programs</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive initiatives designed to address the unique challenges and opportunities in rural areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
            >
              View all our services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Transforming Rural India Through Connectivity
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At RuralConnect, we believe in the potential of rural India. Our mission is to bridge the urban-rural
                divide by providing resources, opportunities, and connections that empower rural communities.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through our various programs, we focus on sustainable development, skill enhancement, and creating
                economic opportunities that help rural residents thrive without leaving their communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  About Our Mission
                </Link>
                <Link
                  to="/work-get-paid"
                  className="inline-flex items-center justify-center px-5 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
                >
                  Work Oppertunity
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img
                  src='/assets/boy1.avif'
                  alt="Rural development project"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-emerald-500 rounded-lg p-6 shadow-lg max-w-xs">
                <p className="text-white font-medium">
                  "Our goal is to create self-sustaining rural ecosystems that thrive on local talent and resources."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Impact</h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-3xl mx-auto">
              Real results that are transforming rural communities across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs Highlight */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Programs</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our key initiatives designed to create lasting impact in rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-emerald-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">LFA Program</h3>
                <p className="text-gray-600 mb-4">
                  Our Local Field Associates program connects rural talent with opportunities while serving their
                  communities.
                </p>
                <Link
                  to="/lfa"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-teal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Work & Get Paid</h3>
                <p className="text-gray-600 mb-4">
                  Creating sustainable employment opportunities that allow rural residents to earn without migrating.
                </p>
                <Link
                  to="/work-get-paid"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cyan-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gram Panchayat Support</h3>
                <p className="text-gray-600 mb-4">
                  Empowering local governance through training, resources, and capacity building initiatives.
                </p>
                <Link
                  to="/gram-panchayat"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from the people whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                image={testimonial.image}
                
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Join our mission to transform rural India. Whether you're looking for opportunities or want to contribute to
            rural development, we have a place for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/work-get-paid"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
            >
              Find Opportunities
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700/50"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Latest Updates</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about our recent activities and developments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/news/news1.jpg' alt="News update" className="w-full h-48 object-cover"
              loading="lazy" />
              <div className="p-6">
                <div className="text-sm text-emerald-600 mb-2">May 15, 2023</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">New Training Center Opens in Bihar</h3>
                <p className="text-gray-600 mb-4">
                  Our newest skill development center will serve 5 districts and train over 1,000 youth annually.
                </p>
                <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700">
                  Read more
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/news/news2.avif' alt="News update" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <div className="text-sm text-emerald-600 mb-2">April 28, 2023</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Partnership with Agricultural University</h3>
                <p className="text-gray-600 mb-4">
                  New collaboration will bring modern farming techniques and resources to 200 villages.
                </p>
                <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700">
                  Read more
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/news/news3.avif' alt="News update" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <div className="text-sm text-emerald-600 mb-2">March 10, 2023</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Literacy Program Reaches Milestone</h3>
                <p className="text-gray-600 mb-4">
                  Our initiative has now trained over 50,000 rural residents in basic digital skills.
                </p>
                <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700">
                  Read more
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
              View all updates <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
