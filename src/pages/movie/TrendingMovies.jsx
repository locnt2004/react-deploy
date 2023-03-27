import React from "react";
import styled from "styled-components";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
  width: 100%;
`;

const ContentStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
`;
const TitleStyle = styled.div`
  color: white;
  font-weight: 700;
  padding: 20px 0;
`;

const PosterStyle = styled.img`
  max-width: 10%;
  height: auto;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
//-----------------------COMPONENT-----------------------//

const TrendingMovies = ({ trendingMovies, onClickDetail }) => {
  const IMAGE_API = "https://image.tmdb.org/t/p/original";

  // render item
  const renderItems = (item, index) => {
    return (
      <PosterStyle
        onClick={() => onClickDetail(item?.id)}
        key={`${item?.title}-${index}`}
        width={"100%"}
        src={`${IMAGE_API}${
          item?.poster_path ? item?.poster_path : item?.backdrop_path
        }`}
        alt="item"
      />
    );
  };
  return (
    <ContainStyle>
      <TitleStyle>Trending</TitleStyle>
      <ContentStyle>
        {trendingMovies?.map((item, index) => renderItems(item, index))}
      </ContentStyle>
    </ContainStyle>
  );
};

export default TrendingMovies;
