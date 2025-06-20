"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  Eye, EyeOff, Mail, Lock, User, Landmark, MapPin, Map
} from "lucide-react"
import axios from 'axios'
import { toast } from 'sonner';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/auth/AuthContext"
import { states } from "../data/states-data"

const Auth = () => {
  const [showPassword, setShowPassword] = useState(true)
  const navigate = useNavigate()

    const { user, setUser } = useAuth();


  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const location = useLocation();
  const isLogin = location.pathname === '/login';


  const {
    register,
    handleSubmit,
    watch,
    reset,
    defaultValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  

  const password = watch("password")
const selectedState = watch("state");
const selectedDistrict = watch("district");
  const onSubmit = async (data) => {

    try {
      const url = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`;

      const res = await axios.post(url, data);
      if (!isLogin) {
        toast.success('Registered successfully!');
        reset();
        navigate('/login');
      } else {
        toast.success('Logged in successfully!');
        reset();  
        setUser(res?.data?.user)      
      localStorage.setItem("user", JSON.stringify(res?.data.user));
      
        navigate('/');  
      }


    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      toast.error(errorMsg);
    }
  };

  
  const panFile = watch("panFile")?.[0];

  const aadhaarFile = watch("aadhaarFile")?.[0];
  // Set initial values from props (if any)
  useEffect(() => {
    if (defaultValues) {
      setValue("aadhaarFileUrl", defaultValues.aadhaarFile);
      setValue("panFileUrl", defaultValues.panFile);
    }
  }, [defaultValues, setValue]);

  // Generate preview URL dynamically (without useState)
  const isFile = (file) => file instanceof File;

  const aadhaarPreview = isFile(aadhaarFile)
    ? URL.createObjectURL(aadhaarFile)
    : defaultValues?.aadhaarFile;

  const panPreview = isFile(panFile)
    ? URL.createObjectURL(panFile)
    : defaultValues?.panFile;


  return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center mb-5">
  <div className="max-w-4xl w-full space-y-12"> {/* Increased width for form */}
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">
        {isLogin ? "Sign in to your account" : "Create your account"}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        {isLogin ? "Access your GramSeva dashboard" : "Join the GramSeva community"}
      </p>
    </div>

    <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* For login, email and password fields with half-width */}
        {isLogin ? (
          <div className="grid grid-cols-2 gap-6"> {/* Two columns for email and password */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is invalid"
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters"
                    }
                  })}
                  className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder="Your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>
        ) : (
          // For registration, keep the full-width fields
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  {...register("name", {
                    required: !isLogin ? "Name is required" : false,
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is invalid"
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>
        )}

        {/* Remove PAN file upload for login screen */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN File</label>
              <input
                type="file"
                accept="image/*,.pdf"
                {...register("panFile", {
                  required: !defaultValues?.panFile ? "PAN file is required" : false,
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              {panPreview && (
                panPreview.endsWith(".pdf") ? (
                  <a
                    href={panPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block"
                  >
                    View PAN PDF
                  </a>
                ) : (
                  <img src={panPreview} alt="PAN Preview" className="h-24 mt-2 image-preview" />
                )
              )}
              <input type="hidden" {...register("panFileUrl")} />
              {errors.panFile && (
                <span className="text-red-500 text-sm">{errors?.panFile?.message}</span>
              )}
            </div>
          </div>
        )}

        {/* Password and Confirm Password in the same row (for registration only) */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: isLogin ? 1 : 5,
                      message: "Password must be at least 5 characters"
                    }
                  })}
                  className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder={isLogin ? "Your password" : "Create a password"}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    validate: value =>
                      value === password || "Passwords do not match"
                  })}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.6_0.15_160deg)] focus:outline-none cursor-pointer"
        >
          {isSubmitting ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Sign Up")}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? "/register" : "/login"}>
            <button className="font-medium text-[oklch(0.7_0.15_160deg)] hover:text-[oklch(0.6_0.15_160deg)] cursor-pointer">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>



  )
}

export default Auth
