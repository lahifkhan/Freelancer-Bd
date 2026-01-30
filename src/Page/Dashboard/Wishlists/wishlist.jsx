import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch wishlist (jobs)
  const {
    data: wishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    },
  });

  // Remove job from wishlist
  const handleRemove = async (jobId) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${user.email}/${jobId}`);

      if (res.data.success) {
        Swal.fire("Removed!", "Job removed from wishlist", "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to remove job", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading wishlist...</p>;
  }

  if (!wishlist.length) {
    return (
      <p className="text-center mt-10 text-accent">
        No jobs in your wishlist yet.
      </p>
    );
  }

  return (
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        ⭐ My Wishlist Jobs
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Budget</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {wishlist.map((job, index) => (
              <tr key={job.jobId}>
                <td>{index + 1}</td>

                <td
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/job-details/${job.jobId}`)}
                >
                  {job.jobTitle}
                </td>

                <td>{job.posterEmail || "N/A"}</td>

                <td>${job.salary}</td>

                <td>
                  <button
                    onClick={() => handleRemove(job.jobId)}
                    className="btn btn-sm btn-error flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
