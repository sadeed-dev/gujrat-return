import { Link } from "react-router-dom"
import { CheckCircle, Briefcase, Users, Award, Target, Clock, ArrowRight } from "lucide-react"
import React from 'react'

const WorkGetPaid = () => {   
  const opportunities = [
    {
      title: "Digital Services Facilitator",
      description: "Help community members access digital services and complete online applications.",
      requirements: "Basic digital literacy, good communication skills",
      earnings: "₹8,000 - ₹12,000 per month",
    },
    {
      title: "Community Surveyor",
      description: "Collect data for development projects and impact assessment.",
      requirements: "Attention to detail, ability to use mobile apps",
      earnings: "₹300 - ₹500 per survey",
    },
    {
      title: "Agricultural Extension Worker",
      description: "Connect farmers with modern techniques, markets, and resources.",
      requirements: "Knowledge of local agriculture, good network",
      earnings: "₹10,000 - ₹15,000 per month",
    },
    {
      title: "Skill Trainer",
      description: "Conduct training sessions on various skills in your area of expertise.",
      requirements: "Expertise in specific skill area, teaching ability",
      earnings: "₹500 - ₹1,000 per session",
    },
  ]

  const benefits = [
    "Work in your own community",
    "Flexible hours",
    "Regular income",
    "Skill development",
    "Career growth opportunities",
    "Contribute to rural development",
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between flex-col">
            {/* <div className="md:w-1/2 md:items-center"> */}
              <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">Work & Get Paid</h1>
              <p className="text-xl  text-center text-emerald-100 mb-8">
                Discover meaningful employment opportunities in your rural community <br></br>that 
                allow you to earn while making
                a difference. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
                >
                  Find Opportunities
                </Link>
                <a
                  href="#opportunities"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700/50"
                >
                  View Job Types
                </a>
              </div>
            </div>
            {/* <div className="mt-10 md:mt-0 md:w-1/2">
              <img src="/images/work-hero.jpg" alt="Rural work opportunities" className="rounded-lg shadow-xl" />
            </div> */}
          {/* </div> */}
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Work & Get Paid program creates sustainable employment opportunities in rural areas, allowing
              residents to earn a living without migrating to cities.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Briefcase className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Opportunities</h3>
              <p className="text-gray-600">
                We create and connect rural residents with work opportunities right in their communities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skill Matching</h3>
              <p className="text-gray-600">
                We match individuals with opportunities that align with their skills, interests, and availability.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Training & Support</h3>
              <p className="text-gray-600">
                We provide necessary training and ongoing support to help workers succeed in their roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the various types of work opportunities available through our program.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Requirements:</h4>
                    <p className="text-gray-600">{opportunity.requirements}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Potential Earnings:</h4>
                    <p className="text-emerald-600 font-medium">{opportunity.earnings}</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Apply for this role <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              These are just a few examples. New opportunities are added regularly based on community needs and partner
              requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              View All Current Openings
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple process connects you with suitable work opportunities.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-emerald-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Register</h3>
              <p className="text-gray-600">Sign up through our website, mobile app, or with a local field associate.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-emerald-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Assessment</h3>
              <p className="text-gray-600">Complete a simple assessment to identify your skills and interests.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-emerald-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Match & Train</h3>
              <p className="text-gray-600">Get matched with suitable opportunities and receive necessary training.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-emerald-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Work & Earn</h3>
              <p className="text-gray-600">Start working and receive regular payments for your services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits of Our Program</h2>
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
                  Register for Opportunities
                </Link>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img src='/assets/work&GetPaid/benefit-programs.avif' alt="Program benefits" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from people who have transformed their lives through our program.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/work&GetPaid/success-story.avif' alt="Success story" className="w-full h-48 object-cover"  loading="lazy"/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ramesh Kumar</h3>
                <p className="text-emerald-600 font-medium mb-4">Digital Services Facilitator</p>
                <p className="text-gray-600 mb-4">
                  "I was considering moving to the city for work when I learned about this program. Now I earn ₹12,000
                  monthly helping my community access digital services."
                </p>
                <Link to="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                  Read full story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/work&GetPaid/success-story2.avif' alt="Success story" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Priya Sharma</h3>
                <p className="text-emerald-600 font-medium mb-4">Community Surveyor</p>
                <p className="text-gray-600 mb-4">
                  "As a homemaker, I needed flexible work. The surveyor role lets me earn while managing my household
                  responsibilities. I've completed 40 surveys in 3 months."
                </p>
                <Link to="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                  Read full story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src='/assets/work&GetPaid/success-story3.avif' alt="Success story" className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vikram Singh</h3>
                <p className="text-emerald-600 font-medium mb-4">Agricultural Extension Worker</p>
                <p className="text-gray-600 mb-4">
                  "I've always been passionate about farming. Now I help other farmers adopt modern techniques while
                  earning a steady income for my family."
                </p>
                <Link to="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                  Read full story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Organizations & Employers</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Partner with us to access a trained rural workforce for your projects and initiatives.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Access Rural Markets</h3>
              <p className="text-gray-600">
                Leverage our network to reach untapped rural markets and customers through local representatives.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Skilled Workforce</h3>
              <p className="text-gray-600">
                Access a pre-screened, trained workforce for your rural initiatives and projects.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-emerald-100 rounded-full p-3 inline-block mb-4">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Engagement</h3>
              <p className="text-gray-600">
                Choose from various engagement models - project-based, part-time, or full-time workers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Common questions about our Work & Get Paid program.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is there a fee to register?</h3>
              <p className="text-gray-600">
                No, registration is completely free. We never charge workers for connecting them with opportunities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How often will I get paid?</h3>
              <p className="text-gray-600">
                Payment schedules vary by role. Most positions offer weekly or monthly payments directly to your bank
                account.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do I need to have a smartphone?</h3>
              <p className="text-gray-600">
                While having a smartphone is helpful, it's not required for all roles. We can provide necessary
                equipment for specific positions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I work part-time?</h3>
              <p className="text-gray-600">
                Yes, many of our opportunities offer flexible hours, making them suitable for part-time work alongside
                other responsibilities.
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
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Join thousands of rural residents who have found meaningful work opportunities through our program.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
            >
              Register Now
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

export default WorkGetPaid
