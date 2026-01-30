import React, { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import Loader from "../../Components/Shared/Loader";
import JobDetailsTab from "./JobDetailsTab";

const JobDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // single job info
  const { data: job = {}, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs/${id}`);
      return res.data;
    },
  });

  // fetch user's wishlist to check if job is already wishlisted
  useEffect(() => {
    if (user?.email && job?._id) {
      axiosSecure
        .get(`/wishlist/${user.email}`)
        .then((res) => {
          const exists = res.data.find((item) => item.jobId === job._id);
          setIsWishlisted(!!exists);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email, job?._id, axiosSecure]);

  // apply/mutation for job
  const applyMutation = useMutation({
    mutationFn: async (applyData) => {
      const res = await axiosSecure.post("/job-applications", applyData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Application submitted successfully", "success");
      reset();
      modalRef.current.close();
    },
  });

  const handleApplySubmit = (data) => {
    const applyInfo = {
      jobId: job._id,
      posterEmail: job.posterEmail,
      jobTitle: job.jobTitle,
      skills: job.skills,
      freelancerName: user.displayName,
      freelancerEmail: user.email,
      phone: data.phone,
      address: data.address,
      applicationStatus: "pending",
      applyDate: new Date(),
      budget: job.budget,
    };
    applyMutation.mutate(applyInfo);
  };

  // wishlist add/remove mutation
  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await axiosSecure.delete(`/wishlist/${user.email}/${job._id}`);
        setIsWishlisted(false);
        Swal.fire("Removed!", "Job removed from wishlist", "success");
      } else {
        const wishlistInfo = {
          userEmail: user.email,
          jobId: job._id,
          jobTitle: job.jobTitle,
          skills: job.skills,
          salary: job.budget,
          posterEmail: job.posterEmail,
        };
        await axiosSecure.post("/wishlist", wishlistInfo);
        setIsWishlisted(true);
        Swal.fire("Added!", "Job added to wishlist", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-11/12 mx-auto p-6">
      {/* job info */}
      <div className="flex flex-col md:flex-row gap-10 bg-base-100 p-6 rounded-lg shadow-md">
        <div className="md:w-1/3 flex justify-center items-center">
          {job.image && (
            <img
              src={job.image}
              alt={job.jobTitle}
              className="rounded-lg max-h-96 object-contain"
            />
          )}
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
            <button onClick={toggleWishlist} className="text-2xl">
              {isWishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
          </div>

          <p>
            Skills:{" "}
            {job.skills && Array.isArray(job.skills)
              ? job.skills.join(", ")
              : job.skills}
          </p>
          <p className="text-2xl font-semibold text-green-600">
            Budget: {job.budget} BDT
          </p>

          <button
            onClick={() => modalRef.current.showModal()}
            className="btn btn-primary w-40 mt-4"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-10 bg-base-100 rounded-lg shadow-md">
        <JobDetailsTab job={job} />
      </div>

      {/* modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Apply for this Job</h3>

          <form
            onSubmit={handleSubmit(handleApplySubmit)}
            className="space-y-4"
          >
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Address"
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? "Submitting..." : "Apply Now"}
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default JobDetails;
