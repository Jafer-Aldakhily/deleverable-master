import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/whitelogo.png";
import { TextInput, Label } from "flowbite-react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";

export default function ResetPassword({ route }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  const resetPassword = () => {
    if (password == confirmPassword) {
      const data = {
        email: location.state,
        password: password,
      };
      console.log(data);
      const baseUrl = `http://127.0.0.1:8000/api${location.pathname}`;

      axios.post(baseUrl, data).then((response) => {
        //   console.log(response.data.status);
        if (response.data.status == 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          //   console.log(response.data.email);
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and confirm password should be the same",
      });
    }
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
              <Label htmlFor="email4" value="New password" />
            </div>
            <TextInput
              id="email4"
              type="password"
              placeholder="Password"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-2  text-white ">
              <Label htmlFor="email4" value="Confirm password" />
            </div>
            <TextInput
              id="email4"
              type="password"
              placeholder="Confirm password"
              required={true}
              // icon={HiMail}
              className="my-2"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={resetPassword}
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
