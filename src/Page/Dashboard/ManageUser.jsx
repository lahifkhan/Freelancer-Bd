import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // update role function
  const handleRoleUpdate = (user, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change ${user.displayName}'s role to "${newRole}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();

              Swal.fire({
                title: "Updated!",
                text: `${user.displayName}'s role has been changed to "${newRole}".`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                position: "top-end",
              });
            }
          });
      }
    });
  };

  //
  const roleButtons = (user) => (
    <div className="flex gap-2">
      {/* Make Admin */}
      <button
        onClick={() => handleRoleUpdate(user, "admin")}
        className={`btn btn-sm ${
          user.role === "admin" ? "btn-disabled" : "btn-success"
        }`}
      >
        Make Admin
      </button>

      {/* Make Librarian */}
      <button
        onClick={() => handleRoleUpdate(user, "freelancer")}
        className={`btn btn-sm ${
          user.role === "freelancer" ? "btn-disabled" : "btn-info"
        }`}
      >
        Make Freelancer
      </button>

      {/* Make User (Remove Roles) */}
      <button
        onClick={() => handleRoleUpdate(user, "user")}
        className={`btn btn-sm ${
          user.role === "user" ? "btn-disabled" : "btn-warning"
        }`}
      >
        Make User
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl text-accent font-semibold">
        Manage Users ({users.length})
      </h2>

      {/* Search Input */}
      <div className="flex max-w-sm">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            placeholder="Search users..."
            className="grow"
          />
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm bg-base-100">
        <table className="table">
          <thead className="bg-base-200">
            <tr className="text-base">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>

                {/* User Info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-xs opacity-60">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                {/* Role */}
                <td>
                  <span className="badge badge-outline badge-primary">
                    {user.role}
                  </span>
                </td>

                {/* Universal Role Buttons */}
                <td>{roleButtons(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
