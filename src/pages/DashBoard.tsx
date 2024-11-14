import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { userFetches } from "../HttpServices/fetches";

const Links = [
  {
    link: "/dashboard/",
    name: "sensors",
  },
  {
    link: "/dashboard/admin",
    name: "admin",
  },
  {
    link: "/dashboard/analytics",
    name: "analytics",
  },
];

const Dashboard = () => {


  const location = useLocation();
  // console.log(`location==>`,location);


  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-blue-300 w-64 h-screen fixed left-0 top-0">
        <nav className="flex flex-col px-4 py-8 space-y-4">
          {Links.map(({ link, name }) => (
            <Link
              key={link}
              to={link}
              className={`block px-4 py-2 rounded-md hover:bg-gray-700 ${
                location.pathname === link ? "bg-blue-500 text-white" : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
