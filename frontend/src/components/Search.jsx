import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";
import axios from "axios";

// indexPins refer to pins in pins component I sent it as props
export default function Search({ searchTerm }) {
  const [pins, setPins] = useState([]);
  const [allPins, setAllPins] = useState();
  const [loading, setLoading] = useState(true);
  // const [allpins, setAllpins] = useState(indexPins);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/all/pins").then((response) => {
      setPins(response.data.pins);
      setAllPins(response.data.pins);
      setLoading(false);
    });
  }, []);

  // search with wihte spaces
  const validate = (inputText) => {
    setSearch("#" + inputText + "#");
    const result = pins.filter((pin) =>
      pin.title.toLowerCase.includes(inputText.toLowerCase())
    );
  };
  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/all/pins/${searchTerm.toLowerCase()}`)
        .then((response) => {
          setPins(response.data.pins);
          console.log(pins);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios.get("http://127.0.0.1:8000/api/all/pins").then((response) => {
        setPins(response.data.pins);
        setAllPins(response.data.pins);
        // console.log(response.data.pins);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for a pin..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found !</div>
      )}
    </div>
  );
}
