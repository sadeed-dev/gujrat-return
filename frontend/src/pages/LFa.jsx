import { Link } from "react-router-dom"
import { CheckCircle, Users, Award, Target, MapPin, Briefcase, ArrowRight } from "lucide-react"
import React from 'react'
import { useState } from "react"
import LfaApplicationForm from "./form/LfaApplicationForm"
import { useRef } from "react"

const LFa = () => {
    const formRef = useRef(null)

  const benefits = [
    "Earn while serving your community",
    "Flexible working hours",
    "Regular training and skill development",
    "Career growth opportunities",
    "Be part of a nationwide network",
    "Access to digital tools and resources",
  ]

  const requirements = [
    "Minimum 10+2 education",
    "Good communication skills",
    "Basic digital literacy",
    "Resident of the local community",
    "Commitment to rural development",
    "Willingness to learn and grow",
  ]

  const testimonials = [
    {
      name: "Sunita Devi",
      location: "Jharkhand",
      quote:
        "Becoming an LFA has changed my life. I now earn a steady income while helping my village access essential services.",
      image: '/assets/testmonials/testimonial-image2.jpg',
    },
    {
      name: "Mohan Singh",
      location: "Rajasthan",
      quote:
        "The training I received as an LFA has given me skills I never thought I would have. I'm now a digital expert in my community.",
      image: '/assets/testmonials/testimonial-image3.jpg',
    },
  ]
  const [showForm, setShowForm] = useState(false)



  const handleApplyNow = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-20">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:text-center flex items-center justify-center">
  <div className="md:w-.5/2 text-center md:text-c enter">
    <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">
      Local Field Associate (LFA) Program
    </h1>
    <p className="text-xl text-emerald-100 mb-8">
      Become a change  agent in your community while building a rewarding career.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-center ">
      <Link
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
                      onClick={handleApplyNow}
>
        Apply Now
      </Link>
      <a
        href="#learn-more"
        className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700/50"
      >
        Learn More
      </a>
    </div>
  </div>
</div>


      </section>

      <LfaApplicationForm ref={formRef} isEditForm = {false} />

      {/* Program Overview */}
      <section id="learn-more" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Local Field Associate (LFA) program connects talented individuals from rural areas with opportunities
              to serve their communities while earning a sustainable income.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Connection</h3>
              <p className="text-gray-600">
                LFAs serve as vital links between their communities and essential services, resources, and
                opportunities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skill Development</h3>
              <p className="text-gray-600">
                We provide comprehensive training in digital literacy, communication, leadership, and specific program
                areas.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Income Generation</h3>
              <p className="text-gray-600">
                LFAs earn through various activities including service delivery, data collection, and community
                mobilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our structured program ensures LFAs are well-equipped to succeed in their roles.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white rounded-lg shadow-md p-6 md:ml-auto md:mr-0 max-w-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">1. Application & Selection</h3>
                      <p className="text-gray-600">
                        Candidates apply through our online portal or local offices. Selection is based on basic
                        qualifications and commitment to community service.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0"></div>
                </div>
              </div>

              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <div className="bg-white rounded-lg shadow-md p-6 md:mr-auto md:ml-0 max-w-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">2. Training & Onboarding</h3>
                      <p className="text-gray-600">
                        Selected candidates undergo a comprehensive 2-week training program covering digital skills,
                        communication, and program-specific knowledge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white rounded-lg shadow-md p-6 md:ml-auto md:mr-0 max-w-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">3. Field Deployment</h3>
                      <p className="text-gray-600">
                        LFAs are assigned to their local communities with specific responsibilities and targets. Each
                        LFA is equipped with a tablet and necessary resources.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0"></div>
                </div>
              </div>

              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    <div className="bg-white rounded-lg shadow-md p-6 md:mr-auto md:ml-0 max-w-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">4. Ongoing Support</h3>
                      <p className="text-gray-600">
                        Regular mentoring, refresher training, and performance reviews ensure LFAs continue to grow and
                        succeed in their roles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white rounded-lg shadow-md p-6 md:ml-auto md:mr-0 max-w-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">5. Career Advancement</h3>
                      <p className="text-gray-600">
                        High-performing LFAs have opportunities to advance to senior roles, specialized positions, or
                        join our core team.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-white font-bold">5</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Requirements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits of Becoming an LFA</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Apply to Become an LFA
                </Link>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Requirements</h2>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 bg-emerald-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Selection Process</h3>
                <p className="text-gray-600 mb-4">
                  Our selection process includes an application review, basic aptitude assessment, and a personal
                  interview. We select candidates who demonstrate potential and commitment to their communities.
                </p>
                <p className="text-gray-600">
                  Applications are accepted year-round, with training batches starting quarterly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our LFAs about how the program has transformed their lives and communities.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-emerald-600">LFA, {testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Areas of Work */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">LFA Areas of Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our LFAs work across various domains to address the diverse needs of rural communities.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-emerald-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Access</h3>
                <p className="text-gray-600 mb-4">
                  Helping community members access digital services, government schemes, and online resources.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-teal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Livelihood Support</h3>
                <p className="text-gray-600 mb-4">
                  Connecting farmers and artisans with markets, training, and resources to improve income.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cyan-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Mobilization</h3>
                <p className="text-gray-600 mb-4">
                  Organizing community events, awareness campaigns, and collective action initiatives.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-emerald-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Education Support</h3>
                <p className="text-gray-600 mb-4">
                  Facilitating access to educational resources, scholarships, and digital learning opportunities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-teal-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Collection</h3>
                <p className="text-gray-600 mb-4">
                  Gathering community data to inform development initiatives and measure impact.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-cyan-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Governance</h3>
                <p className="text-gray-600 mb-4">
                  Supporting Gram Panchayats and local institutions in planning and implementing development projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Common questions about the LFA program.</p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How much can an LFA earn?</h3>
              <p className="text-gray-600">
                LFA earnings vary based on activities and performance. On average, LFAs earn between ₹8,000-₹15,000 per
                month, with top performers earning more.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is this a full-time position?</h3>
              <p className="text-gray-600">
                The LFA role offers flexibility. Most LFAs work 20-30 hours per week, allowing them to balance other
                responsibilities or studies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do I need to have my own computer?</h3>
              <p className="text-gray-600">
                No, we provide all necessary equipment including a tablet with internet connectivity for your work.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How long is the LFA contract?</h3>
              <p className="text-gray-600">
                Initial contracts are for one year, with the opportunity for renewal based on performance and program
                continuation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can women apply to be LFAs?</h3>
              <p className="text-gray-600">
                We strongly encourage women to apply. Currently, over 40% of our LFAs are women, and we aim to achieve
                gender parity.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is there an age limit for LFAs?</h3>
              <p className="text-gray-600">
                Applicants should be at least 18 years old. There is no upper age limit, and we value the experience
                that older community members bring.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/faq" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
              View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to Become an LFA?</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Join our network of change-makers and make a difference in your community while building a rewarding career.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700/50"
            >
              Contact for More Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LFa
