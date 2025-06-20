"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import React from 'react'

const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategory, setOpenCategory] = useState("General")
  const [openQuestions, setOpenQuestions] = useState({})

  const faqCategories = [
    {
      category: "General",
      questions: [
        {
          question: "What is GramSeva?",
          answer:
            "GramSeva is a comprehensive rural development initiative that aims to empower rural communities through technology, education, and sustainable development programs. We work directly with villages to address their unique challenges and create opportunities for growth and prosperity.",
        },
        {
          question: "Which areas does GramSeva operate in?",
          answer:
            "GramSeva currently operates in over 500 villages across multiple states in India, including Uttar Pradesh, Rajasthan, Bihar, Madhya Pradesh, Gujarat, and Uttarakhand. We are continuously expanding our reach to more rural communities.",
        },
        {
          question: "How can my village benefit from GramSeva's programs?",
          answer:
            "Villages can benefit from our programs by registering through our website or contacting our regional offices. After registration, our team conducts a needs assessment and works with community leaders to implement relevant programs based on the specific requirements of your village.",
        },
        {
          question: "Are GramSeva's services free?",
          answer:
            "Many of our basic services are provided free of charge, especially those related to education, digital literacy, and access to government schemes. Some specialized services may involve nominal fees to ensure sustainability and quality. We also work on a cross-subsidy model where revenue-generating services help support free services.",
        },
      ],
    },
    {
      category: "LFA Program",
      questions: [
        {
          question: "What is the Local Facilitator Approach (LFA)?",
          answer:
            "The Local Facilitator Approach (LFA) is our flagship program that identifies, trains, and empowers individuals from rural communities to become digital ambassadors. These facilitators bridge the gap between technology and rural populations, ensuring that digital services are accessible to all.",
        },
        {
          question: "Who can become an LFA facilitator?",
          answer:
            "Any individual with basic literacy (10th grade education), good standing in the community, and a passion for community development can apply to become an LFA facilitator. We particularly encourage women and youth to apply.",
        },
        {
          question: "What training do LFA facilitators receive?",
          answer:
            "Facilitators undergo a comprehensive 2-week training program covering digital literacy, service delivery, customer management, financial literacy, and community engagement techniques. After the initial training, they receive regular refresher courses and updates.",
        },
        {
          question: "How do LFA facilitators earn income?",
          answer:
            "Facilitators earn through a combination of service fees, commissions on transactions, and stipends for government service delivery. Many facilitators earn between ₹8,000-₹15,000 monthly, depending on their service volume and community size.",
        },
      ],
    },
    {
      category: "Work & Get Paid",
      questions: [
        {
          question: "What is the Work & Get Paid program?",
          answer:
            "Work & Get Paid is our innovative employment program designed to address the challenges of rural unemployment, underemployment, and wage exploitation. We connect skilled and unskilled rural workers with legitimate employment opportunities while ensuring fair compensation.",
        },
        {
          question: "How does the payment protection system work?",
          answer:
            "Our payment protection system requires employers to deposit the agreed payment amount in an escrow account before work begins. Once the work is completed and verified, the payment is released to the worker, ensuring they always receive their fair compensation.",
        },
        {
          question: "What types of jobs are available through this program?",
          answer:
            "The program offers various job categories including agricultural work, construction, handicrafts, domestic services, skilled trades, and digital work. The availability of specific jobs depends on the region and current demand.",
        },
        {
          question: "How can I register as a worker or employer?",
          answer:
            "Both workers and employers can register through our website, mobile app, or by visiting any of our local centers. Registration requires basic identification documents and, for workers, information about skills and experience.",
        },
      ],
    },
    {
      category: "Gram Panchayat Initiatives",
      questions: [
        {
          question: "What support does GramSeva provide to Gram Panchayats?",
          answer:
            "We provide comprehensive support to Gram Panchayats through our Digital Panchayat program, capacity building training for panchayat representatives, resource planning assistance, and documentation support. Our aim is to strengthen local governance systems.",
        },
        {
          question: "What is the Digital Panchayat program?",
          answer:
            "The Digital Panchayat program is our initiative to digitize panchayat operations through customized software, hardware, and training. It includes digital record keeping, online service delivery, financial management systems, and citizen grievance redressal portals.",
        },
        {
          question: "How can our Panchayat join your programs?",
          answer:
            "Panchayats can join our programs by submitting an application through our website or contacting our regional offices. After initial assessment, we develop a customized implementation plan based on the specific needs and readiness of your panchayat.",
        },
        {
          question: "Is there any cost for Panchayats to implement your solutions?",
          answer:
            "Many of our basic services and training programs are provided at minimal or no cost to eligible panchayats. For more comprehensive digital solutions, we work on a cost-sharing model with various government schemes and CSR initiatives to minimize the financial burden on panchayats.",
        },
      ],
    },
    {
      category: "Services",
      questions: [
        {
          question: "What services does GramSeva offer?",
          answer:
            "We offer a wide range of services across multiple categories including digital services, education, healthcare, agriculture, financial inclusion, and infrastructure development. Each service category includes multiple specific services designed to address rural needs.",
        },
        {
          question: "How are services delivered in remote villages?",
          answer:
            "Services are delivered through a combination of local facilitators, mobile service units, community service hubs, and digital platforms. For very remote locations, we organize regular service camps and use offline digital resources that don't require constant internet connectivity.",
        },
        {
          question: "How do you ensure service quality?",
          answer:
            "We maintain service quality through comprehensive training of service providers, regular monitoring and evaluation, feedback mechanisms, and continuous improvement processes. Our local teams conduct regular quality checks and address any issues promptly.",
        },
        {
          question: "Can individuals request specific services for their village?",
          answer:
            "Yes, individuals can request specific services for their village through our website, mobile app, or by contacting our local representatives. We assess each request and work to implement services based on community needs and available resources.",
        },
      ],
    },
  ]

  const additionalResources = [
    {
      title: "Program Brochures",
      description: "Detailed information about our various programs and initiatives.",
      buttonText: "Download Brochures",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides on how to access and use our services.",
      buttonText: "Watch Videos",
    },
    {
      title: "Success Stories",
      description: "Real-life stories of individuals and communities transformed by our programs.",
      buttonText: "Read Stories",
    },
    {
      title: "Research Reports",
      description: "In-depth analysis and impact assessment of our rural development initiatives.",
      buttonText: "View Reports",
    },
  ]

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenQuestions({
      ...openQuestions,
      [key]: !openQuestions[key],
    })
  }

  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Find answers to common questions about our programs, services, and initiatives.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
