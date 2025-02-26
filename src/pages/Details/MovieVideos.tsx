import styled from 'styled-components';
import { Video } from '../../types/movie.type';
import SubTitle from '../../components/common/SubTitle';
import YouTube from 'react-youtube';
import { useState } from 'react';
import Carousel from './Carousel';

interface Props {
  videos: Video[];
}

const videoOptions = {
  width: '350',
  height: '197',
  playerVars: {
    autoplay: 0,
    rel: 0,
  },
};

const MovieVideos = ({ videos }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const trailerVideos = videos.filter((video) => video.type === 'Trailer');
  const length = trailerVideos.length || 0;

  return (
    <S.VideosBox>
      <SubTitle category='VIDEOS' />
      <Carousel
        isHover={isHover}
        length={length}
        curIndex={curIndex}
        setCurIndex={setCurIndex}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <S.VideoList $curIndex={curIndex}>
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
      </Carousel>
    </S.VideosBox>
  );
};

export default MovieVideos;

const S = {
  VideosBox: styled.div``,

  VideoList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 15px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (350 + 15)}px)`};
    transition: 0.3s ease-in-out;
  `,

  VideoItem: styled.li`
    flex-shrink: 0;
  `,
};
