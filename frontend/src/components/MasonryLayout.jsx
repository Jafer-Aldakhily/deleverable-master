import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
export default function MasonryLayout({ pins, authUser }) {
  const [pinData, setPinData] = useState(pins);
  // console.log(pinData.length);
  // const fetchMore = () => {
  //   setTimeout(() => {
  //     setPinData(pins);
  //     console.log(pinData.length);
  //   }, 5000);
  // };
  return (
    <div>
      {/* <InfiniteScroll
        dataLength={pinData.length}
        next={fetchMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointObj}
      >
        {pinData?.map((pin) => (
          <Pin key={pin.id} pin={pin} authUser={authUser} />
        ))}
      </Masonry>
      {/* </InfiniteScroll> */}
    </div>
  );
}

// const bottomOfPageRef = useRef(null);

// useEffect(() => {
//   const handleScroll = () => {
//     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
//     const body = document.body;
//     const html = document.documentElement;
//     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
//     const windowBottom = windowHeight + window.pageYOffset;
//     if (windowBottom >= docHeight) {
//       // The user has scrolled to the bottom of the page, so you can trigger an action here
//     }
//   };

//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

// function MyList() {
//   const [items, setItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const bottomOfPageRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
//       const body = document.body;
//       const html = document.documentElement;
//       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
//       const windowBottom = windowHeight + window.pageYOffset;
//       if (windowBottom >= docHeight) {
//         setIsLoading(true);
//         fetchNextBatchOfItems().then(newItems => {
//           setItems([...items, ...newItems]);
//           setIsLoading(false);
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [items]);

//   return (
//     <div>
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))
// }
