import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/use-http";
import ActionMovies from "./ActionMovies";
import ComedyMovies from "./ComedyMovies";
import Documentaries from "./Documentaries";
import HorrorMovies from "./HorrorMovies";
import MovieDetail from "./MovieDetail";
import OriginalMovies from "./OriginalMovies";
import RomanceMovies from "./RomanceMovies";
import TopRatedMovies from "./TopRatedMovies";
import TrendingMovies from "./TrendingMovies";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

//-----------------------COMPONENT-----------------------//

const MovieList = () => {
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

  const [originalMovies, setOriginalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);

  const [showDetail, setShowDetail] = useState({
    value: undefined,
    isShow: false,
  });
  const [movieDetail, setMovieDetail] = useState();
  const [videoInfo, setVideoInfo] = useState([]);

  // call API for first time
  useEffect(() => {
    getOriginalMovies();
    getTrendingMovies();
    getTopRatedMovies();
    getActionMovies();
    getComedyMovies();
    getHorrorMovies();
    getRomanceMovies();
    getDocumentaries();
  }, []);

  const getOriginalMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchNetflixOriginals}`,
      },
      (response) => {
        setOriginalMovies(response.results);
      }
    );
  };
  const getTrendingMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchTrending}`,
      },
      (response) => {
        setTrendingMovies(response.results);
      }
    );
  };
  const getTopRatedMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchTopRated}`,
      },
      (response) => {
        setTopRatedMovies(response.results);
      }
    );
  };
  const getActionMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchActionMovies}`,
      },
      (response) => {
        setActionMovies(response.results);
      }
    );
  };
  const getComedyMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchComedyMovies}`,
      },
      (response) => {
        setComedyMovies(response.results);
      }
    );
  };
  const getHorrorMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchHorrorMovies}`,
      },
      (response) => {
        setHorrorMovies(response.results);
      }
    );
  };
  const getRomanceMovies = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchRomanceMovies}`,
      },
      (response) => {
        setRomanceMovies(response.results);
      }
    );
  };
  const getDocumentaries = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}${requests.fetchDocumentaries}`,
      },
      (response) => {
        setDocumentaries(response.results);
      }
    );
  };

  // logic call details 
  const onClickDetailMovie = (id) => {
    if (id === showDetail.value && showDetail.value) {
      setShowDetail({ value: null, isShow: false });
    } else {
      setShowDetail({ value: id, isShow: true });
      getDetailMovie(id);
      getVideoTrailer(id);
    }
  };

  const getDetailMovie = (id) => {
    sendTaskRequest(
      {
        url: `${HOST_API}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      },
      (response) => {
        setMovieDetail(response);
      }
    );
  };

  const getVideoTrailer = (id) => {
    sendTaskRequest(
      {
        url: `${HOST_API}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
      },
      (response) => {
        setVideoInfo(response.results);
      }
    );
  };
  return (
    <ContainStyle>
      <OriginalMovies
        originalMovies={originalMovies}
        onClickDetail={onClickDetailMovie}
      />
      <TrendingMovies
        trendingMovies={trendingMovies}
        onClickDetail={onClickDetailMovie}
      />
      <TopRatedMovies
        topRatedMovies={topRatedMovies}
        onClickDetail={onClickDetailMovie}
      />
      <ActionMovies
        ActionMovies={actionMovies}
        onClickDetail={onClickDetailMovie}
      />
      <ComedyMovies
        ComedyMovies={comedyMovies}
        onClickDetail={onClickDetailMovie}
      />
      <HorrorMovies
        HorrorMovies={horrorMovies}
        onClickDetail={onClickDetailMovie}
      />
      <RomanceMovies
        RomanceMovies={romanceMovies}
        onClickDetail={onClickDetailMovie}
      />
      <Documentaries
        Documentaries={documentaries}
        onClickDetail={onClickDetailMovie}
      />
      {showDetail.isShow && (
        <MovieDetail movieDetail={movieDetail} videoInfo={videoInfo} />
      )}
    </ContainStyle>
  );
};

export default MovieList;
