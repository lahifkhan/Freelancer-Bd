import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

import nofoundImg from "../../assets/no-found.jpg";
import JobCard from "../../Components/Book/JobCard";

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("");

  const { data: jobs = [], isPending } = useQuery({
    queryKey: ["jobs", search, sortValue],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/jobs?status=open&search=${search}&sort=${sortValue}`,
      );
      return res.data;
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchText.value;
    const sort = e.target.sortValue.value;

    setSearch(searchValue);
    setSortValue(sort);
  };

  const SkeletonCard = () => (
    <div className="card bg-base-100 w-80 shadow-sm animate-pulse">
      <div className="h-40 bg-gray-300 rounded-t-xl"></div>
      <div className="card-body">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="text-center mb-10">
        <p className="text-secondary font-bold text-lg">
          Explore Available Jobs
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Discover All Open Projects
        </h2>

        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Browse thousands of projects posted by clients. Search, filter, and
          find your next job opportunity.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex justify-center mb-8">
        <div className="join w-full md:w-auto">
          <input
            type="text"
            name="searchText"
            className="input input-bordered join-item w-full md:w-80"
            placeholder="Search by job title"
          />

          <select name="sortValue" className="select select-bordered join-item">
            <option value="">Sort by Budget</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          <button className="btn btn-primary join-item" type="submit">
            Apply
          </button>
        </div>
      </form>

      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}

      {!isPending && jobs.length === 0 && (
        <div className="text-center mt-20">
          <img
            src={nofoundImg}
            alt="No data"
            className="w-52 mx-auto opacity-70"
          />
          <h3 className="text-xl font-semibold mt-4 text-accent">
            No Jobs Found
          </h3>
          <p className="text-accent">Try a different search or filter.</p>
        </div>
      )}

      {!isPending && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
