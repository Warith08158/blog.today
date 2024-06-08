import React from "react";
import FilterBar from "../components/FilterBar";

const Feed = () => {
  return (
    <section>
      {/* filter blog */}
      <div className="md:hidden">
        <div className="mt-16 w-52 h-8 bg-gray-100 rounded-xl flex items-center">
          <div className="pl-3 text-gray-500">Filter Blog</div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
