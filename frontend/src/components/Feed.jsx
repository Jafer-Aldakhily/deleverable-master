import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "../utils/data";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import images from "../utils/data2";
import axios from "axios";
export default function Feed({ authUser }) {
  // Now I will write hard code but I will convert at to a dynamic code later on with backend
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const [backupPins, setBackupPins] = useState();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const filterByCategoryId = (categoryId) => {
    axios.get("/api/pins/" + categoryId).then((response) => {
      setPins(response.data.pins);
      setLoading(false);
    });
  };

  useEffect(() => {
    axios.get("/api/all/pins").then((response) => {
      setBackupPins(response.data.pins);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    setLoading(true);
    if (categoryId) {
      // signle record
      // you need to know you will
      // create a pin in a future when you build a backend
      filterByCategoryId(categoryId);
      // result = pins.filter((category) => category.category_id == categoryId);
      // setPins(result);
      // setLoading(false);
    } else {
      // multiple records
      setLoading(true);
      axios.get("/api/all/pins").then((response) => {
        setPins(response.data.pins);
      });
      setTimeout(() => {
        setPins(backupPins);
        setLoading(false);
      }, 300);
    }
  }, [categoryId]);

  if (loading)
    return (
      <Spinner message={`we are adding new ideas to your ${categoryId}`} />
    );

  return <div>{pins && <MasonryLayout pins={pins} authUser={authUser} />}</div>;
}
