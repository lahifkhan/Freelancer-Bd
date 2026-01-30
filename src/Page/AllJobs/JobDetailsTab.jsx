import { useState } from "react";
import { FaStar } from "react-icons/fa";

import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const JobDetailsTab = ({ job }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post(`/jobs/${job?._id}/review`, {
        userEmail: user?.email,
        name: user?.displayName,
        rating,
        message,
        avatar: user?.photoURL,
      });

      Swal.fire("Success", "Review added successfully", "success");
      setMessage("");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.error || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <>
      <div className="tabs tabs-boxed">
        <button
          className={`tab ${activeTab === "description" && "tab-active"}`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`tab ${activeTab === "reviews" && "tab-active"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6">
        {activeTab === "description" && (
          <p className="text-accent">
            {job?.description || "No description provided."}
          </p>
        )}

        {activeTab === "reviews" && (
          <>
            {/* ADD REVIEW FORM */}
            {user && (
              <form onSubmit={handleReviewSubmit} className="mb-8 space-y-3">
                <div className="flex gap-2 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer ${star <= rating ? "" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your review..."
                  className="textarea textarea-bordered w-full"
                  required
                />

                <button className="btn btn-primary btn-sm">
                  Submit Review
                </button>
              </form>
            )}

            {/* SHOW REVIEWS */}
            <div className="space-y-6">
              {job?.reviews?.length > 0 ? (
                job.reviews.map((review, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img
                      src={review?.avatar}
                      className="w-12 h-12 rounded-full"
                      alt={review?.name || "Reviewer"}
                    />
                    <div>
                      <h4 className="font-semibold">{review?.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(review?.rating || 0)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {review?.date
                          ? new Date(review.date).toLocaleDateString()
                          : ""}
                      </p>
                      <p>{review?.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDetailsTab;
