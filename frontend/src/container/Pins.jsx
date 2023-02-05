import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Feed,
  PinDetail,
  CreatePin,
  Search,
  Login,
} from "../components";
import ForgetPassword from "../components/ForgetPassword";
import Logout from "../components/Logout";
import ResetPassword from "../components/ResetPassword";
export default function Pins({ user }) {
  const [indexPins, setIndexPins] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/all/pins").then((response) => {
      setIndexPins(response.data.pins);
    });
  }, []);
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed authUser={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="forget/password" element={<ForgetPassword />} />
          <Route path="reset/password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                indexPins={indexPins}
                setIndexPins={setIndexPins}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import { client } from '../client';
// import { feedQuery, searchQuery } from '../utils/data';
// import MasonryLayout from './MasonryLayout';
// import Spinner from './Spinner';

// const Feed = () => {
//   const [pins, setPins] = useState();
//   const [loading, setLoading] = useState(false);
//   const { categoryId } = useParams();

//   useEffect(() => {
//     if (categoryId) {
//       setLoading(true);
//       const query = searchQuery(categoryId);
//       client.fetch(query).then((data) => {
//         setPins(data);
//         setLoading(false);
//       });
//     } else {
//       setLoading(true);

//       client.fetch(feedQuery).then((data) => {
//         setPins(data);
//         setLoading(false);
//       });
//     }
//   }, [categoryId]);
//   const ideaName = categoryId || 'new';
//   if (loading) {
//     return (
//       <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
//     );
//   }
//   return (
//     <div>
//       {pins && (
//         <MasonryLayout pins={pins} />
//       )}
//     </div>
//   );
// };

// export default Feed;