className="w-full px-5 py-3 rounded-full text-gray-900 border border-[oklch(0.7_0.15_160deg)] focus:outline-none focus:ring-3 focus:ring-[oklch(0.7_0.15_160deg)]"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 cursor-pointer">
          {filteredFAQs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8   ">
              {filteredFAQs.map(
                (category, categoryIndex) =>
                  category.questions.length > 0 && (
                    <div key={categoryIndex} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                      <button
                        className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                        onClick={() => toggleCategory(category.category)}
                      >
                        <h3 className="text-xl font-bold text-[oklch(0.7_0.15_160deg)]">
                          {category.category} Questions
                        </h3>
                        {openCategory === category.category ? (
                          <ChevronUp className="h-5 w-5 text-[oklch(0.7_0.15_160deg)]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[oklch(0.7_0.15_160deg)]" />
                        )}
                      </button>
                      {openCategory === category.category && (
                        <div className="p-6">
                          <div className="space-y-4 " >
                            {category.questions.map((faq, questionIndex) => (
                              <div
                                key={questionIndex}
                                className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                              >
                                <button
                                  className="w-full text-left flex justify-between items-center py-2 cursor-pointer"
                                  onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                >
                                  <h4 className="text-lg font-medium text-gray-900">{faq.question}</h4>
                                  {openQuestions[`${categoryIndex}-${questionIndex}`] ? (
                                    <ChevronUp className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] flex-shrink-0 cursor-pointer"  />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-[oklch(0.7_0.15_160deg)] flex-shrink-0 cursor-pointer"  />
                                  )}
                                </button>
                                {openQuestions[`${categoryIndex}-${questionIndex}`] && (
                                  <div className="mt-2 text-gray-600">
                                    <p>{faq.answer}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                We couldn't find any questions matching your search. Please try different keywords or browse all
                categories.
              </p>
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)]"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Additional Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore these resources to learn more about our programs and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-[oklch(0.7_0.15_160deg)] rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)] font-medium">
                  {resource.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              If you couldn't find the answer to your question, please feel free to contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.65_0.15_160deg)]"
              >
                Contact Support
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-[oklch(0.7_0.15_160deg)] text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
              >
                Submit a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.7_0.15_160deg)] to-[oklch(0.8_0.15_170deg)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our mission to empower rural communities and create sustainable development opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[oklch(0.7_0.15_160deg)] bg-white hover:bg-[oklch(0.98_0.02_160deg)]"
            >
              Register Your Village
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[oklch(0.65_0.15_160deg)/50]"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faqs
