import styled from 'styled-components';
import SubTitle from '../../components/common/SubTitle';
import Carousel from './Carousel';
import { Cast } from '../../types/credits.type';
import { useState } from 'react';
import { breakpoints } from '../../styles/breakpoint';

interface Props {
  casts: Cast[];
}

const MovieCasts = ({ casts }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const length = casts.length || 0;

  return (
    <S.CastBox>
      <SubTitle category='CAST' />
      <Carousel
        isHover={isHover}
        length={length}
        curIndex={curIndex}
        setCurIndex={setCurIndex}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <S.CastList $curIndex={curIndex}>
          {casts.map((cast) => (
            <S.CastItem key={cast.cast_id}>
              <img
                src={cast.profile_path ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}` : `/images/noimage.png`}
              />
              <span>{cast.name}</span>
            </S.CastItem>
          ))}
        </S.CastList>
      </Carousel>
    </S.CastBox>
  );
};

export default MovieCasts;

const S = {
  CastBox: styled.div``,

  CastList: styled.ul<{ $curIndex: number }>`
    display: flex;
    gap: 15px;
    transform: ${({ $curIndex }) => `translateX(-${$curIndex * (145 + 15)}px)`};
    transition: 0.3s ease-in-out;

    @media (max-width: ${breakpoints.tablet}) {
      transform: ${({ $curIndex }) => `translateX(-${$curIndex * (120 + 15)}px)`};
    }

    @media (max-width: ${breakpoints.mobile}) {
      transform: ${({ $curIndex }) => `translateX(-${$curIndex * (100 + 15)}px)`};
    }
  `,

  CastItem: styled.li`
    flex-shrink: 0;
    width: 145px;
    text-align: center;

    & img {
      width: 100%;
      height: 218px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 0.5rem;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 120px;

      & img {
        height: 180px;
      }
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 100px;

      & img {
        height: 150px;
      }
    }
  `,
};
