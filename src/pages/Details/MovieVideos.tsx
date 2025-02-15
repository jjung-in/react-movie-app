import styled from "styled-components";
import { Video } from "../../types/movie.type";
import YouTube from "react-youtube";

interface Props {
  videos: Video[];
}

const videoOptions = {
  width: "350",
  height: "197",
  playerVars: {
    autoplay: 0,
    rel: 0,
  },
};

const MovieVideos = ({ videos }: Props) => {
  const trailerVideos = videos.filter((video) => video.type === 'Trailer');

  return (
    <S.VideosWrapper>
      <S.SubTitle>VIDEOS</S.SubTitle>
      <S.VideoList>
        {trailerVideos.map((video) => (
          <S.VideoItem key={video.id}>
            <YouTube
              videoId={video.key}
              opts={videoOptions}
              onEnd={(e: { target: { stopVideo: (arg0: number) => void } }) => {
                e.target.stopVideo(0);
              }}
            />
          </S.VideoItem>
        ))}
      </S.VideoList>
    </S.VideosWrapper>
  )
}

export default MovieVideos;

const S = {
  VideosWrapper: styled.div`
  
  `,

  SubTitle: styled.h6`
    margin-bottom: 10px;
    font-size: 2rem;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  VideoList: styled.ul`
    display: flex;
  `,

  VideoItem: styled.li`
    flex-shrink: 0;
  `,
}