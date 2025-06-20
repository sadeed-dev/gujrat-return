import React, { forwardRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { states } from "../../data/states-data";
import { toast } from "sonner";
import { useQueryClient } from '@tanstack/react-query';




const interestedWorkOptions = [
  "Recovery", "Startup", "Property", "Security"
]



const user = JSON.parse(localStorage.getItem('user'))
const LfaApplicationForm = forwardRef(({ defaultValues = {}, onClose, isEditForm }, ref,) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting }, watch } = useForm({
    defaultValues
  });

  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ['all-LFAs'] }); // <-- move before onClose
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
    <section ref={ref} className="py-12 bg-white">
      <div className="max-w-2xl mx-auto  sm:px-6 lg:px-8 shadow-lg rounded-lg " style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          {isEditForm ? 'Edit LFA Application Form' : 'LFA Application Form'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              {...register("name", { required: "Full Name is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="Enter your full name"
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
            />
            {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber.message}</span>}
          </div>




          {/* Aadhaar Upload */}
          <div className="mb-4">
            <label className="block font-medium">Aadhaar File:</label>
            <input
              type="file"
              accept="image/*,.pdf"
              {...register("aadhaarFile", {
                required: !isEditForm ? "aadhaarFile file is required" : false,

              })} className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"

            />
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

            <input type="file" accept="image/*,.pdf"
              {...register("panFile", {
                      required: !defaultValues?.panFile
        ? "PAN file is required"
        : false,

              })} 
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
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





     <div>
  <label className="block font-medium mb-1">Bank Account Number</label>
  <input
    {...register("bankAccountNumber", { required: "Account Number is required" })}
    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    type="text"
    placeholder="Enter your bank account number"
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
  />
  {errors.ifscCode && <span className="text-red-500 text-sm">{errors.ifscCode.message}</span>}
</div>

          <div>
            <label className="block font-medium mb-1">State</label>
            <select
              {...register("state", { required: "state is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
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
              disabled={!selectedState}
            >
              <option value="" disabled>Select your district</option>
              {selectedState &&
                states.find(s => s.name === selectedState)?.districts.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}              {/* {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))} */}
            </select>
            {errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}
          </div>

          <div>
            <label className="block font-medium mb-1">Tehsil</label>
            <select
              {...register("tehsil", { required: "Tehsil is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              defaultValue=""
              disabled={!selectedState && !selectedDistrict}

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
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors.interestedWork && <span className="text-red-500 text-sm">{errors.interestedWork.message}</span>}
          </div>
          <div className="md:col-span-2 flex justify-between items-center mt-4">
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
            {
              !isEditForm &&
              <button
                type="button"
                className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                onClick={() => reset()}
              >
                Reset
              </button>
            }

          </div>
        </form>
      </div>
    </section>
  )
})

export default LfaApplicationForm