import React from "react";

import useRole from "../Hook/useRole";
import useAuth from "../Hook/useAuth";
import Forbidden from "../Components/Forbidden/Forbidden";
import Loader from "../Components/Shared/Loader";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
