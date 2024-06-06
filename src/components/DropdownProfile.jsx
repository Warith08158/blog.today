import React from "react";
import { Link } from "react-router-dom";

const DropdownProfile = ({ setSignOut }) => {
  return (
    <div
      id="userDropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700 dark:divide-gray-600"
    >
      <div className="px-4 py-3 text-sm sm:hidden  text-gray-900 dark:text-white">
        <div>Bonnie Green</div>
        <div className="font-medium truncate">name@flowbite.com</div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="avatarButton"
      >
        <li>
          <Link
            to="/user-dashboard"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/manage-blog"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Manage Blog
          </Link>
        </li>
        <li>
          <Link
            to="/create-blog"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
