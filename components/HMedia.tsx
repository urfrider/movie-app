import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Rating from "./Rating";

interface IHMediaProps {
  posterPath: string;
  title: string;
  rating: number;
}

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia: React.FC<IHMediaProps> = ({ posterPath, title, rating }) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {title.slice(0, 12)}
        {title.length > 12 && "..."}
      </Title>
      <Rating rating={rating} />
    </Movie>
  );
};

export default HMedia;
