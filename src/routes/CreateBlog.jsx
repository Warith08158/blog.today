import React, { useRef, useState } from "react";
import { blogCategories } from "../data/blogCategories";
import { toast } from "react-toastify";
import {
  addPost,
  auth,
  getUserBlogs,
  uploadFile,
  userIDBlogs,
} from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContextProvider";
import { SkeletonLoader } from "./UserProfile";

const CreateBlog = () => {
  const publishDateRef = useRef();
  const statusRef = useRef();
  const blogTitleRef = useRef();
  const metaDescriptionRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const contentFieldRef = useRef();
  const thumbNailRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  //function to check if input consists of only spaces
  const isOnlySpaces = (value) => {
    return value.trim(" ").length === 0;
  };

  const hanldeFormSubmit = async () => {
    const date = publishDateRef.current.innerHTML;
    const status = statusRef.current.value;
    const Title = blogTitleRef.current.value;
    const Description = metaDescriptionRef.current.value;
    const category = categoryRef.current.value;
    const subCategory = subCategoryRef.current.value;
    const content = contentFieldRef.current.value;
    const thumbnail = thumbNailRef.current.files[0];

    //check if title is empty contain only spaces
    if (isOnlySpaces(Title)) {
      toast.error("Title space cannot be empty");
      return;
    }

    //check if description is empty contain only spaces
    if (isOnlySpaces(Description)) {
      toast.error("Summarize your content");
      return;
    }

    //check if content is empty contain only spaces
    if (isOnlySpaces(content)) {
      toast.error("Write your content ");
      return;
    }

    const blogData = {
      blogDate: date,
      blogStatus: status,
      blogTitle: Title,
      BlogDescription: Description,
      BlogCategory: category,
      BlogSubCategory: subCategory,
      BlogContent: content,
      BlogThumbnail: thumbnail
        ? thumbnail.name + "-" + `${auth.currentUser.uid}` + "-" + uuidv4()
        : null,
    };
    buttonRef.current.classList.add("pointer-events-none");

    try {
      //if status is publish
      if (status === "Publish") {
        buttonRef.current.innerHTML = "Publishing...";

        if (blogData.BlogThumbnail) {
          const thumbnailURL = await uploadFile(
            thumbnail,
            blogData.BlogThumbnail
          );
          //update thumbnail url
          blogData.BlogThumbnail = thumbnailURL;
        }

        const userBlogs = await getUserBlogs(auth.currentUser.uid);

        //check if user hass blogs
        if (userBlogs.data()) {
          //if user has blogs
          await addPost("Posts", auth.currentUser.uid, blogData);
          toast.success("Published successfully");
          navigate("/");
        } else {
          //if user doesn't have blogs

          //create space for new blog
          const newBlog = {
            user: auth.currentUser.uid,
          };
          await userIDBlogs(auth.currentUser.uid, newBlog);
          await addPost("Posts", auth.currentUser.uid, blogData);
          toast.success("Published successfully");
          navigate("/");
        }
        return;
      }

      //if status is Draft
      if (status === "draft") {
        buttonRef.current.innerHTML = "Saving...";

        if (blogData.BlogThumbnail) {
          const thumbnailURL = await uploadFile(
            thumbnail,
            blogData.BlogThumbnail
          );
          //update thumbnail url
          blogData.BlogThumbnail = thumbnailURL;
        }

        await addPost("users", auth.currentUser.uid, blogData);
        toast.success("Saved successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      buttonRef.current.classList.remove("pointer-events-none");
      buttonRef.current.innerHTML = "Continue";
    }
  };

  const { isLoading, user } = useUserContext();

  //if loading is true return skeleton loading
  if (isLoading) return <SkeletonLoader />;

  //if loading is false and user is not loggedin navigate to sign in page
  if (!isLoading && !user) return <Navigate to="/sign-in" />;

  //if loading is false and user is loggedin return create page
  return (
    <section className="max-w-2xl mx-auto mb-10">
      <form
        className="w-[95%] mx-auto rounded-lg shadow-lg px-4 mt-6 py-4 bg-gray-50"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold text-gray-800">Create A Blog</h2>

        <div className="mt-6 flex items-center justify-between flex-wrap">
          <PublishDate reference={publishDateRef} />

          {/* status of blog */}
          <StatusInput reference={statusRef} />
        </div>

        <div className="mt-6 flex flex-wrap gap-6">
          {/* title input */}
          <div className="w-full max-w-64">
            <BlogInput
              htmlFor={"Title"}
              label={"Title"}
              type={"Text"}
              name={"Title"}
              id={"Blog-Title"}
              placeholder={"Blog title"}
              reference={blogTitleRef}
            />
          </div>

          {/* Meta Description input */}
          <div className="w-full max-w-64">
            <MetaDescription reference={metaDescriptionRef} />
          </div>
        </div>

        {/* category and subcategories input */}
        <div className="mt-6">
          <Categories referenceA={categoryRef} referenceB={subCategoryRef} />
        </div>

        {/* content area */}
        <div className="mt-6">
          <TextArea reference={contentFieldRef} />
        </div>

        {/* file Input */}
        <div className="mt-6">
          <ThumbNail reference={thumbNailRef} />
        </div>

        {/* post blog button */}
        <div className="flex justify-end">
          <button
            onClick={hanldeFormSubmit}
            ref={buttonRef}
            type="submit"
            className="inline-flex items-center mt-8 py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBlog;

//text are input
export const TextArea = ({ reference }) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor="blog-content"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Content
      </label>
      <textarea
        id="blog-content"
        ref={reference}
        rows="6"
        value={value}
        onChange={handleOnChange}
        maxLength={5000}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What do you want to talk about?"
      ></textarea>
      <p className="mt-2 ms-auto text-xs text-gray-500 dark:text-gray-400">
        {value.length >= 5000
          ? "You have reached the limit"
          : `You have ${5000 - value.length} words left`}
      </p>
    </div>
  );
};

//file input
export const ThumbNail = ({ reference }) => {
  const [url, seturl] = useState(null);
  console.log(url);
  const handleOnChange = (e) => {
    seturl(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <div className={`flex items-center justify-center w-full`}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="multiple_files"
        ></label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="image"
          type="file"
          accept="jpg, jpeg, png, svg"
          ref={reference}
          onChange={handleOnChange}
        />
      </div>

      {url && (
        <div>
          <p className="mt-4 ms-auto text-xs text-gray-500 dark:text-gray-400">
            This image will be used as thumbnail
          </p>
          <img src={url} alt="" className="w-full object-contain mt-2" />
        </div>
      )}
    </div>
  );
};

//publish date
export const PublishDate = ({ reference }) => {
  // Create a new Date object for the current date and time
  const today = new Date();

  // Extract the year, month, and day
  const year = today.getFullYear();
  const monthIndex = today.getMonth(); // Months are zero-indexed (0-11)
  const day = today.getDate();

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the name of the month
  const monthName = monthNames[monthIndex];

  // Format the date as Month Day, Year
  const formattedDate = `${monthName} ${day}, ${year}`;
  return (
    <>
      <p className="block text-sm font-medium text-gray-900">
        Publish Date:{" "}
        <span className="text-gray-400" ref={reference}>
          {" "}
          {formattedDate}
        </span>
      </p>
    </>
  );
};

//status input
export const StatusInput = ({ reference }) => {
  return (
    <div className="max-w-40 flex items-center gap-2">
      <label
        htmlFor={"status"}
        className="block text-sm font-medium text-gray-900"
      >
        Status:
      </label>
      <select
        id="Blog-Status"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-1"
        ref={reference}
      >
        <option defaultValue="publish">Publish</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  );
};

//create blog input for title
export const BlogInput = ({
  htmlFor,
  label,
  type,
  name,
  id,
  placeholder,
  reference,
}) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        ref={reference}
      />
      <div
        id="standard_error_help"
        className="mt-2 text-xs text-red-600 dark:text-red-400"
      ></div>
    </div>
  );
};

//categories
export const Categories = ({ referenceA, referenceB }) => {
  const [value, setValue] = useState("Technology");
  const [subCategoryValue, setSubCategoryValue] = useState(
    blogCategories.find((category) => category.category === value)
      .subCategories[0]
  );

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);

  return (
    <div className="flex gap-6 items-center flex-wrap">
      {/* category */}
      <div id="category" className="relative w-full max-w-64">
        <div className="w-full" onClick={() => setShowCategoryModal(true)}>
          <label
            htmlFor={"Categories"}
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Category
          </label>
          <input
            type={"text"}
            name={"Category"}
            id={"Category"}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full py-2 px-3 cursor-pointer"
            readOnly
            value={value}
            ref={referenceA}
          />
          <div
            id="standard_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          ></div>
        </div>

        {/*category modal */}
        {showCategoryModal && (
          <ul className="absolute z-10 right-0 left-0 space-y-1 bg-white h-40 rounded-lg overflow-y-auto shadow-md py-2">
            {blogCategories.map((category) =>
              value === category.category ? null : (
                <li
                  className="px-3 cursor-pointer py-1 hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                  key={category.category}
                  onClick={() => {
                    setValue(category.category);
                    setSubCategoryValue(
                      blogCategories.find(
                        (blogcategory) =>
                          blogcategory.category === category.category
                      ).subCategories[0]
                    );
                    setShowCategoryModal(false);
                  }}
                >
                  {category.category}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* sub category */}
      <div id="category" className="relative w-full max-w-64">
        <div className="w-full" onClick={() => setShowSubCategoryModal(true)}>
          <label
            htmlFor={"Categories"}
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Subcategory
          </label>
          <input
            type={"text"}
            name={"subCategory"}
            id={"subCategory"}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full py-2 px-3 cursor-pointer"
            readOnly
            value={subCategoryValue}
            ref={referenceB}
          />
          <div
            id="standard_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          ></div>
        </div>

        {/*subcategory modal */}
        {showSubCategoryModal && (
          <ul className="absolute right-0 left-0 space-y-1 bg-white h-40 rounded-lg overflow-y-auto shadow-md py-2">
            {blogCategories
              .find((category) => category.category === value)
              .subCategories.map((subCategory) =>
                subCategoryValue === subCategory ? null : (
                  <li
                    className="px-3 cursor-pointer py-1 hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                    key={subCategory}
                    onClick={() => {
                      setSubCategoryValue(subCategory);
                      setShowSubCategoryModal(false);
                    }}
                  >
                    {subCategory}
                  </li>
                )
              )}
          </ul>
        )}
      </div>
    </div>
  );
};

export const MetaDescription = ({ reference }) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label
        htmlFor="meta-description"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Meta description
      </label>
      <input
        type="text"
        name="meta-description"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2"
        placeholder="Sumarise in 1000 words"
        onChange={handleOnChange}
        value={value}
        ref={reference}
      />
      <div
        id="standard_error_help"
        className="mt-2 text-xs text-red-600 dark:text-red-400"
      ></div>
    </div>
  );
};
