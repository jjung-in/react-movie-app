import styled from 'styled-components';
import Container from '../../components/common/Container';
import SubTitle from '../../components/common/SubTitle';
import MovieItem from '../../components/Movie/MovieItem';
import Spinner from '../../components/common/Spinner';
import {
  useMovieSearchInfinite,
  useNowPlayingMoviesInfinite,
  usePopularMoviesInfinite,
  useTopRatedMoviesInfinite,
  useUpcomingMoviesInfinite,
} from '../../hooks/useMovies';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { breakpoints } from '../../styles/breakpoint';

interface Props {
  category: string;
  search: string;
}

const MovieListSection = ({ category, search }: Props) => {
  const nowPlayingMovies = useNowPlayingMoviesInfinite();
  const upcomingMovies = useUpcomingMoviesInfinite();
  const popularMovies = usePopularMoviesInfinite();
  const topRatedMovies = useTopRatedMoviesInfinite();

  let queryResult;
  switch (category) {
    case 'nowplaying':
      queryResult = nowPlayingMovies;
      break;
    case 'upcoming':
      queryResult = upcomingMovies;
      break;
    case 'popular':
      queryResult = popularMovies;
      break;
    case 'toprated':
      queryResult = topRatedMovies;
      break;
    default:
      queryResult = nowPlayingMovies;
  }

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isFetching: isMovieFetching,
    fetchNextPage: movieFetchNextPage,
    hasNextPage: hasMovieNextPage,
  } = queryResult || {};
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    fetchNextPage: searchfetchNextPage,
    hasNextPage: hasSearchNextPage,
  } = useMovieSearchInfinite(search);

  const isLoading = isMovieLoading || isSearchLoading;
  const isFetching = isMovieFetching || isSearchFetching;
  const fetchNextPage = search ? searchfetchNextPage : movieFetchNextPage;
  const hasNextPage = search ? hasSearchNextPage : hasMovieNextPage;
  const data = search ? searchData : movieData;
  const movies = data?.pages.flatMap((page) => page.results);
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (lastMovieRef.current) {
      observer.observe(lastMovieRef.current);
    }

    return () => {
      if (lastMovieRef.current) {
        observer.unobserve(lastMovieRef.current);
      }
    };
  }, [lastMovieRef.current, hasNextPage]);

  return (
    <S.Section>
      <S.Container>
        <SubTitle category={search ? `Search Results for "${search}"` : category} />
        {isLoading ? (
          <S.LoadingBox>
            <Spinner />
          </S.LoadingBox>
        ) : movies && movies.length ? (
          <>
            <S.MovieList>
              {movies.map((movie, index) => (
                <div ref={index === movies.length - 1 ? lastMovieRef : null} key={uuidv4()}>
                  <MovieItem id={movie.id} title={movie.title} poster_path={movie.poster_path} />
                </div>
              ))}
            </S.MovieList>
            {isFetching && <Spinner height='150px' />}
          </>
        ) : (
          <S.LoadingBox>No Data</S.LoadingBox>
        )}
      </S.Container>
    </S.Section>
  );
};

export default MovieListSection;

const S = {
  Section: styled.section`
    display: flex;
    min-height: calc(100vh - 180px);

    @media (max-width: ${breakpoints.tablet}) {
      min-height: calc(100vh - 150px);
    }

    @media (max-width: ${breakpoints.mobile}) {
      min-height: calc(100vh - 200px);
    }
  `,

  Container: styled(Container)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 40px;
  `,

  MovieList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    justify-items: center;
    align-items: center;
    gap: 30px 20px;

    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px 20px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
  `,

  LoadingBox: styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
