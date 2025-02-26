import styled from 'styled-components';
import { MovieImages as Images } from '../../types/movie.type';
import SubTitle from '../../components/common/SubTitle';
import Carousel from './Carousel';
import { useState } from 'react';

interface Props {
  images: Images;
}

const MovieImages = ({ images }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const backdropsImages = images?.backdrops;
  const length = backdropsImages?.length;

  return (
    <>
      {length > 0 && (
        <S.PhotosBox>
          <SubTitle category='PHOTOS' />
          <Carousel
            isHover={isHover}
            length={length}
            curIndex={curIndex}
            setCurIndex={setCurIndex}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <S.ImageList $curIndex={curIndex}>
              {backdropsImages.map((images) => (
                <S.ImageItem key={images.file_path}>
                  <img src={`https://image.tmdb.org/t/p/w780/${images.file_path}`} />
                </S.ImageItem>
              ))}
            </S.ImageList>
          </Carousel>
        </S.PhotosBox>
      )}
    </>
  );
};

export default MovieImages;

const S = {
  PhotosBox: styled.div``,

  ImageList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 15px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (350 + 15)}px)`};
    transition: 0.3s ease-in-out;
  `,

  ImageItem: styled.li`
    flex-shrink: 0;
    width: 350px;

    & img {
      width: 100%;
      height: 197px;
      object-fit: cover;
    }
  `,
};
