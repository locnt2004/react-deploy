import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import Banner from "../banner/Banner";

import useHttp from "../../hooks/use-http";
import MovieList from "../movie/MovieList";

function Browse() {
  const HOST_API = "https://api.themoviedb.org/3";
  const API_KEY = "7f18648ed2fdf6d1d067522c8dc9bb10";
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };
  const { sendRequest: sendTaskRequest } = useHttp();
  const [banner, setBanner] = useState();

  // call api for first time
  useEffect(() => {
    getBanner();
  }, []);

  const getBanner = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchTrending}`,
      },
      (response) => {
        const bannerItem =
          response.results[
            Math.floor(Math.random() * response.results.length - 1)
          ];
        setBanner(bannerItem);
      }
    );
  };

  return (
    <div className="back-bg">
      <NavBar />
      <Banner banner={banner} />
      <MovieList />
    </div>
  );
}

export default Browse;
