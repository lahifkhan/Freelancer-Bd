import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useRole from "../../Hook/useRole";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Components/Shared/Loader";

const MyProfile = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const [initialValues, setInitialValues] = useState({});

  // Fetch latest user data from backend
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", authUser?.email],
    queryFn: async () => {
      if (!authUser?.email) return null;
      const res = await axiosSecure.get(`/users/${authUser.email}`);
      return res.data;
    },
    enabled: !!authUser?.email,
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      const initial = {
        displayName: user.displayName,
        email: user.email,
        role: role,
      };
      reset(initial);
      setInitialValues(initial); // save initial values
    }
  }, [user, role, reset]);

  const watchAll = watch(); // watch all form values
  const watchImage = watch("photo");

  // Check if form values are different from initial
  const isFormChanged =
    isDirty ||
    (watchImage && watchImage.length > 0) ||
    watchAll.displayName !== initialValues.displayName;

  const onSubmit = async (data) => {
    try {
      let photoURL = user.photoURL;

      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host
          }`,
          formData
        );
        photoURL = imgRes.data.data.display_url;
      }

      const updatedData = {
        displayName: data.displayName,
        photoURL,
      };

      const res = await axiosSecure.patch(
        `/users/profile/${user.email}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully!",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });

        queryClient.invalidateQueries({ queryKey: ["user", authUser?.email] });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
      });
    }
  };

  if (authLoading || isLoading) return <Loader></Loader>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 text-center">
          <div className="avatar mx-auto mb-4">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                src={
                  watchImage?.[0]
                    ? URL.createObjectURL(watchImage[0])
                    : user.photoURL
                }
                alt="Profile"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 badge badge-primary">{role}</p>
        </div>

        {/* Edit Form */}
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("displayName", { required: "Name is required" })}
              />
              {errors.displayName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full "
                {...register("email")}
                readOnly
              />
            </div>

            {/* Role */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Role</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full "
                {...register("role")}
                readOnly
              />
            </div>

            {/* Image Upload */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">
                  Update Profile Image
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("photo")}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={!isFormChanged}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
