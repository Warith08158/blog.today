import React from "react";
import Input from "../components/Input";

const CreateBlog = () => {
  return (
    <section className="max-w-2xl mx-auto mb-10">
      <form className="w-[95%] mx-auto rounded-lg shadow-lg px-4 mt-6 py-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Create A Blog</h2>

        <div className="mt-6 flex items-center justify-between flex-wrap">
          <p className="block mb-2 text-sm font-medium text-gray-900">
            Publish Date: <span className="text-gray-400"> 12th june 2024</span>
          </p>

          {/* status of blog */}
          <div className="max-w-40 flex items-center gap-2">
            <label
              htmlFor={"statu"}
              className="block text-sm font-medium text-gray-900"
            >
              Status:
            </label>
            <input
              type={"text"}
              name={"Status"}
              id={"Blog-Status"}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-1"
            />
            <div
              id="standard_error_help"
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            ></div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-6">
          {/* title input */}
          <div className="w-full max-w-64">
            <Input
              htmlFor={"Title"}
              label={"Title"}
              type={"Text"}
              name={"Title"}
              id={"Blog-Title"}
              placeholder={"Blog title"}
              onChange={() => console.log("changing")}
              value={"20"}
            />
          </div>
          {/* category input */}
          <div className="w-full max-w-64">
            <Input
              htmlFor={"Category"}
              label={"Category"}
              type={"Text"}
              name={"Category"}
              id={"Blog-Category"}
              placeholder={"Blog Category"}
              onChange={() => console.log("changing")}
              value={"20"}
            />
          </div>
          {/* subcategory input */}
          <div className="w-full max-w-64">
            <Input
              htmlFor={"Subcategory"}
              label={"Subcategory"}
              type={"Text"}
              name={"Subcategory"}
              id={"Blog-Subcategory"}
              placeholder={"Blog Subcategory"}
              onChange={() => console.log("changing")}
              value={"20"}
            />
          </div>

          {/* Meta Description input */}
          <div className="w-full max-w-64">
            <Input
              htmlFor={"MetaDescription"}
              label={"Meta Description"}
              type={"Text"}
              name={"MetaDescription"}
              id={"Meta-Description"}
              placeholder={"summarize your blog in 200 words"}
              onChange={() => console.log("changing")}
            />
          </div>
        </div>

        {/* content area */}
        <div className="mt-6">
          <TextArea />
        </div>

        {/* file Input */}
        <div className="mt-6">
          <FileInput />
        </div>

        {/* post blog button */}
        <div className="flex justify-end">
          <button className="inline-flex items-center mt-8 py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg">
            Post blog
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateBlog;

export const TextArea = () => {
  return (
    <>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Content
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your content here..."
      ></textarea>
    </>
  );
};

export const FileInput = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG or JPG (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};
