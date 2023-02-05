import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { GoogleLogout } from 'react-google-login';

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import usersData from "../utils/data3";
import images from "../utils/data2";
import axios from "axios";
// user demo image
import uImg from "../assets/0018.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = ({ authUser }) => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [createdPins, setCreatedPins] = useState();
  const [savedPins, setSavedPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  // useEffect(() => {
  //   axios
  //     .post("http://127.0.0.1:8000/api/user/profile/" + userId)
  //     .then((response) => {
  //       setUser(response.data.user);
  //       setcreatedPins(response.data.user_pins);
  //       setPins(response.data.user_pins);
  //       setSavedPins(response.data.user_saved_pins);
  //     });
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    // const form = new FormData();
    // form.append("id", userId);
    axios
      .post("http://127.0.0.1:8000/api/user/profile/" + userId)
      .then((response) => {
        setUser(response.data.user);
        setCreatedPins(response.data.user_pins);
        setSavedPins(response.data.user_saved_pins);
        setPins(response.data.user_pins);
      });
    // console.log(userId);
    // const result = usersData.filter((user) => user.id == userId);
    // setUser(result[0]);
    // console.log(user);
  }, []);

  const setPinsCreated = () => {
    setTimeout(() => {
      setPins(createdPins);
      setLoading(false);
    }, 100);
  };

  const setPinsSaved = () => {
    setTimeout(() => {
      setPins(savedPins);
      setLoading(false);
    }, 100);
  };

  useEffect(() => {
    if (text === "Created") {
      setLoading(true);
      setPinsCreated();
    } else {
      setLoading(true);
      setPinsSaved();
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  if (loading) return <Spinner message="Loading pins..." />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://images.unsplash.com/photo-1548197253-652ffe79752c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={
                user?.image.startsWith("http")
                  ? user?.image
                  : `../users/${user?.image}`
              }
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user?.username}
          </h1>
          <p className="font-bold  text-center mt-3">{user?.phone_number}</p>
          {parseInt(userId) === authUser?.id ? (
            <>
              <div className="absolute top-0 z-1 right-0 p-2">
                <Link
                  type="button"
                  to={`edit/profile/${authUser?.id}`}
                  className={`bg-primary mr-4 text-2xl text-white font-bold p-2 rounded-full w-20 outline-none`}
                >
                  {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
          {/* <div className="absolute top-0 z-1 right-0 p-2">

            {userId === User.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div> */}
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        {pins?.length > 0 && (
          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>
        )}

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
