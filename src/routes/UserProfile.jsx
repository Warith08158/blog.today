import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { LuDot } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { FaCamera } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "react-toastify";
import { auth, updateUser } from "../firebase";

const UserProfile = () => {
  const { isLoading, user } = useUserContext();

  //if loading is true return skeleton loading
  if (isLoading) return <SkeletonLoader />;

  //if loading is false and user is not loggedin navigate to sign in page
  if (!isLoading && !user) return <Navigate to="/sign-in" />;

  //if loading is false and user is loggedin return dashbord
  if (!isLoading && user)
    return (
      <section className="max-w-2xl mx-auto">
        {/* title */}
        <h4
          id="profile-information"
          className="mt-10 text-2xl font-bold text-gray-800"
        >
          Profile Information
        </h4>

        {/* profile-user-dashboard */}
        <div id="dashboard-user-name" className="mt-4 flex items-center gap-2">
          <p className="text-gray-400 font-medium text-md">Profile </p>
          <span>
            <LuDot className="text-gray-500" />
          </span>{" "}
          <p className="text-gray-400 font-medium text-md">User </p>
          <span>
            <LuDot className="text-gray-500" />
          </span>
          <p className="text-md font-semibold text-gray-600"> {user?.name}</p>
        </div>

        {/* User Images */}
        <UserImages />

        {/* user bio */}
        <div className="mt-4">
          <p className="text-md text-gray-700 flex items-center gap-1">
            {user.bio ? user.bio : "A bio says more about you"}
            <FaPencilAlt className="text-sm" />
          </p>
        </div>

        {/* social media links */}
        <h5 className="mt-4 text-lg font-semibold text-gray-800">
          Social Media Links
        </h5>
        <ul className="mt-3 text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <FaFacebookF className="text-gray-600 text-md" />
            Facebook
          </li>
          <li className="flex items-center gap-2">
            <FaSquareInstagram className="text-gray-600 text-md" />
            Instagram
          </li>
          <li className="flex items-center gap-2">
            <FaLinkedinIn className="text-gray-600 text-md" />
            LinkedIn
          </li>
          <li className="flex items-center gap-2">
            <ImTwitter className="text-gray-600 text-md" />
            Twitter
          </li>
        </ul>
      </section>
    );
};

export default UserProfile;

//profile skeleton loader
export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse max-w-2xl mx-auto">
      <div
        id="profile-information"
        className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mt-10"
      ></div>
      <div
        id="dashboard-user-name"
        className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[40%] max-w-48 mt-4"
      ></div>
      <div
        id="user-images"
        className="h-72 bg-gray-200 dark:bg-gray-700 w-full rounded-lg mt-10"
      ></div>
    </div>
  );
};

export const UserImages = () => {
  const { user } = useUserContext();
  return (
    <div
      id="user-images"
      className="h-72 w-full rounded-md mt-10 flex items-center justify-center"
    >
      {/* cover photo */}
      <div className="w-full h-full bg-gray-100 relative rounded-md">
        {user?.coverPhoto ? (
          <img src="" alt="" />
        ) : (
          <svg
            className="w-full h-full object-contain text-gray-200 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}

        {/* avatar photo */}
        {user?.avatar ? (
          <img src="" alt="" />
        ) : (
          <div className="absolute left-4 bottom-4 flex items-center justify-center">
            <div className="rounded-full w-28 h-28 shadow-md border border-white flex items-center justify-center bg-gray-100">
              <svg
                className="w-20 h-20 object-contain text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <FaCamera className="absolute -right-[0.01rem] bottom-3 text-2xl text-gray-700" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <UserName />
          <p className="text-md text-gray-700 leading-8">{user?.email}</p>
        </div>

        <FaCamera className="absolute right-4 bottom-4 text-2xl text-gray-700" />
      </div>
    </div>
  );
};

export const UserName = () => {
  const { user } = useUserContext();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name);
  let previousName = user?.name;

  //edit pencil is clicked
  const editName = () => {
    setEdit(true);
  };

  //change name input
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  //funtion to check if value contain only spaces, returns true if yes
  const isOnlySpaces = (value) => {
    return value.trim(" ").length === 0;
  };

  //mark button is clicked
  const updateName = () => {
    //check if name is empty
    if (isOnlySpaces(name)) {
      setName(previousName);
      setEdit(false);
      return;
    }
    //check if name is the same as previous name
    if (name === previousName) {
      setEdit(false);
      return;
    }

    //check if name is less than five characters
    if (name.length < 5) {
      toast.error("atleast five characters");
      return;
    }

    //check if name is greater than twenty characters
    if (name.length > 20) {
      toast.error("atmost 20 characters");
      return;
    }
    setEdit(false);

    //update user name in firestore
    updateUser(auth.currentUser.uid, "name", name)
      .then((message) => toast.success(message))
      .catch((err) => toast.error("an error occured"));
  };
  return (
    <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
      {edit ? (
        <div className="w-full max-w-56">
          <input
            onChange={handleChangeName}
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:border-white block w-full p-2 text-2xl"
            value={name}
          />
        </div>
      ) : (
        user?.name
      )}
      {edit ? (
        <IoMdCheckmark
          className="text-base cursor-pointer"
          onClick={updateName}
        />
      ) : (
        <FaPencilAlt className="text-base cursor-pointer" onClick={editName} />
      )}
    </div>
  );
};
