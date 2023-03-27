import React, { useRef, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/use-http";
import MovieDetail from "../movie/MovieDetail";
//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 20px 0;
  min-height: calc(100vh - 60px);
`;
const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
  width: 50%;
  margin: 0 auto;
  background: white;
`;

const SearchResultStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 20px;
`;
const ControlStyle = styled.div`
  input {
    font: inherit;
    padding: 0.35rem;
    border-radius: 4px;
    background-color: #f0f0f0;
    border: 1px solid #c1d1d1;
    display: block;
    width: 100%;
    font-size: 1.25rem;
  }
`;
const ButtonsStyle = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
const ButtonStyle = styled.button`
  background: rgba(96, 96, 96, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;
const PosterStyle = styled.img`
  max-width: 100%;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const TextStyle = styled.div`
  color: white;
  font-weight: 700;
`;
//-----------------------COMPONENT-----------------------//

const SearchForm = () => {
  const HOST_API = "https://api.themoviedb.org/3";
  const API_KEY = "7f18648ed2fdf6d1d067522c8dc9bb10";
  const IMAGE_API = "https://image.tmdb.org/t/p/original";

  const [searchText, setSearchText] = useState("");
  const { sendRequest: sendTaskRequest } = useHttp();
  const [searchResult, setSearchResult] = useState("");
  const [showDetail, setShowDetail] = useState({
    value: undefined,
    isShow: false,
  });
  const [movieDetail, setMovieDetail] = useState();
  const [videoInfo, setVideoInfo] = useState([]);

  const onClickSearch = () => {
    sendTaskRequest(
      {
        url: `${HOST_API}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`,
      },
      (response) => {
        setSearchResult(response.results);
      }
    );
  };

  // render item in results

  const renderItems = (item) => {
    return (
      <PosterStyle
        onClick={() => onClickDetail(item?.id)}
        key={`${item?.title}-${item?.id}`}
        width={"100%"}
        src={`${IMAGE_API}${
          item?.poster_path ? item?.poster_path : item?.backdrop_path
        }`}
        alt="item"
      />
    );
  };

  // call show detail
  const onClickDetail = (id) => {
    if (id === showDetail.value && showDetail.value) {
      setShowDetail({ value: null, isShow: false });
    } else {
      setShowDetail({ value: id, isShow: true });
      getDetailMovie(id);
      getVideoTrailer(id);
    }
  };

  // call API getDetailMovie
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

  // call API getVideoTrailer
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

  // reset all form
  const onClickReset = () => {
    setSearchText("");
    setSearchResult([]);
  };

  return (
    <ContainStyle>
      <FormStyle>
        <ControlStyle>
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </ControlStyle>
        <hr></hr>
        <ButtonsStyle>
          <ButtonStyle onClick={() => onClickReset()}>Reset</ButtonStyle>

          <ButtonStyle onClick={() => onClickSearch()}>Search</ButtonStyle>
        </ButtonsStyle>
      </FormStyle>

      {searchResult && searchResult.length && (
        <>
          <TextStyle> Search Result</TextStyle>
          <SearchResultStyle>
            {searchResult?.map((item) => renderItems(item))}
          </SearchResultStyle>
        </>
      )}
      {showDetail.isShow && (
        <MovieDetail movieDetail={movieDetail} videoInfo={videoInfo} />
      )}
    </ContainStyle>
  );
};

export default SearchForm;
