import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}

export default Loader;
