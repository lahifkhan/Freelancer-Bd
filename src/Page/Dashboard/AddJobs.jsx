import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";

const AddJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    console.log("Submitted Job:", data);

    try {
      // Optional: Upload project image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const imgRes = await axios.post(imgURL, formData);

      const photoURL = imgRes?.data?.data?.display_url;

      // Prepare job object (backend endpoint same: /books)
      const jobData = {
        jobTitle: data.title,
        skills: data.skill,
        budget: Number(data.budget),
        jobStatus: "open", // 🔒 system controlled
        description: data.description,
        image: photoURL,
        posterEmail: user.email,
        paymentStatus: "unpaid", // 💰 future use
        createdAt: new Date(),
      };

      Swal.fire({
        title: "Confirm Adding Job",
        html: `
    You are about to add the following job:<br/>
    <strong>${jobData.jobTitle}</strong> requiring <strong>${jobData.skills}</strong>.<br/>
    Budget: <strong>${jobData.budget} BDT</strong>.<br/>
    Please confirm to proceed.
  `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add Job",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/jobs", jobData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Job "${jobData.jobTitle}" has been added successfully!`,
                showConfirmButton: false,
                timer: 2500,
              });
              reset();
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add a New Job / Project</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Job Title */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Job Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            className="input input-bordered w-full"
            {...register("title", { required: "Job title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Required Skill */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Required Skill</span>
          </label>
          <input
            type="text"
            placeholder="Enter required skill"
            className="input input-bordered w-full"
            {...register("skill", { required: "Skill is required" })}
          />
          {errors.skill && (
            <p className="text-red-500 text-sm mt-1">{errors.skill.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Budget (BDT)</span>
          </label>
          <input
            type="number"
            placeholder="Enter budget"
            className="input input-bordered w-full"
            {...register("budget", {
              required: "Budget is required",
              min: { value: 1, message: "Budget must be at least 1 BDT" },
            })}
          />
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Job Status</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("status", { required: true })}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Optional Image */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">
              Project Image (Optional)
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        {/* Job Description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Job Description</span>
          </label>
          <textarea
            placeholder="Write a detailed description..."
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
