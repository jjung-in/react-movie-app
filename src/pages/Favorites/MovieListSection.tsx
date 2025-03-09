import styled from "styled-components";
import PosterImage from "../../components/Movie/PosterImage";
import { LikedMovie } from "../../types/likes.type";
import { breakpoints } from "../../styles/breakpoint";
import { useEffect, useRef } from "react";

interface Props {
  movies: LikedMovie[];
  selectMovie: number | undefined;
  setSelectMovie: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const MovieListSection = ({ movies, selectMovie, setSelectMovie }: Props) => {
  const movieListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const movieList = movieListRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (movieList) {
        const atLeftEnd = (movieList.scrollLeft === 0);
        const atRightEnd = (movieList.scrollLeft + movieList.offsetWidth >= movieList.scrollWidth);
        const scrollingUp = (e.deltaY < 0);
        const scrollingDown = (e.deltaY > 0);

        if ((atLeftEnd && scrollingUp) || (atRightEnd && scrollingDown)) {
          return;
        }

        e.preventDefault();
        movieList.scrollLeft += e.deltaY;
      }
    };

    if (movieList) {
      movieList.addEventListener('wheel', handleWheel, { passive: false });
      return () => { movieList.removeEventListener('wheel', handleWheel); };
    }
  }, []);

  const handleItemClick = (movieId: number) => {
    setSelectMovie(movieId);
  };

  if (!selectMovie) {
    return;
  }

  return (
    <S.Section>
      <S.SubTitle>My Favorites</S.SubTitle>
      <S.MovieList ref={movieListRef}>
        {movies?.map((movie) => (
          <S.MovieItem $id={movie.movieId} $selectMovie={selectMovie} key={movie.movieId} onClick={() => handleItemClick(movie.movieId)}>
            <PosterImage poster_path={movie.poster_path} />
          </S.MovieItem>
        ))}
      </S.MovieList>
    </S.Section>
  );
};

export default MovieListSection;

const S = {
  Section: styled.section`
    width: 100%;
  `,

  SubTitle: styled.h4`
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  `,

  MovieTitle: styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 4rem;
    letter-spacing: 1px;
  `,

  MovieList: styled.div`
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding-bottom: 1.2rem;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background};
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #2e2e2e;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #5a5a5a;
    }
  `,

  MovieItem: styled.div<{ $id: number, $selectMovie: number }>`
    flex: 0 0 auto;
    width: 240px;
    height: 360px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    border: ${({ $id, $selectMovie }) => $id === $selectMovie ? "3px solid #ffffff" : "none"};

    & img {
      transition: all 0.5s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 220px;
      height: 330px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 200px;
      height: 300px;
    }
  `,
};