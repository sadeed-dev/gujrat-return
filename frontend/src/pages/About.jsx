import { Link } from "react-router-dom"
import { Users, Target, Award, Heart, Clock, Globe } from "lucide-react"
import React from 'react'



const About = () => {
  const partners = ['/assets/aboutus/partner1.avif', '/assets/aboutus/partner2.avif', '/assets/aboutus/partner3.avif', '/assets/aboutus/partner4.avif'];


  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in the power of community-led development and prioritize local needs and voices.",
    },
    {
      icon: Target,
      title: "Sustainable Impact",
      description: "Our solutions are designed for long-term impact, not just quick fixes.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in all our programs and services.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach our work with empathy and understanding of rural challenges.",
    },
    {
      icon: Clock,
      title: "Accountability",
      description: "We hold ourselves accountable to the communities we serve and our partners.",
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We embrace innovative approaches to solve complex rural development challenges.",
    },
  ]

  const team = [
    {
      name: "Rajiv Sharma",
      role: "Founder & CEO",
      bio: "With 20+ years in rural development, Rajiv founded RuralConnect to bridge the urban-rural divide.",
      image: '/assets/testmonials/testimonial-image2.jpg',
    },
    {
      name: "Priya Patel",
      role: "Director of Programs",
      bio: "Priya oversees all our programs and ensures they deliver meaningful impact to rural communities.",
      image: '/assets/testmonials/testimonial-image3.jpg',
    },
    {
      name: "Amit Kumar",
      role: "Head of Technology",
      bio: "Amit leads our technology initiatives to bring digital solutions to rural challenges.",
      image: "/images/team-3.jpg",
    },
    {
      name: "Meera Singh",
      role: "Community Relations",
      bio: "Meera works directly with village leaders to understand needs and implement solutions.",
      image: "/images/team-4.jpg",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-6">About RuralConnect</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Gujarat Netowork is an initiative to empower rural Gujarat by connecting villages to a digital economy. Our LFAs work on-ground to gather data, share news, and distribute services locally. We pay weekly for valid contributions
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                RuralConnect was founded in 2015 with a simple yet powerful vision: to bridge the gap between rural
                India and the opportunities of the modern world.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our founder, Rajiv Sharma, grew up in a small village and witnessed firsthand the challenges faced by
                rural communities - from limited access to education and healthcare to lack of economic opportunities.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                What began as a small initiative in 5 villages has now grown into a comprehensive rural development
                organization serving hundreds of communities across multiple states.
              </p>
              <p className="text-lg text-gray-600">
                Today, RuralConnect works at the intersection of technology, community development, and sustainable
                practices to create lasting positive change in rural India.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img src='/assets/aboutus/about1.jpg' alt="Our journey" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To empower rural communities by providing access to resources, opportunities, and services that enable
                sustainable development and improved quality of life.
              </p>
              <p className="text-gray-600">
                We work to bridge the urban-rural divide through innovative programs that address the unique challenges
                faced by rural India.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                A rural India where communities thrive with equal access to opportunities, where local talent is
                nurtured and retained, and where sustainable development practices ensure prosperity for generations to
                come.
              </p>
              <p className="text-gray-600">
                We envision villages that are self-sufficient, connected, and vibrant centers of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide our work and define our approach to rural development.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
                <div className="mr-4 bg-emerald-100 p-3 rounded-full text-emerald-600">
                  <value.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals working to fulfill our mission.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              Our team also includes over 50 dedicated staff members and 200+ field associates working directly in rural
              communities.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Since 2015, we've been making a difference in rural communities across India.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-emerald-50 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">By the Numbers</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <span className="block h-4 w-4 rounded-full bg-emerald-600"></span>
                    </div>
                    <span className="text-gray-700">500+ villages reached across 8 states</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <span className="block h-4 w-4 rounded-full bg-emerald-600"></span>
                    </div>
                    <span className="text-gray-700">10,000+ jobs created through our programs</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <span className="block h-4 w-4 rounded-full bg-emerald-600"></span>
                    </div>
                    <span className="text-gray-700">250+ Gram Panchayats strengthened</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <span className="block h-4 w-4 rounded-full bg-emerald-600"></span>
                    </div>
                    <span className="text-gray-700">15,000+ women empowered through skill development</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <span className="block h-4 w-4 rounded-full bg-emerald-600"></span>
                    </div>
                    <span className="text-gray-700">30% average increase in household income in partner villages</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Recognition</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">National Rural Innovation Award, 2022</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">Social Enterprise of the Year, 2020</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-emerald-100 rounded-full p-2 mr-4">
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">Digital Inclusion Excellence Award, 2019</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl mb-8">
                <img src='/assets/aboutus/impact1.avif' alt="Our impact" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-xl">
                  <img src='/assets/aboutus/impact4.avif' alt="Our impact" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-xl">
                  <img src='/assets/aboutus/impact3.avif' alt="Our impact" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our vision for rural development.
            </p>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 mr-2 flex items-center justify-center">
                <img src={partner} alt={`Partner ${index + 1}`} className="" />
              </div>
            ))}

          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Join Our Mission</h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Whether you're looking to volunteer, partner, or support our work, there are many ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-emerald-700/50"
            >
              Explore Our Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
