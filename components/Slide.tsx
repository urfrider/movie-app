import React from "react";
import styled from "styled-components/native";
import { StyleSheet, useColorScheme, View } from "react-native";
import { imagePath } from "../util";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image`
  flex: 1;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Description = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Rating = styled(Description)`
  font-size: 12px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 50%;
  margin-left: 15px;
`;

interface ISlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<ISlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: imagePath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Description isDark={isDark}>
              {overview.slice(0, 90) + "..."}
            </Description>
            {voteAverage > 0 && (
              <Rating isDark={isDark}>⭐️{voteAverage}/10</Rating>
            )}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
