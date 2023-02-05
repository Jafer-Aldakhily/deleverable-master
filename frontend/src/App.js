import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './container/Home'
import axios from 'axios'
// To setup axios with laravel snactum
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.withCredentials = true;
export default function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<SignUp />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

// backup
// axios.get("/sanctum/csrf-cookie").then((response) => {
//   axios.post("/api/login", auth_login).then((response) => {
//     const token = response.data.token;
//     localStorage.setItem("token", token);
//     console.log(response.data.message);
//     navigate("/");
//   });
// });