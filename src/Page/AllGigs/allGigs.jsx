import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AllGigs = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedGig, setSelectedGig] = useState(null);

  const { data: gigs = [], isLoading } = useQuery({
    queryKey: ["allGigs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gigs");
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <section className="w-11/12 mx-auto my-16">
      <div className="text-center mb-10">
        <p className="text-secondary font-bold text-lg">
          Freelance Marketplace
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">
          All Gigs
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Explore gigs from freelancers. Click view to see details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gigs.map((gig, index) => (
          <div
            key={gig._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <h3 className="font-bold text-lg mb-2">{gig.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{gig.category}</p>
              <p className="font-semibold text-green-600 mb-3">৳ {gig.price}</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {gig.description}
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span
                className={`badge ${
                  gig.status === "active" ? "badge-success" : "badge-warning"
                }`}
              >
                {gig.status}
              </span>
              <button
                onClick={() => setSelectedGig(gig)}
                className="btn btn-xs btn-outline btn-primary"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No gigs message */}
      {gigs.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No gigs available at the moment.
        </p>
      )}

      {/* Modal */}
      {selectedGig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={() => setSelectedGig(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-3">{selectedGig.title}</h2>
            <p className="text-gray-600 mb-2">
              Category: {selectedGig.category}
            </p>
            <p className="text-green-600 font-semibold mb-2">
              Price: ৳ {selectedGig.price}
            </p>
            <p className="text-gray-700 mb-4">{selectedGig.description}</p>
            <p className="text-sm text-gray-500">
              Posted by: {selectedGig.freelancerEmail}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllGigs;
