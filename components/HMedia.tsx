import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Rating from "./Rating";

interface IHMediaProps {
  posterPath: string;
  originalTitle: string;
  rating: number;
  fullData: Movie | TV;
}

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia: React.FC<IHMediaProps> = ({
  posterPath,
  originalTitle,
  rating,
  fullData,
}) => {
  const navigation = useNavigation();
  const toDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={toDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 && "..."}
        </Title>
        <Rating rating={rating} />
      </Container>
    </TouchableOpacity>
  );
};

export default HMedia;
