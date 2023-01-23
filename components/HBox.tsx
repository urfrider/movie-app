import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import HMedia from "./HMedia";

interface IHBoxProps {
  title: string;
  data: any;
}

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const HBoxSeparator = styled.View`
  width: 30px;
`;

const HBox: React.FC<IHBoxProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HBoxSeparator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""} // URL to default image if none
          title={item.original_title ?? item.original_name}
          rating={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HBox;
