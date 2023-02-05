import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function EditProfile() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [showedImage, setShowedImage] = useState("");
  const [image, setImage] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    axios.get(`/api/profile/${userId}`).then((response) => {
      setUserName(response.data.username);
      setEmail(response.data.email);
      setShowedImage(response.data.image);
      console.log(showedImage);
    });
  }, []);
  const update = () => {
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("image", image);
    // console.log(form.get("username"), form.get("email"), form.get("image"));
    axios
      .post(`http://127.0.0.1:8000/api/update/profile/${userId}`, form)
      .then((response) => {
        swal({
          title: "Well Done !",
          text: response.data.message,
          icon: "success",
        });
        navigate("/");
        window.location.reload();
      });
  };
  return (
    <div className="p-52">
      <div className="h-full">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">Admin Profile</span>
              <button
                onClick={update}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </button>
            </div>

            <span className="text-gray-600">
              This information is secret so be careful
            </span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showedImage"
                className="max-w-xs w-32 items-center border"
                src={
                  showedImage.startsWith("http")
                    ? showedImage
                    : `http://localhost:3000/../users/${showedImage}`
                }
                alt=""
                name="showedImage"
              />
            </div>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
            <div className="rounded  shadow p-6">
              <div className="pb-6">
                <label
                  for="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Username
                </label>
                <div className="flex">
                  <input
                    id="username"
                    name="username"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  for="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="text-gray-600 pt-4 block opacity-70">
                  Personal login information of your account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
