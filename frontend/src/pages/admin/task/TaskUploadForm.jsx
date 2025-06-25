import React, { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from "sonner";
import { useUpdateAssignTask } from '../../../hook/use-task.hook';
import { useLocation, useNavigate } from "react-router-dom";
const user = JSON.parse(localStorage.getItem('user'))


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TaskUploadForm = ({ row, taskData, onClose, isViewMode }) => {

    const navigate = useNavigate();
  const query = useQuery();
  const lfaId = query.get('lfaId');

  console.log(lfaId)

  
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting }, watch } = useForm({});
  const inputRef = useRef();
  const imagesRef = useRef([]); // For upload mode

  const [existingImages, setExistingImages] = useState([]);


  const { mutate: updateTask, isLoading: isUpdating } = useUpdateAssignTask();
  // Extract task object if present
  const task = taskData?.data?.[0];


  // Pre-fill form fields
  useEffect(() => {
    if (task) {
      setValue("lfaId", task.lfaId || row?.lfaId || "");
      setValue("description", task.description || "");
      setValue("title", task.title || "");
      setExistingImages(task.images || []);
    } else {
      setValue("lfaId", row?.lfaId || "");
      setValue("description", "");
      setValue("title", "");
      setExistingImages([]);
    }
  }, [task, row, setValue]);


  // Delete image API call
  const handleDeleteImage = async (imgUrl) => {
    try {
      await axios.delete(`${BASE_URL}/task/image`, {
        data: { taskId: task._id, imageUrl: imgUrl },
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
      toast.success("Image deleted");
    } catch (err) {
      toast.error("Failed to delete image");
    }
  };
  // Handle file input change (USER only)
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const merged = [...imagesRef.current];
    files.forEach(file => {
      if (!merged.some(f => f.name === file.name && f.size === file.size)) {
        merged.push(file);
      }
    });
    imagesRef.current = merged;
    setValue("imagesCount", merged.length, { shouldValidate: true });
  };

  // Remove image by index (USER only)
  const removeImage = (idx) => {
    const arr = imagesRef.current.filter((_, i) => i !== idx);
    imagesRef.current = arr;
    setValue("imagesCount", arr.length, { shouldValidate: true });
    if (inputRef.current) inputRef.current.value = "";
  };



  // Submit handler (USER only)
  const onSubmit = async (data) => {
    try {
      const isUpdate = !!task?._id;

      if (!isUpdate && imagesRef.current.length === 0) {
        toast.error("Please upload at least one image.");
        return;
      }

      const formData = new FormData();
      formData.append("lfaId", data.lfaId);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const interestedWorks = Array.isArray(data.interestedWork)
        ? data.interestedWork
        : [data.interestedWork]; // Convert string to array if only one selected

      interestedWorks.forEach((value) => {
        formData.append("interestedWork", value);
      });


      if (imagesRef.current.length) {
        imagesRef.current.forEach(file => formData.append("images", file));
        const imageDetails = imagesRef.current.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        formData.append("imageDetails", JSON.stringify(imageDetails));
      }

      if (task && task._id) {
        updateTask(
          { id: task?._id, data: formData },
          {
            onSuccess: () => {
              toast.success("Task updated successfully!");
              reset();
              onClose && onClose();
              imagesRef.current = [];
              if (inputRef.current) inputRef.current.value = "";
            },
            onError: (err) => {
              toast.error(err?.message || "Update failed");
            }
          }
        );
      } else {
        // If creating new, call submit API as before
        const res = await axios.post(`${BASE_URL}/task/submit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user?.token}`,
          },
        });

        toast.success(res.data.message || "Application submitted");
        reset();
        onClose && onClose();
        imagesRef.current = [];
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  setValue("interestedWork", row?.interestedWork.split(" ") || []);


  const workArray = row?.interestedWork
    ?.split(",")
    .map(item => item.trim())
    .filter(Boolean) || [];



  useEffect(() => {
    setValue("interestedWork", workArray);
  }, [workArray, setValue]);


  // Only USER can 
  const isEditable = user?.role === "USER";

  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 shadow-lg rounded-lg" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          Submit Assigned Work
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">LFA ID</label>
            <input
              {...register("lfaId", { required: "LFA ID is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              value={task ? task.lfaId : row?.lfaId}
              disabled
            />
          </div>
          <div className="">
            <label className="block font-medium mb-2"> Work </label>
            <div className="flex flex-wrap gap-4">
              {workArray.map((option) => (
                <label key={option} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    disabled={!isEditable}
                    {...register("interestedWork", {
                      required: "Please select at least one option",
                    })}
                    defaultChecked={true} 
                    className="form-checkbox h-5 w-5 text-emerald-600 border border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>




            {errors.interestedWork && <span className="text-red-500 text-sm">{errors.interestedWork.message}</span>}
          </div>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              type="text"
              placeholder="Enter title"
              disabled={!isEditable}
              defaultValue={task?.title || ""}
              onChange={e => setValue("title", e.target.value)}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description",)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows={3}
              placeholder="Enter description"
              disabled={!isEditable}
              defaultValue={task?.description || ""}
              onChange={e => setValue("description", e.target.value)}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Upload Images</label>
            {isEditable && (
              <>
                {/* Existing images with delete icon */}
                {existingImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-3">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative flex flex-col items-center">
                        <img
                          src={img}
                          alt={`uploaded-${idx}`}
                          className="w-24 h-24 object-cover rounded border border-gray-300"
                        />
                        <span className="text-xs mt-1 max-w-[6rem] truncate">{img.split('/').pop()}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img)}
                          className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          title="Delete"
                        >
                          <X size={16} className="text-red-500 cursor-pointer" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* File input for new images */}
                <input
                  id="imagesInput"
                  type="file"
                  ref={inputRef}
                  accept=".jpg,.jpeg,.png"
                  multiple
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 mt-2"
                  onChange={handleImagesChange}
                />
                {errors.images && (
                  <span className="text-red-500 text-sm">{errors.images.message}</span>
                )}
                {/* Preview selected images */}
                {imagesRef.current.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-3">
                    {imagesRef.current.map((file, idx) => (
                      <div key={idx} className="relative flex flex-col items-center">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-24 h-24 object-cover rounded border border-gray-300"
                        />
                        <span className="text-xs mt-1 max-w-[6rem] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          title="Remove"
                        >
                          <X size={16} className="text-red-500 cursor-pointer" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {/* ADMIN: Only preview images */}
            {!isEditable && (
              <>
                {task?.images && task.images.length > 0 ? (
                  <div className="flex flex-wrap gap-4 mt-3">
                    {task.images.map((img, idx) => (
                      <div key={idx} className="relative flex flex-col items-center">
                        <a href={img} target="_blank" rel="noopener noreferrer">
                          <img
                            src={img}
                            alt={`uploaded-${idx}`}
                            className="w-24 h-24 object-cover rounded border border-gray-300 hover:opacity-80 transition"
                            style={{ cursor: "pointer" }}
                          />
                        </a>
                        <span className="text-xs mt-1 max-w-[6rem] truncate">{img.split('/').pop()}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">No images uploaded.</span>
                )}
              </>
            )}
          </div>

          {isEditable && (
            <div className="md:col-span-2 flex justify-between items-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting || isUpdating}
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 font-medium shadow cursor-pointer"
              >
                {isSubmitting || isUpdating ? 'Submitting...' : (task && task._id ? 'Update Task' : 'Submit Application')}
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-emerald-600 cursor-pointer"
                onClick={() => {
                  reset();
                  imagesRef.current = [];
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Reset
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default TaskUploadForm