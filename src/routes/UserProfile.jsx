import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

const UserProfile = () => {
  const { isLoading, user } = useUserContext();

  //if loading is true return skeleton loading
  if (isLoading) return <h2>Loading...</h2>;

  //if loading is false and user is not loggedin navigate to sign in page
  if (!isLoading && !user) return <Navigate to="/sign-in" />;

  //if loading is false and user is loggedin return dashbord
  if (!isLoading && user) return <div>this is dashboard page</div>;
};

export default UserProfile;
