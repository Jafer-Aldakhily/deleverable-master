import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const axiosAuth = "Bearer " + token;
    axios.defaults.headers.common["Authorization"] = axiosAuth;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/logout", token).then((response) => {
        console.log(response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
    });
  }, []);
  return <div></div>;
}
