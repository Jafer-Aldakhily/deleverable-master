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
export default function MasonryLayout({ pins }) {
  // console.log(pins.length);
  const [pinData, setPinData] = useState(pins);
  console.log(pinData.length);
  const fetchMore = () => {
    setTimeout(() => {
      setPinData(pins);
      console.log(pinData.length);
    }, 5000);
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={pinData.length}
        next={fetchMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Masonry
          className="flex animate-slide-fwd"
          breakpointCols={breakpointObj}
        >
          {pinData?.map((pin) => (
            <Pin key={pin.id} pin={pin} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
