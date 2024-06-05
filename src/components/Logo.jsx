import React from "react";
import { FaBlog } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <FaBlog className="text-2xl" />
      <span className="text-xl font-medium">Blog.today</span>
    </div>
  );
};

export default Logo;
