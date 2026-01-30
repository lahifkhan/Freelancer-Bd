import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Loader from "../../../Components/Shared/Loader";

const JobApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch applications for job poster
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["jobApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/applycation/${user.email}`);
      return res.data;
    },
  });

  // update application status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/application/update-status/${id}`, { status });
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Updated!", "Application status updated", "success");
    },
  });

  // create stripe session for hire
  const handleHire = async (app) => {
    console.log("Budget sent to Stripe:", app.budget); // check console
    const budgetInt = parseInt(app.budget);

    if (isNaN(budgetInt)) {
      Swal.fire("Error!", "Invalid budget value.", "error");
      return;
    }

    try {
      const sessionRes = await axiosSecure.post("/payment-checkout-session", {
        applicationId: app._id,
        freelancerEmail: app.freelancerEmail,
        jobTitle: app.jobTitle,
        budget: budgetInt, // <-- make sure it's number
      });

      window.location.href = sessionRes.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to create payment session.", "error");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6">Job Applications</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Freelancer</th>
              <th>Skills</th>
              <th>Phone</th>
              <th>Apply Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{app.jobTitle}</td>
                <td>
                  {app.freelancerName}
                  <br />
                  <small className="text-gray-500">{app.freelancerEmail}</small>
                </td>
                <td>{app.skills}</td>
                <td>{app.phone}</td>
                <td>{new Date(app.applyDate).toLocaleDateString()}</td>
                <td>
                  {app.applicationStatus === "pending" ? (
                    <select
                      className="select select-sm select-bordered"
                      value={app.applicationStatus}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "hire") {
                          handleHire(app);
                        } else {
                          statusMutation.mutate({
                            id: app._id,
                            status: value,
                          });
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="hire">Hire</option>
                      <option value="rejected">Reject</option>
                    </select>
                  ) : (
                    <span className="badge badge-success">
                      {app.applicationStatus}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No applications found
          </p>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
