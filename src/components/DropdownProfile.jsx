import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";

const DropdownProfile = ({ setSignOut }) => {
  const { user } = useUserContext();
  const pathName = useLocation().pathname;
  console.log(pathName);
  return (
    <div
      id="userDropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700 dark:divide-gray-600"
    >
      <div className="px-4 py-3 text-sm sm:hidden  text-gray-900 dark:text-white">
        <div>{user?.name}</div>
        <div className="font-medium truncate">{user?.email}</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li>
          <Link
            to="/user-profile"
            className={`${
              pathName === "/user-profile"
                ? "bg-gray-100"
                : "bg-transparent hover:bg-gray-50"
            } block px-4 py-2  text-gray-800`}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/manage-blog"
            className={`${
              pathName === "/manage-blog"
                ? "bg-gray-100"
                : "bg-transparent hover:bg-gray-50"
            } block px-4 py-2  text-gray-800`}
          >
            Manage Blog
          </Link>
        </li>
        <li>
          <Link
            to="/create-blog"
            className={`${
              pathName === "/create-blog"
                ? "bg-gray-100"
                : "bg-transparent hover:bg-gray-50"
            } block px-4 py-2  text-gray-800`}
          >
            Create Blog
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <button
          onClick={() => setSignOut(true)}
          type="button"
          className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DropdownProfile;
