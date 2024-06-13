import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContextProvider";
import { SkeletonLoader } from "./UserProfile";
import { v4 as uuidv4 } from "uuid";

const ManageBlog = () => {
  const { isLoading, user, blogs } = useUserContext();

  //if loading is true return skeleton loading
  if (isLoading) return <SkeletonLoader />;

  //if loading is false and user is not loggedin navigate to sign in page
  if (!isLoading && !user) return <Navigate to="/sign-in" />;

  //if loading is false and user is loggedin return manage blog page

  //if user doesnt have any post
  if (!user?.blogsField || !blogs) return <div>Youu Do not have any posts</div>;

  console.log(user?.blogsField);

  return (
    <section className="w-[95%] mx-auto rounded-lg shadow-lg px-4 mt-6 py-4 bg-gray-50">
      {/* if user has draft blogs */}
      {user?.blogsField && (
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800">Drafts</h2>
          <div className="mt-4 py-4 border-b border-t items-start grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {user?.blogsField.map((blog) => (
              <div
                className="border p-4 border-gray-300 rounded-lg bg-gray-100"
                key={uuidv4()}
              >
                <Blog
                  title={blog.blogTitle}
                  category={blog.BlogCategory}
                  content={blog.BlogContent}
                  description={blog.BlogDescription}
                  subCategory={blog.BlogSubCategory}
                  thumbnail={blog.BlogThumbnail}
                  date={blog.blogDate}
                  status={blog.blogStatus}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* if user has blogs */}
      {blogs && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800">Published posts</h2>
        </div>
      )}
    </section>
  );
};

export default ManageBlog;

export const Blog = ({
  title,
  category,
  content,
  description,
  subCategory,
  thumbnail,
  date,
  status,
}) => {
  return (
    <div className="w-full h-full space-y-1">
      <p>{date}</p>
      <div className="flex items-center gap-3 flex-wrap">
        <p className="bg-orange-50 p-2 rounded-lg">#{category}</p>
        <p className="bg-green-50 p-2 rounded-lg">#{subCategory}</p>
      </div>
      <h4 className="text-xl font-medium text-gray-600">
        {/* capitalize the first letter of the title */}
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h4>
      {/* description */}
      <p className="text-lg text-gray-700">{description}</p>
      {/* content */}
      <p className="text-sm text-gray-600">{content}</p>
      {/* thumbnail */}
      <div className="mt-2">
        {" "}
        {thumbnail && <Thumnail source={thumbnail} />}
      </div>
      {/* pubilsh or continue editing */}
      <div className="flex items-end justify-between flex-wrap">
        <button className="mt-2 bg-gray-900 px-6 text-sm py-2 rounded-lg text-white cursor-pointer">
          Publish
        </button>
        <p className="text-sm text-gray-700 underline cursor-pointer">
          Continue Editing
        </p>
      </div>
    </div>
  );
};

export const Thumnail = ({ source }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnload = () => {
    setIsLoading(false);
  };
  return (
    <div className="w-full mt-6 h-72">
      <img
        src={source}
        alt="img"
        className={isLoading ? null : "object-cover w-full h-full rounded-md"}
        onLoad={handleOnload}
      />
      {isLoading && (
        <div className="w-full h-full bg-gray-50 rounded-md animate-pulse"></div>
      )}
    </div>
  );
};
