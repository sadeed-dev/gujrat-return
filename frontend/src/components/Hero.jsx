import React from 'react'

import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"




const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
      <div className="absolute inset-0">
        <img src='/assets/hero4.avif' alt="Rural landscape" className="w-full h-full object-cover opacity"  loading='lazy' />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/70 to-teal-700/70 mix-blend-multiply" /> */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>  


      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <p>Welcome to Gujarat </p>
            Network
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-emerald-50">
            We are building a powerful network of Local Field Associates (LFAs) who collect Gram Panchayat news, sell our services, and earn money — right from their own villages
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/lfa"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 transition-colors"
            >
            Join Now 
            </Link>
            <Link
              to="/work-get-paid"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-800 bg-opacity-60 hover:bg-opacity-70 transition-colors"
            >
             Work & Get Paid<ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
