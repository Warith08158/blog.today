import React from "react";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
  const user = true;

  if (!user) return <Navigate to="/sign-in" />;
  return <div>UserDashboard</div>;
};

export default UserDashboard;
