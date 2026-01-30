import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const FreelancerApplications = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["freelancerApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/freelancer-applications");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${status} this application`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/admin/freelancer-applications/${id}`, {
        status,
      });

      Swal.fire("Success!", `Application ${status}`, "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl text-gray-500 font-bold mb-6">
        Freelancer Applications ({applications.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>NID Number</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td className="text-black">{index + 1}</td>
                <td className="text-black">{app.name}</td>
                <td className="text-black">{app.email}</td>
                <td className="font-mono text-black">{app.nidNumber}</td>
                <td className="text-black">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "badge-success"
                        : app.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {app.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusChange(app._id, "approved")}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No freelancer applications found
          </p>
        )}
      </div>
    </div>
  );
};

export default FreelancerApplications;
