import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import userImage from "../assets/0018.jpg";
export default function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5">
      <div className="flex justify-start items-center w-full p-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1 hover:cursor-pointer" />
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none rounded-md"
        />
      </div>
      {localStorage.getItem("token") ? (
        <div className="flex gap-3">
          {/* to={`user-profile/${user?.id}`} when I written the backend code */}
          {/* <Link to={`/user-profile/${user?.id}`} className="hidden md:block">
            <img
              src={user?.image}
              alt="user"
              className="w-14 h-12 rounded-lg"
            />
          </Link> */}
          {/* Tested code */}
          <div class="dropdown">
            {/* <button class="dropbtn">Dropdown</button> */}
            <img
              // src={`../pins/${image}`}
              src={
                user?.image.startsWith("http")
                  ? user?.image
                  : `../users/${user?.image}`
              }
              alt="user"
              className="w-14 h-12 rounded-lg dropbtn"
            />
            {/* <button class="">Dropdown</button> */}
            <div class="dropdown-content">
              <Link
                to={`/user-profile/${user?.id}`}
                className="hidden md:block"
              >
                Your Profile
              </Link>
              <Link to="/logout" className="hidden md:block">
                Logout
              </Link>
              {/* <a href="#">Link 3</a> */}
            </div>
          </div>
          {/* End Tested code */}
          <Link
            to="create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      ) : (
        <div className="flex m-3 mr-5">
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
