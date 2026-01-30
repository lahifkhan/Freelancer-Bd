import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-details/${job._id}`}>
      <div className="card bg-base-100 shadow-sm hover:shadow-lg cursor-pointer transition h-[380px] w-full">
        <figure className="h-48 bg-base-300 p-4 flex items-center justify-center">
          {job.image ? (
            <img
              src={job.image}
              alt={job.jobTitle}
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </figure>

        <div className="card-body space-y-2">
          <h2 className="card-title text-primary line-clamp-1">
            {job.jobTitle}
          </h2>

          <p className="text-base-content line-clamp-1">
            Skills Required: <span className="font-medium">{job.skills}</span>
          </p>

          <p className="text-sm text-gray-500 line-clamp-1">
            Posted by: <span className="font-medium">{job.posterEmail}</span>
          </p>

          <p className="font-semibold text-primary mt-2">
            Budget: ${job.budget}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
