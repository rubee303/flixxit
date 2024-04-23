import React from "react";
import CardSlider from "./CardSlider";

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  // console.log(movies);
   return (
    <div>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="Popular" data={getMoviesFromRange(10, 20)} />
      <CardSlider title="Top Rating" data={getMoviesFromRange(20, 30)} />
      <CardSlider title="UpComing" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="New Realses" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Crime" data={getMoviesFromRange(50, 60)} />
    </div>
  );
};