import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import React from "react";

const EditJob = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: job = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["singleJob", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationKey: ["job", id],
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/update-job/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Job updated successfully", "success");
      refetch();
      navigate("/dashboard/freelancer/my-jobs");
    },
  });

  const handleEditJob = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedJob = {
      jobTitle: form.jobTitle.value,
      skills: form.skills.value,
      budget: Number(form.budget.value),
      description: form.description.value,
      image: form.image.value,
      status: form.status.value,
    };

    mutation.mutate(updatedJob);
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-5"> Edit Job / Project</h2>

      <form onSubmit={handleEditJob} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="font-medium">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            defaultValue={job.jobTitle}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Required Skills */}
        <div>
          <label className="font-medium">Required Skills</label>
          <input
            type="text"
            name="skills"
            defaultValue={job.skills}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="font-medium">Budget (BDT)</label>
          <input
            type="number"
            name="budget"
            defaultValue={job.budget}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-medium">Status</label>
          <select
            name="status"
            defaultValue={job.status}
            className="select select-bordered w-full"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="font-medium">Project Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={job.image}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={job.description}
            required
            className="textarea textarea-bordered w-full h-32"
          ></textarea>
        </div>

        <button className="btn btn-primary w-full">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
