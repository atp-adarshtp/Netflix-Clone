import React, { useEffect, useState } from "react";
import { API_KEY, imageURL } from "../../constens/constens";
import "./Banner.css";
import axios from "../../axios";

function Banner() {
  const [movies, setMovie] = useState();
  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMovie(response.data.results[0]);
      });
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${movies ? imageURL + movies.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movies ? movies.title : ""}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movies ? movies.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
