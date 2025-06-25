import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, User, MapPin, Map, Landmark } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { states } from '../data/states-data'
import { toast } from 'sonner'
import axios from 'axios'
import { useRegisterUser, useSendOtp } from '.././hook/use-user.hook';
import { useVerifyOtp } from '.././hook/use-user.hook';
// State, District, Tehsil data


const Register = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, defaultValues, isSubmitting, getValues, setError } = useForm();

  // State to store selected options
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();


  // Get districts and tehsils based on selected state and district
  const districts = states.find(state => state.name === selectedState)?.districts || [];
  const tehsils = districts.find(district => district.name === selectedDistrict)?.tehsils || [];
  const email = getValues("email");

const { mutateAsync: registerUserMutation, isPending } = useRegisterUser();

const navigate = useNavigate();

  const handleSendOtp = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    await sendOtpMutation.mutateAsync({ email });
    setOtpSent(true);
  };


  const handleVerifyOtp = async () => {
    const email = getValues("email");
    const otp = getValues("otp");

    if (!otp) {
      setError("otp", { message: "Please enter the OTP." });
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({ email, otp });
      setEmailVerified(true);
    } catch {
      setError("otp", { message: "Invalid or expired OTP." });
    }
  };



const onSubmit = async (data) => {
      if (!emailVerified) {
      toast.error("Please verify your email before registering.");
      return;
    }
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('state', data.state);
  formData.append('district', data.district);
  formData.append('tehsil', data.tehsil);
  formData.append('password', data.password);
  formData.append('confirmPassword', data.confirmPassword);
  if (data.aadhaarFile?.[0]) formData.append('aadhaarFile', data.aadhaarFile[0]);
  if (data.panFile?.[0]) formData.append('panFile', data.panFile[0]);

  try {
    await registerUserMutation(formData);
    setEmailVerified(false);
    setOtpSent(false);
    navigate('/login');
  } catch (err) {
    console.error("Registration failed:", err);
  }
};






  // Watch files
  const panFile = watch("panFile")?.[0];
  const aadhaarFile = watch("aadhaarFile")?.[0];

  // Generate preview URL dynamically
  const isFile = (file) => file instanceof File;
  const aadhaarPreview = isFile(aadhaarFile) ? URL.createObjectURL(aadhaarFile) : "";
  const panPreview = isFile(panFile) ? URL.createObjectURL(panFile) : "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center mb-5">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">

          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join the GramSeva community</p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1 flex gap-2 items-center">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email"
                      }
                    })}
                    className="w-full pl-10 py-2 border rounded-md"
                    placeholder="you@example.com"
                    disabled={emailVerified}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={ emailVerified || sendOtpMutation.isPending}
                    className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-3 rounded"
                  >
                    {sendOtpMutation.isPending ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
                  </button>

                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            {/* OTP */}
            {otpSent && !emailVerified && (
              <div className="flex gap-4 items-center">
                <input
                  {...register("otp")}
                  placeholder="Enter OTP"
                  className="border py-2 px-3 rounded w-1/2"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyOtpMutation.isPending}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
                </button>

              </div>
            )}
            {errors.otp && <p className="text-sm text-red-600">{errors.otp.message}</p>}
            {emailVerified && <p className="text-green-600 font-semibold">Email verified!</p>}


            {/* State, District, Tehsil */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* State Selection */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <select
                  id="state"
                  {...register("state", { required: "State is required" })}
                  className={`block w-full pl-4 pr-3 py-2 border ${errors.state ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.name} value={state.name}>{state.name}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>}
              </div>

              {/* District Selection */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                <select
                  id="district"
                  {...register("district", { required: "District is required" })}
                  className={`block w-full pl-4 pr-3 py-2 border ${errors.district ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.name} value={district.name}>{district.name}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-2 text-sm text-red-600">{errors.district.message}</p>}
              </div>
            </div>

            {/* Tehsil Selection */}
            <div className="w-full sm:w-[25rem]">
              <label htmlFor="tehsil" className="block text-sm font-medium text-gray-700">Tehsil</label>
              <select
                id="tehsil"
                {...register("tehsil", { required: "Tehsil is required" })}
                className={`block w-full pl-4 pr-3 py-2 border ${errors.tehsil ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
              >
                <option value="">Select Tehsil</option>
                {tehsils.map(tehsil => (
                  <option key={tehsil} value={tehsil}>{tehsil}</option>
                ))}
              </select>
              {errors.tehsil && <p className="mt-2 text-sm text-red-600">{errors.tehsil.message}</p>}
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Aadhaar Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Aadhaar File</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  {...register("aadhaarFile", { required: "Aadhaar file is required" })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {aadhaarPreview && (
                  <img src={aadhaarPreview} alt="Aadhaar Preview" className="h-24 mt-2 image-preview" />
                )}
                <input type="hidden" {...register("aadhaarFileUrl")} />
                {errors.aadhaarFile && <span className="text-red-500 text-sm">{errors?.aadhaarFile?.message}</span>}
              </div>

              {/* PAN Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">PAN File</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  {...register("panFile", { required: !defaultValues?.panFile ? "PAN file is required" : false })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {panPreview && (panPreview.endsWith(".pdf") ? (
                  <a href={panPreview} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block">
                    View PAN PDF
                  </a>
                ) : (
                  <img src={panPreview} alt="PAN Preview" className="h-24 mt-2 image-preview" />
                ))}
                <input type="hidden" {...register("panFileUrl")} />
                {errors.panFile && <span className="text-red-500 text-sm">{errors?.panFile?.message}</span>}
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                    placeholder="Create a password"
                  />
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
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: value => value === document.getElementById("password").value || "Passwords do not match"
                    })}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? "border-red-300" : "border-gray-300"} rounded-md focus:ring focus:outline-none`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.6_0.15_160deg)] focus:outline-none cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button> */}

            <button
  type="submit"
  disabled={isSubmitting || isPending}
  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
    isPending
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.6_0.15_160deg)]'
  }`}
>
  {isPending ? "Registering..." : "Sign Up"}
</button>

          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? 
              <Link to="/login">
                <span className="font-medium text-[oklch(0.7_0.15_160deg)] hover:text-[oklch(0.6_0.15_160deg)] cursor-pointer">
                   {" "}Sign In
                </span>
              </Link>
            </p>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Register;
