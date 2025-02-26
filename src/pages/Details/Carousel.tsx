import styled from 'styled-components';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { breakpoints } from '../../styles/breakpoint';

interface Props {
  isHover: boolean;
  length: number;
  curIndex: number;
  setCurIndex: Dispatch<SetStateAction<number>>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

const Carousel = ({ isHover, length, curIndex, setCurIndex, onMouseEnter, onMouseLeave, children }: Props) => {
  const handlePrev = () => {
    if (curIndex > 0) {
      setCurIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (length > 0 && curIndex < length - 1) {
      setCurIndex((prev) => prev + 1);
    }
  };

  return (
    <S.CarouselBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <S.PrevButton onClick={handlePrev} $isHover={isHover} $curIndex={curIndex}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </S.PrevButton>
      <S.NextButton onClick={handleNext} $isHover={isHover} $curIndex={curIndex} $length={length}>
        <FontAwesomeIcon icon={faAngleRight} />
      </S.NextButton>
    </S.CarouselBox>
  );
};

export default Carousel;

const S = {
  CarouselBox: styled.div`
    position: relative;
  `,

  PrevButton: styled.button<{ $isHover: boolean; $curIndex: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 100%;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.5s ease;
    opacity: ${({ $isHover, $curIndex }) => ($isHover && $curIndex > 0 ? 1 : 0)};
    visibility: ${({ $isHover, $curIndex }) => ($isHover && $curIndex > 0 ? 'visible' : 'hidden')};

    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 30px;
    }
  `,

  NextButton: styled.button<{ $isHover: boolean; $curIndex: number; $length: number }>`
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.5s ease;
    opacity: ${({ $isHover, $curIndex, $length }) => ($isHover && $length > 0 && $curIndex < $length - 1 ? 1 : 0)};
    visibility: ${({ $isHover, $curIndex, $length }) => ($isHover && $length > 0 && $curIndex < $length - 1 ? "visible" : "hidden")};

    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 30px;
    }
  `,
};
