import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch freelancer's applications
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/application/${user.email}`);
      return res.data;
    },
  });

  // Cancel application mutation
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be cancelled",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/application/cancel/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Cancelled!",
            "Your application has been cancelled.",
            "success",
          );
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl text-accent font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{app.jobTitle}</td>
                <td>{new Date(app.applyDate).toLocaleDateString()}</td>
                <td>
                  <span className="capitalize">{app.applicationStatus}</span>
                </td>
                <td>
                  {app.applicationStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(app._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                  {app.applicationStatus !== "pending" && (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            You have not applied to any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
