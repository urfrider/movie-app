import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  Platform,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Movie, MovieDetails, moviesApi, TV, tvApi, TVDetails } from "../api";
import Poster from "../components/Poster";
import { imagePath } from "../util";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../colors";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
  flex-shrink: 1;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const VideoContainer = styled.View`
  padding: 0px 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? "https://www.imdb.com/title/${data.imdb_id}/"
      : data?.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage + "",
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name="share"
        size={24}
        color={isDark ? "white" : colors.black}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: imagePath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", colors.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
      <VideoContainer>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoButton key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons
              name="logo-youtube"
              size={24}
              color={isDark ? "white" : colors.black}
            />
            <ButtonText>{video.name}</ButtonText>
          </VideoButton>
        ))}
      </VideoContainer>
    </Container>
  );
};

export default Detail;
