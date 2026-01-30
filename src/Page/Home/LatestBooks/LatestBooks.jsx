import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import BookCard from "../../../Components/Book/JobCard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["latestJobs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/jobs/latest");
      console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    AOS.refresh();
  }, [jobs]);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="w-11/12 mx-auto my-16">
      <div className="text-center mb-10">
        <p className="text-secondary font-bold text-lg">Our Collection</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          Latest jobs
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Discover the newest open jobs from our site. Explore and grab your
          favorite ones!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <div key={job._id} data-aos="fade-up" data-aos-delay={index * 100}>
            <BookCard book={job} />
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-gray-500 py-10">No open job available</p>
      )}
    </section>
  );
};

export default LatestBooks;
