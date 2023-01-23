import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Rating from "./Rating";

interface IVMediaProps {
  posterPath: string;
  title: string;
  overview: string;
  releasedDate?: string;
  rating?: number;
}

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

const UpcomingMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`;

const Column = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const ReleaseDate = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const VMedia: React.FC<IVMediaProps> = ({
  posterPath,
  title,
  releasedDate,
  overview,
  rating,
}) => {
  return (
    <UpcomingMovie>
      <Poster path={posterPath} />
      <Column>
        <Title>{title.length > 30 ? `${title.slice(0, 30)}...` : title}</Title>
        {releasedDate && (
          <ReleaseDate>
            {new Date(releasedDate).toLocaleDateString()}
          </ReleaseDate>
        )}
        {rating && <Rating rating={rating} />}
        <Overview>
          {overview === "" && "Coming Soon"}
          {overview !== "" && overview.length > 140
            ? overview.slice(0, 140) + "..."
            : overview}
        </Overview>
      </Column>
    </UpcomingMovie>
  );
};

export default VMedia;
