import styled from "styled-components";
import Container from "../../styles/Container";
import SubTitle from "../../components/common/SubTitle";
import MovieItem from "../../components/Movie/MovieItem";
import { useNowPlayingMoviesInfinite, usePopularMoviesInfinite, useTopRatedMoviesInfinite, useUpcomingMoviesInfinite } from "../../hooks/useMovies";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  category: string;
  search: string;
}

const MovieListSection = ({ category, search }: Props) => {
  console.log(search);

  let queryResult;
  switch (category) {
    case "nowplaying":
      queryResult = useNowPlayingMoviesInfinite();
      break;
    case "upcoming":
      queryResult = useUpcomingMoviesInfinite();
      break;
    case "popular":
      queryResult = usePopularMoviesInfinite();
      break;
    case "toprated":
      queryResult = useTopRatedMoviesInfinite();
      break;
  }

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = queryResult || {};
  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
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

  const movies = data?.pages.flatMap((page: any) => page.results);

  return (
    <section>
      <S.Container>
        <SubTitle url={"popular"} />
        {isLoading ? (
          <div>is Loading...</div>
        ) : (
          <>
            {movies && movies.length ? (
              <S.MovieList>
                {movies.map((movie, index) => (
                  <div ref={index === movies.length - 1 ? lastMovieRef : null} key={uuidv4()}>
                    <MovieItem id={movie.id} title={movie.title} poster_path={movie.poster_path} />
                  </div>
                ))}
              </S.MovieList>
            ) : (
              <div>no data</div>
            )}
          </>
        )}
        {isFetching && <div>데이터 새로 요청 중 ...</div>}
      </S.Container>
    </section>
  )
}

export default MovieListSection;

const S = {
  Container: styled(Container)`
    padding-bottom: 40px;
  `,

  MovieList: styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    justify-items: center;
    align-items: center;
    gap: 30px 20px;
  `,
};