import React from "react";
import styled from "styled-components/native";

interface IVotesProps {
  rating: number;
}

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  font-size: 10px;
`;

const Rating: React.FC<IVotesProps> = ({ rating }) => {
  return (
    <Text>{rating > 0 ? `⭐️${rating.toFixed(1)}/10` : "Coming Soon"}</Text>
  );
};

export default Rating;
