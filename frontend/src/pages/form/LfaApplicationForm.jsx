import React, { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { states } from "../../data/states-data";
import { toast } from "sonner";
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from "../../context/auth/AuthContext";

const interestedWorkOptions = [
  "Recovery", "Startup", "Property", "Security"
]

const LfaApplicationForm = forwardRef(({ defaultValues = {}, onClose, isEditForm = false, isViewOnly = false }, ref) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting }, watch } = useForm({
    defaultValues
  });

  

  const queryClient = useQueryClient();
  const { user } = useAuth()
  const selectedState = watch('state')
  const selectedDistrict = watch('district')

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.aadhaarFile?.length) {
        formData.append("aadhaarFile", data.aadhaarFile[0]);
      }
      if (data.panFile?.length) {
        formData.append("panFile", data.panFile[0]);
      }

      formData.append("name", data.name);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("bankAccountNumber", data.bankAccountNumber);
      formData.append("ifscCode", data.ifscCode);

      formData.append("state", data.state);
      formData.append("district", data.district);
      formData.append("tehsil", data.tehsil);

      if (Array.isArray(data.interestedWork)) {
        data.interestedWork.forEach(work => formData.append("interestedWork", work));
      } else if (data.interestedWork) {
        formData.append("interestedWork", data.interestedWork);
      }

      let res;
      if (isEditForm && defaultValues._id) {
        // Update API
        res = await axios.patch(`${BASE_URL}/lfa/update/${defaultValues._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user?.token}`,
          },
        });

        toast.success(res.data.message || "Application updated");
        queryClient.invalidateQueries({ queryKey: ['all-LFAs'] });
        onClose && onClose();

      } else {
        // Create API
        res = await axios.post(`${BASE_URL}/lfa/submit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user?.token}`,
          },
        });
        toast.success(res.data.message || "Application submitted");
      }

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  const panFile = watch("panFile")?.[0];
  const aadhaarFile = watch("aadhaarFile")?.[0];

  useEffect(() => {
  if (defaultValues && defaultValues._id) {
    reset(defaultValues); 
    setValue("aadhaarFileUrl", defaultValues.aadhaarFile);
    setValue("panFileUrl", defaultValues.panFile);
  }
  // Only run once when component mounts or defaultValues change meaningfully
}, [defaultValues?._id]);

