import React, { useState } from "react";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/whitelogo.png";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TextInput, Label } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { SocialIcon } from "react-social-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { LoginSocialFacebook } from "reactjs-social-login";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

// facebook Id = 1318792195582496
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    const data = {
      email: email,
      password: password,
    };

    axios.post("/api/login", data).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
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
        title: "Welcome back",
      });
      navigate("/");
    });
  };

  // social media login functions-------------------
  const googleLoginFun = (response) => {
    // name = fullname which means username
    // to get the data from google res
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    // destruct the data object
    const { given_name, family_name, name, sub, picture, email } = userObject;
    // assign to variable to send with the request
    const data = {
      first_name: given_name,
      last_name: family_name,
      name: name,
      email: email,
      image: picture,
      google_id: sub,
    };
    // the req to the end-point
    axios.post("/api/googleLogin", data).then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        console.log(res);
      }
    });
  };

  // Facebook Login
  const FacebookLoginFun = (response) => {
    // name = fullname which means username
    // assign the data from the facebook res to variable to send with the request
    console.log(response);
    const data = {
      first_name: response.first_name,
      last_name: response.last_name,
      name: response.name,
      email: response.email,
      image: response.picture.data.url,
      facebook_id: response.id,
    };

    axios.post("/api/facebookLogin", data).then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        console.log(res);
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
          <div className="p-1">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="pb-5 flex flex-col justify-center items-start">
            <div className="mb-2  text-white ">
              {/* <Label htmlFor="email4" value="Your email" /> */}
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
            <div className="mb-2  text-white">
              {/* <Label htmlFor="password" value="Your password" /> */}
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              required={true}
              className="my-2"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
            >
              Login
            </button>
          </div>
          <div className="shadow-2xl mb-3">
            <div className="flex">
              {/* Google Login Button */}
              <GoogleLogin
                onSuccess={googleLoginFun}
                onError={() => {
                  console.log("Login Failed");
                }}
                type="icon"
              />
              {/* Google Login Button */}

              {/* Facebook Login Button */}
              <LoginSocialFacebook
                appId="1318792195582496"
                onResolve={(response) => FacebookLoginFun(response.data)}
                onReject={(error) => {
                  console.log(error);
                }}
              >
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-2 rounded-sm 
      cursor-pointer mb-3 ml-3"
                >
                  <FontAwesomeIcon icon={faFacebook} className="fa-xl" />
                </button>
              </LoginSocialFacebook>
              {/* Facebook Login Button */}
            </div>
          </div>
          <Link to="/register" className="text-white hover:cursor-pointer">
            Create account !
          </Link>
          <br />
          <Link
            to="/forget/password"
            className="text-white hover:cursor-pointer"
          >
            Forget Password !
          </Link>
        </div>
      </div>
    </div>
  );
}
