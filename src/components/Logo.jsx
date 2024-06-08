import React from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-1">
      <FaBlog className="text-2xl" />
      <span className="text-xl font-medium">Blog.today</span>
    </Link>
  );
};

export default Logo;
