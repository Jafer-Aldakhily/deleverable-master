import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import logo from "../assets/darklogo.png";
import userImage from "../assets/0018.jpg";
import Pins from "./Pins";
import axios from "axios";
import EditProfile from "../components/EditProfile";
export default function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
  const [user, setUser] = useState();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("token", token);
    axios.post("/api/loggedin", form).then((response) => {
      setUser(response.data.user);
    });
  }, []);

  return (
    <div className="flex bg-gray-100 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        {/* This is a mobile sidebar needs 
      user={user && user} 
      now I wrote a static user data
      => this when I wrote backend code 
      without closeToggle={setToggleSidebar} 
      => this just for desktop sidebar */}
        {user && <Sidebar user={user} />}
      </div>

      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {/* 
      It will create like that 
      to={`user-profile/${user?.id}`} 
      */}
          <Link to={`user-profile/:userId`}>
            <img src={userImage} alt="user-image" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {/* 
            This is a desktop sidebar 
            needs user={user && user} 
            now I wrote a static user data
            => this when I wrote backend code 
            and closeToggle={setToggleSidebar} 
            */}
            {user && <Sidebar user={user} closeToggle={setToggleSidebar} />}
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-scroll" ref={scrollRef}>
        <Routes>
          <Route
            path="user-profile/:userId"
            element={<UserProfile authUser={user} />}
          />
          <Route path="/*" element={<Pins user={user} />} />
          <Route
            path="user-profile/:userId/edit/profile/:userId"
            element={<EditProfile />}
          />
          {/* <Pins user={user && user}/> => in future with backend */}
        </Routes>
      </div>
    </div>
  );
}
