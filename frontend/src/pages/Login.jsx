import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import axios
import { Mail, Lock } from 'lucide-react';
import { toast } from 'sonner'; // Import toast for notifications
import { useAuth } from '../context/auth/AuthContext';

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate for routing
const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting }
} = useForm();
    const { user, setUser } = useAuth();

  // Handle form submission
  const onSubmit = async (data) => { // Marked async for async/await functionality
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;  // Update this with your backend URL
    
      const res = await axios.post(url, data);
      toast.success('Logged in successfully!');
      reset();  
              setUser(res?.data?.user)      
      localStorage.setItem("user", JSON.stringify(res?.data.user));    
      navigate('/');  
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Something went wrong';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Access your dashboard</p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Your password"
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[oklch(0.7_0.15_160deg)] hover:bg-[oklch(0.6_0.15_160deg)] focus:outline-none cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-[oklch(0.7_0.15_160deg)] hover:text-[oklch(0.6_0.15_160deg)] cursor-pointer">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
