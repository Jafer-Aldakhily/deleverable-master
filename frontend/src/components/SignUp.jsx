import React from "react";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/whitelogo.png";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TextInput, Label } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const register = (e) => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      phone: phone,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    axios.post("/api/register", data).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="pb-5 flex flex-col justify-center items-start">
            {/* firstname */}
            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="first name" />
            </div>
            <TextInput
              id="first_name"
              type="text"
              placeholder="First name"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {/* lastname */}
            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="last name" />
            </div>
            <TextInput
              id="last_name"
              type="text"
              placeholder="Last Name"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* username */}
            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setUserName(e.target.value)}
            />

            {/* phone number */}
            <div className="mb-2  text-white ">
              <Label htmlFor="phone" value="phone" />
            </div>
            <TextInput
              id="phone"
              type="number"
              placeholder="Phone"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* email */}
            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="email" />
            </div>
            <TextInput
              id="email4"
              type="email"
              placeholder="Email"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password */}
            <div className="mb-2  text-white">
              <Label htmlFor="password" value="password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              required={true}
              className="my-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* confirm password */}
            <div className="mb-2  text-white">
              <Label htmlFor="confirm password" value="confirm password" />
            </div>
            <TextInput
              id="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              required={true}
              className="my-2"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <button
              onClick={register}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
            >
              Create account
            </button>
          </div>
          <Link to="/login" className="text-white hover:cursor-pointer">
            Already have an account !
          </Link>
        </div>
      </div>
    </div>
  );
}
