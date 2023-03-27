import React, { useEffect, useState } from "react";
import styled from "styled-components";

//-----------------------STYLE-----------------------//

const PopupStyle = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: black;
`;
const ContainStyle = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 20px 0 40px;
`;
const DesStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;
const TitleStyle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 30px;
  padding: 20px 0;
`;

const YoutubeStyle = styled.div`
  flex: 1;
  cursor: pointer;
`;
const DateStyle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 23px;
`;
const TextDesStyle = styled.div`
  color: white;
`;

const PosterStyle = styled.img`
  flex: 1;
  width: auto;
`;
//-----------------------COMPONENT-----------------------//

const MovieDetail = ({ movieDetail, videoInfo }) => {
  const IMAGE_API = "https://image.tmdb.org/t/p/original";
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    const data = videoInfo.find(
      (item) =>
        item?.site === "YouTube" &&
        (item?.type === "Teaser" || item?.type === "Trailer")
    );
    setVideoKey(data?.key);
  }, [videoInfo]);

  return (
    <PopupStyle>
      <ContainStyle>
        <DesStyle>
          <TitleStyle>
            {movieDetail?.title
              ? movieDetail?.title
              : movieDetail?.original_title}
          </TitleStyle>
          <DateStyle>
            Release Date: {movieDetail?.release_date}
            <br />
            Vote: {movieDetail?.vote_average}/ 10
          </DateStyle>
          <TextDesStyle>{movieDetail?.overview}</TextDesStyle>
        </DesStyle>
        {videoKey ? (
          <YoutubeStyle>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${videoKey}`}
            ></iframe>
          </YoutubeStyle>
        ) : (
          <PosterStyle
            key={movieDetail?.title}
            height="400"
            src={`${IMAGE_API}${
              movieDetail?.poster_path
                ? movieDetail?.poster_path
                : movieDetail?.backdrop_path
            }`}
            alt="item"
          />
        )}
      </ContainStyle>
    </PopupStyle>
  );
};

export default MovieDetail;
