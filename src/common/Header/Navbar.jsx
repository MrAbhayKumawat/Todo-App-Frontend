import React from "react";
import { IoIosLogOut } from "react-icons/io";

import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const navgate = useNavigate()
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const username = userdata?.name;

  const handleLogout = () => {
    Cookies.remove("token")
    localStorage.clear()
    navgate("/login")

    toast.success("Logout successfully")

  }
  return (
    <nav className="w-full border-b-2 border-[#9E78CF] flex sm:justify-around justify-between p-2 py-3 max-[635px]:px-5 items-center">
      <dv>
        <h1 className="text-2xl font-bold tracking-wide">Todos</h1>
      </dv>
      <div className="hidden sm:block">
      <div className="flex items-center gap-x-1 text-lg font-semibold">
        <h1><CgProfile/></h1>
        <h1>{username}</h1>
      </div>
    </div>
      <div className="flex items-center gap-x-1 text-lg font-semibold cursor-pointer" onClick={handleLogout}>
        <h1>Logout</h1>
        <IoIosLogOut />
      </div>
    </nav>
  );
};

export default Navbar;
