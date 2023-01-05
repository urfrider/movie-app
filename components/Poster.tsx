import React from "react";
import styled from "styled-components/native";
import { imagePath } from "../util";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface IPosterProps {
  path: string;
}

const Poster: React.FC<IPosterProps> = ({ path }) => {
  return <Image source={{ uri: imagePath(path) }} />;
};

export default Poster;