// useEffect(() => {
//   if (defaultValues) {
//     reset(defaultValues); 
//     setValue("aadhaarFileUrl", defaultValues.aadhaarFile);
//     setValue("panFileUrl", defaultValues.panFile);
//   }
// }, [defaultValues, reset, setValue]);

  const isFile = (file) => file instanceof File;

  const aadhaarPreview = isFile(aadhaarFile)
    ? URL.createObjectURL(aadhaarFile)
    : defaultValues?.aadhaarFile;

  const panPreview = isFile(panFile)
    ? URL.createObjectURL(panFile)
    : defaultValues?.panFile;

  // Helper for checkbox checked state in view mode
  const isChecked = (option) => {
    if (Array.isArray(defaultValues?.interestedWork)) {
      return defaultValues.interestedWork.includes(option);
    }
    if (typeof defaultValues?.interestedWork === "string") {
      return defaultValues.interestedWork === option;
    }
    return false;
  };

  return (
    <section ref={ref} className=" bg-white">
      <div className="max-w-2xl mx-auto  sm:px-6 lg:px-8 shadow-lg rounded-lg " style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          {isEditForm ? 'Edit LFA Application Form' : isViewOnly ? 'View LFA Application Form' : 'LFA Application Form'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
            <div>
              <label className="block font-medium mb-1">LFa ID</label>
              <input
                {...register("lfaId")}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                type="text"
                value={defaultValues ? defaultValues.lfaId : defaultValues?.lfaId}
                disabled
                readOnly
              />
            </div>
        
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              {...register("name")}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              disabled={isViewOnly}
              readOnly={isViewOnly}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input
              {...register("mobileNumber", {
                required: "Mobile Number is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit mobile number" }
              })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="tel"
              placeholder="Enter your mobile number"
              disabled={isViewOnly}
              readOnly={isViewOnly}
            />
            {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Bank Account Number</label>
            <input
              {...register("bankAccountNumber", { required: "Account Number is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="Enter your bank account number"
              disabled={isViewOnly}
              readOnly={isViewOnly}
            />
            {errors.bankAccountNumber && <span className="text-red-500 text-sm">{errors.bankAccountNumber.message}</span>}
          </div>
          <div className="">
            <label className="block font-medium mb-1">IFSC Code</label>
            <input
              {...register("ifscCode", { required: "IFSC Code is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="Enter your IFSC code"
              disabled={isViewOnly}
              readOnly={isViewOnly}
            />
            {errors.ifscCode && <span className="text-red-500 text-sm">{errors.ifscCode.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">State</label>
            <select
              {...register("state", { required: "state is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
              disabled={isViewOnly}
            >
              <option value="" disabled>Select your state</option>
              {states.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
            {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">District</label>
            <select
              {...register("district", { required: "District is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
              disabled={!selectedState || isViewOnly}
            >
              <option value="" disabled>Select your district</option>
              {selectedState &&
                states.find(s => s.name === selectedState)?.districts.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
            </select>
            {errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Tehsil</label>
            <select
              {...register("tehsil", { required: "Tehsil is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
              disabled={!selectedState && !selectedDistrict || isViewOnly}
            >
              <option value="">Select Tehsil</option>
              {selectedState && selectedDistrict &&
                states
                  .find(s => s.name === selectedState)?.districts
                  .find(d => d.name === selectedDistrict)?.tehsils
                  .map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
            </select>
            {errors.tehsil && <span className="text-red-500 text-sm">{errors.tehsil.message}</span>}
          </div>
          {/* Aadhaar Upload */}
          <div className="mb-4">
            <label className="block font-medium">Aadhaar File:</label>
            {!isViewOnly && (
              <input
                type="file"
                accept="image/*,.pdf"
                {...register("aadhaarFile", {
                  required: !isEditForm ? "aadhaarFile file is required" : false,
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            )}
            {aadhaarPreview && (
              <img
                src={aadhaarPreview}
                alt="Aadhaar Preview"
                className="h-24 mt-2 image-preview"
              />
            )}
            <input type="hidden" {...register("aadhaarFileUrl")} />
            {errors.aadhaarFile && (
              <span className="text-red-500 text-sm">{errors?.aadhaarFile?.message}</span>
            )}
          </div>
          {/* PAN Upload */}
          <div className="mb-4">
            <label className="block font-medium">PAN File:</label>
            {!isViewOnly && (
              <input type="file" accept="image/*,.pdf"
                {...register("panFile", {
                  required: !defaultValues?.panFile
                    ? "PAN file is required"
                    : false,
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            )}
            {panPreview &&
              (panPreview.endsWith(".pdf") ? (
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
              ))}
            <input type="hidden" {...register("panFileUrl")} />
            {errors.panFile && (
              <span className="text-red-500 text-sm">{errors?.panFile?.message}</span>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Interested Work (Select one or more)</label>
            <div className="flex flex-wrap gap-4">
              {interestedWorkOptions.map((option) => (
                <label key={option} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    {...register("interestedWork", { required: "Please select at least one option" })}
                    className="form-checkbox h-5 w-5 text-emerald-600 border border-gray-300-gray-300 rounded focus:ring-emerald-500"
                    disabled={isViewOnly}
                    checked={isViewOnly ? isChecked(option) : undefined}
                    readOnly={isViewOnly}
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors.interestedWork && <span className="text-red-500 text-sm">{errors.interestedWork.message}</span>}
          </div>
          <div className="md:col-span-2 flex justify-between items-center mt-4">
            {!isViewOnly && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 font-medium shadow cursor-pointer"
              >
                {isSubmitting
                  ? isEditForm
                    ? 'Updating...'
                    : 'Submitting...'
                  : isEditForm
                    ? 'Update Application'
                    : 'Submit Application'}
              </button>
            )}
            {!isEditForm && !isViewOnly && (
              <button
                type="button"
                className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                onClick={() => reset()}
              >
                Reset
              </button>
            )}
            <button
              type="button"
              className="text-gray-500 hover:text-emerald-600 cursor-pointer ml-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  )
})

export default LfaApplicationForm