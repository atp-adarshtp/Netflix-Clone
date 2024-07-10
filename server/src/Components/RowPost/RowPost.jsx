import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./RowPost.css";
import { imageURL, API_KEY } from "../../constens/constens";
import axios from "../../axios";

function RowPost({ url, title, isSmall }) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        // Handle error appropriately
        console.error('Failed to fetch data', err);
      });
  }, [url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        console.log('Array empty');
      }
    }).catch(err => {
      console.error('Failed to fetch video', err);
    });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            className={isSmall ? "smallPoster" : "poster"}
            alt="poster"
            src={`${imageURL + obj.backdrop_path}`}
          />
        ))}
      </div>
      {urlId.key && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
