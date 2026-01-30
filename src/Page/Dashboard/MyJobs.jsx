import React from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";

const MyJobs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myJobs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myJobs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-jobs/${user.email}`);
      return res.data;
    },
  });

  // Handle Open / Close status
  const handleStatusUpdate = async (id, currentStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        currentStatus === "open"
          ? "This will close the job."
          : "This will reopen the job.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: currentStatus === "open" ? "Yes, Close" : "Yes, Open",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newStatus = currentStatus === "open" ? "closed" : "open";

        try {
          const res = await axiosSecure.patch(`/update-job-status/${id}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Job status updated.", "success");
            refetch();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">💼 My Jobs</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-lg font-semibold text-accent">
              <th>#</th>
              <th>Job</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myJobs.map((job, index) => (
              <tr key={job._id}>
                <td className="text-accent">{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    {job.image && (
                      <img
                        src={job.image}
                        alt={job.jobTitle}
                        className="w-16 h-20 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-bold text-accent">{job.jobTitle}</p>
                    </div>
                  </div>
                </td>

                <td>{job.skills}</td>

                <td>
                  <span className="font-semibold text-accent">
                    {job.status}
                  </span>
                </td>

                <td className="font-semibold text-accent">{job.budget} BDT</td>

                <td>
                  <Link
                    to={`/dashboard/edit-job/${job._id}`}
                    className="btn btn-sm btn-info text-white"
                  >
                    Edit
                  </Link>
                </td>

                <td>
                  <button
                    onClick={() => handleStatusUpdate(job._id, job.status)}
                    className="btn btn-sm btn-error text-white"
                  >
                    {job.status === "open" ? "Close" : "Open"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-5">No jobs added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
