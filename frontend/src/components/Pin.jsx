import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
// window.Swal = swal;

// import users from "../utils/data3";

// import { client, urlFor } from '../client';

const Pin = ({ pin, authUser }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { user, image, id, destination } = pin;
  // console.log(pin);
  const deletePin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8000/api/delete/pin/${id}`)
          .then((response) => {
            Swal.fire("Deleted!", response.data.message, "success");
          })
          .then(() => {
            window.location.reload();
          });
      }
    });
    // /delete/pin/{id}
    // client
    //   .delete(id)
    //   .then(() => {
    //     window.location.reload();
    //   });
  };

  let alreadySaved = pin?.save === "Morad" ? true : false;

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    console.log(authUser);
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      const data = {
        user_id: authUser.id,
        pin_id: id,
      };
      axios
        .post("http://127.0.0.1:8000/api/save/pin", data)
        .then((response) => {
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img
            className="rounded-lg w-full "
            src={`../pins/${image}`}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`../pins/${image}`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {parseInt(pin?.user_id) === parseInt(authUser?.id) ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(id);
                    }}
                    className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                    <AiTwotoneDelete />
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      {/* <Link to={`/user-profile/${posted_by?._id}`} className="flex gap-2 mt-2 items-center"> */}
      <Link
        to={`/user-profile/${user?.id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            user?.image.startsWith("http")
              ? user?.image
              : `../users/${user?.image}`
          }
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{user?.username}</p>
      </Link>
    </div>
  );
};

export default Pin;
