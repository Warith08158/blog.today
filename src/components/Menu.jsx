import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import DropdownProfile from "./DropdownProfile";
import SignOutModal from "./SignOutModal";

const Menu = () => {
  const { isLoading, user } = useUserContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [signOut, setSignOut] = useState(false);
  const [avatarIsLoaded, setAvatarIsLoaded] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setOpenDropdown(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* if it is loading */}
          {isLoading && (
            <div
              role="status"
              className="w-10 h-10 flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {/* if user is logged in and is not loading */}
          {user && !isLoading && (
            <div
              className="flex items-center gap-4 relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown((prev) => !prev);
              }}
            >
              {user.avatar ? (
                avatarIsLoaded ? (
                  // if avatar is fully downloaded display avatar
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.avatar}
                    alt="avatar"
                    onLoad={() => setAvatarIsLoaded(true)}
                  />
                ) : (
                  // if avatar is not fully downloaded display skeleton loader
                  <div className="flex-shrink-0">
                    <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-neutral-700 animate-pulse"></span>
                  </div>
                )
              ) : (
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
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
              )}

              <div className="hidden sm:block font-medium dark:text-white">
                <div>{user?.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </div>
              </div>

              {/* drop down */}
              {openDropdown && (
                <div className="absolute right-0 top-16">
                  <DropdownProfile signOut={signOut} setSignOut={setSignOut} />
                </div>
              )}
            </div>
          )}

          {/* if user is not logged in and is not loading */}
          {!user && !isLoading && (
            <Link
              to="/sign-in"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Get started
            </Link>
          )}

          {/* hamburger */}
          {/*  */}
        </div>
      </div>

      {signOut && <SignOutModal setSignOut={setSignOut} />}
    </nav>
  );
};

export default Menu;
