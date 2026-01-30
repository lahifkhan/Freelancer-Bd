import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader";
import useAuth from "../../../Hook/useAuth";
import { useState } from "react";

const MyGigs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedGig, setSelectedGig] = useState(null);

  // fetch freelancer's gigs
  const {
    data: gigs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myGigs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/gigs/my?email=${user.email}`);
      return res.data;
    },
  });

  // delete gig
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/gigs/${id}`),
    onSuccess: () => {
      refetch();
      Swal.fire("Deleted!", "Gig deleted successfully", "success");
    },
  });

  // update gig
  const updateMutation = useMutation({
    mutationFn: async (updatedGig) => {
      return axiosSecure.patch(`/gigs/${selectedGig._id}`, updatedGig);
    },
    onSuccess: () => {
      refetch();
      setSelectedGig(null);
      Swal.fire("Updated!", "Gig updated successfully", "success");
      document.getElementById("edit_gig_modal").close();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This gig will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedGig = {
      title: form.title.value,
      category: form.category.value,
      price: Number(form.price.value),
      status: form.status.value,
      description: form.description.value,
    };

    updateMutation.mutate(updatedGig);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">My Gigs</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {gigs.map((gig, index) => (
              <tr key={gig._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{gig.title}</td>
                <td>{gig.category}</td>
                <td className="font-semibold text-green-600">৳ {gig.price}</td>
                <td>
                  <span
                    className={`badge ${
                      gig.status === "active"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {gig.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => {
                      setSelectedGig(gig);
                      document.getElementById("edit_gig_modal").showModal();
                    }}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {gigs.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            You haven’t posted any gigs yet.
          </p>
        )}
      </div>

      {/* ================= Edit Modal ================= */}
      <dialog id="edit_gig_modal" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg mb-4">Edit Gig</h3>

          {selectedGig && (
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                name="title"
                defaultValue={selectedGig.title}
                className="input input-bordered w-full"
                placeholder="Gig Title"
                required
              />

              <input
                name="category"
                defaultValue={selectedGig.category}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />

              <input
                type="number"
                name="price"
                defaultValue={selectedGig.price}
                className="input input-bordered w-full"
                placeholder="Price"
                required
              />

              <select
                name="status"
                defaultValue={selectedGig.status}
                className="select select-bordered w-full"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>

              <textarea
                name="description"
                defaultValue={selectedGig.description}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary btn-sm">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    document.getElementById("edit_gig_modal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyGigs;
