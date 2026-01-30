import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";

const PostGig = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const gigData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      skills: form.skills.value.split(","),
      price: parseInt(form.price.value),
      deliveryTime: form.deliveryTime.value,
      freelancerName: user.displayName,
      freelancerEmail: user.email,
      status: "active",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/gigs", gigData);
      Swal.fire("Success!", "Gig posted successfully", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to post gig", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-base-100 p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">Post a New Gig</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Gig Title"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Writing">Writing</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <textarea
          name="description"
          placeholder="Gig Description"
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        ></textarea>

        <input
          name="skills"
          type="text"
          placeholder="Required Skills (comma separated)"
          className="input input-bordered w-full"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price (USD)"
            className="input input-bordered w-full"
            required
          />

          <input
            name="deliveryTime"
            type="text"
            placeholder="Delivery Time (e.g. 3 Days)"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Posting..." : "Post Gig"}
        </button>
      </form>
    </div>
  );
};

export default PostGig;
