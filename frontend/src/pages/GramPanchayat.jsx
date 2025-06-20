import { Link } from "react-router-dom"
import { Building, Users, BarChart3, FileText, CheckCircle, Award } from 'lucide-react'
import React from "react"
import img1 from '../../public/assets/local-goverance.avif'
import img2 from '../../public/assets/digital-panchayat2.avif'

const GramPanchayat = () => {
  const keyPrograms = [
    {
      icon: Building,
      title: "Digital Panchayat",
      description:
        "Digitizing panchayat operations through customized software, hardware, and training for efficient administration.",
    },
    {
      icon: Users,
      title: "Capacity Building",
      description:
        "Comprehensive training programs for elected representatives and panchayat officials on governance and administration.",
    },
    {
      icon: BarChart3,
      title: "Resource Planning",
      description:
        "Supporting panchayats in effective planning, budgeting, and resource allocation for village development.",
    },
    {
      icon: FileText,
      title: "Documentation Support",
      description:
        "Assistance in maintaining proper records, documentation, and compliance with government regulations.",
    },
  ]

  const impactStats = [
    { value: "100+", label: "Panchayats Digitized" },
    { value: "500+", label: "Officials Trained" },
    { value: "40%", label: "Increase in Service Efficiency" },
    { value: "30%", label: "Reduction in Paperwork" },
  ]

  const successStories = [
    {
      name: "Rampur Gram Panchayat",
      location: "Uttar Pradesh",
      achievement:
        "Implemented complete digital transformation, reducing service delivery time by 60% and increasing revenue collection by 45%.",
    },
    {
      name: "Surajpur Gram Panchayat",
      location: "Rajasthan",
      achievement:
        "Developed innovative resource management system, optimizing water usage and creating sustainable agricultural practices.",
    },
    {
      name: "Chandpur Gram Panchayat",
      location: "Bihar",
      achievement:
        "Established transparent governance model with citizen participation, resolving 95% of community grievances within 7 days.",
    },
  ]

  const trainingModules = [
    "Panchayat Administration",
    "Financial Management",
    "Digital Literacy",
    "Project Planning",
    "Conflict Resolution",
    "Community Engagement",
  ]

  const resources = [
    {
      title: "Digital Panchayat Handbook",
      description: "Comprehensive guide to implementing digital solutions in panchayat administration.",
      type: "PDF Guide",
    },
    {
      title: "Financial Management Toolkit",
      description: "Tools and templates for effective financial planning and management.",
      type: "Toolkit",
    },
    {
      title: "Governance Best Practices",
      description: "Collection of best practices from model panchayats across India.",
      type: "Case Studies",
    },
    {
      title: "Scheme Implementation Guide",
      description: "Step-by-step guide to implementing government schemes effectively.",
      type: "Manual",
    },
    {
      title: "Community Engagement Strategies",
      description: "Strategies for involving community members in panchayat activities.",
      type: "Strategy Guide",
    },
    {
      title: "Panchayat Development Plan Template",
      description: "Template for creating comprehensive village development plans.",
      type: "Template",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-1 md:gap-8 items-center text-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Gram Panchayat Initiatives</h1>
              <p className="text-xl mb-6">
                Strengthening local governance through technology, training, and support for village panchayats.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
              >
                Explore Programs
              </Link>
            </div>
           
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <img
                src={img1}
                alt="About Gram Panchayat"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">ABOUT THE INITIATIVE</h6>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Empowering Local Governance</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Gram Panchayat initiative aims to strengthen the foundation of rural democracy by empowering village
                panchayats with technology, training, and resources. We believe that effective local governance is key
                to sustainable rural development.
              </p>
              <p className="text-lg text-gray-600">
                Through this program, we work directly with elected panchayat representatives and officials to enhance
                their capacity, improve service delivery, and promote transparent, inclusive governance at the
                grassroots level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">OUR PROGRAMS</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Key Initiatives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to strengthen village panchayats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:-translate-y-2"
              >
                <program.icon className="h-12 w-12 text-[oklch(0.7_0.15_160deg)] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Panchayat Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">FLAGSHIP PROGRAM</h6>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Digital Panchayat</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Digital Panchayat program is transforming village governance through technology integration. We
                provide customized digital solutions that streamline administrative processes, improve service delivery,
                and enhance transparency.
              </p>
              <div className="mb-6">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Key Features:</h5>
                <ul className="space-y-3">
                  {[
                    "Customized Panchayat Management Software",
                    "Digital Record Keeping and Documentation",
                    "Online Service Delivery Platform",
                    "Financial Management System",
                    "Citizen Grievance Redressal Portal",
                    "Technical Support and Maintenance",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)] mb-3"
              >
                Learn More
              </Link>
            </div>
            <div className="mb-10 lg:mb-0 order-1 lg:order-2">
              <img
                src={img2}
                alt="Digital Panchayat"
                className="rounded-lg shadow-xl w-full h-auto object-cover flex-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">OUR IMPACT</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Transforming Village Governance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our initiatives have created significant positive impact on local governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-[oklch(0.7_0.15_160deg)] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">SUCCESS STORIES</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Model Panchayats</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Showcasing panchayats that have successfully transformed through our initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-[oklch(0.95_0.05_160deg)] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="h-16 w-16 text-[oklch(0.7_0.15_160deg)]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-[oklch(0.7_0.15_160deg)] mb-4">{story.location}</p>
                  <p className="text-gray-600">{story.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <img
                src="/images/panchayat-training.jpg"
                alt="Training Programs"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">CAPACITY BUILDING</h6>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Training Programs</h2>
              <p className="text-lg text-gray-600 mb-6">
                We offer comprehensive training programs designed specifically for panchayat representatives and
                officials to enhance their governance and administrative capabilities.
              </p>
              <div className="mb-6">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Training Modules:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainingModules.map((module, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] mr-2 flex-shrink-0" />
                        <h6 className="font-bold text-gray-900">{module}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)]"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h6 className="text-[oklch(0.7_0.15_160deg)] font-semibold mb-2">RESOURCES</h6>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Panchayat Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access tools, guides, and resources to strengthen your panchayat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[oklch(0.95_0.05_160deg)] text-[oklch(0.5_0.15_160deg)]">
                    {resource.type}
                    
                  </span>
                  {/* <button className="text-[oklch(0.7_0.15_160deg)] hover:text-[oklch(0.6_0.15_160deg)] font-medium">Download</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Strengthen Your Panchayat</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our network of progressive panchayats and access resources, training, and support to transform your
            village governance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
            >
              Register Your Panchayat
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[oklch(0.65_0.15_160deg)/50]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GramPanchayat
