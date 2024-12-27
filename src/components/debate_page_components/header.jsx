import React from "react";

const Header = ({ title }) => {
  return (
    <div className="bg-[rgba(99,157,204,0.55)] text-[#ffffff] font-bold Roboto p-4 rounded text-center">
      <h1 className="text-3xl text-shadow-sm">
        {title}
      </h1>
    </div>
  );
};

export default Header;
