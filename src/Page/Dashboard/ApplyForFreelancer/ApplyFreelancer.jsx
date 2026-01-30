import { useState } from "react";
import Swal from "sweetalert2";

import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader";

const ApplyFreelancer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [nidNumber, setNidNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nidNumber) {
      return Swal.fire("Error!", "NID number is required", "error");
    }

    setLoading(true);
    try {
      const payload = {
        name: user.displayName,
        email: user.email,
        nidNumber,
        applyDate: new Date(),
        status: "pending",
      };
      console.log(payload);

      const res = await axiosSecure.post("/freelancer/apply", payload);
      if (res.data.success) {
        Swal.fire("Success!", "Your application has been submitted", "success");
        setNidNumber("");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to submit application", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-11/12 max-w-md mx-auto my-10 p-6 bg-base-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Apply as Freelancer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={user.displayName || ""}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email || ""}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">NID Number</label>
          <input
            type="text"
            placeholder="Enter your NID number"
            value={nidNumber}
            onChange={(e) => setNidNumber(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-2">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyFreelancer;
