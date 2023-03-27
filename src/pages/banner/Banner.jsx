import React from "react";
import styled from "styled-components";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 50px;
  left: 20px;
  gap: 10px;
`;
const TitleStyle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 40px;
  padding: 20px 0;
`;
const ButtonsStyle = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonStyle = styled.button`
  background: rgba(96, 96, 96, 0.8);
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

`;
const TextDesStyle = styled.div`
  color: white;
  max-width: 30%;
`;
//-----------------------COMPONENT-----------------------//

const Banner = ({ banner }) => {
  const IMAGE_API = "https://image.tmdb.org/t/p/original";

  return (
    <ContainStyle>
      <img
        width={"100%"}
          
        src={`${IMAGE_API}${banner?.backdrop_path}`}
        alt="banner"
      />
      <ContentStyle>
        <TitleStyle>{banner?.title}</TitleStyle>
        <ButtonsStyle>
          <ButtonStyle>Play</ButtonStyle>
          <ButtonStyle>My list</ButtonStyle>
        </ButtonsStyle>
        <TextDesStyle>{banner?.overview}</TextDesStyle>
      </ContentStyle>
    </ContainStyle>
  );
};

export default Banner;
