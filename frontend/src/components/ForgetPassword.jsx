import React, { useState } from "react";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/whitelogo.png";
import { TextInput, Label } from "flowbite-react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  // const navigation = useNavigation();
  const navigate = useNavigate();
  const checkEmail = () => {
    const data = {
      email: email,
    };
    axios.post(`/api/forget/password`, data).then((response) => {
      //   console.log(response.data.status);
      if (response.data.status == 200) {
        // Swal.fire("Good job!", response.data.message, "success");
        const email = response.data.email;
        navigate("/reset/password", { state: email });
        // navigation.navigate("/reset/password", response.data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
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
            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="Your email" />
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
            <button
              onClick={checkEmail}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
            >
              Send email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
