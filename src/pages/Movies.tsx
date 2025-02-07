import styled from "styled-components";
import Container from "../styles/Container"
import MovieItem from "../components/Movie/MovieItem"
import { useParams } from "react-router-dom";
import { useNowPlayingMoviesInfinite, usePopularMoviesInfinite, useTopRatedMoviesInfinite, useUpcomingMoviesInfinite } from "../hooks/useMovies";
import { useAuth } from "../context/AuthContext";
import { useUserLikes } from "../hooks/useLikes";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MoviesContainer = styled(Container)`
  padding: 20px 0;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

const MovieListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 5px;
  row-gap: 20px;
`;

const Movies = () => {
  const { category } = useParams();
  const { user } = useAuth();
  const userEmail = user?.email || null;

  let queryResult, title;
  switch (category) {
    case "nowplaying":
      queryResult = useNowPlayingMoviesInfinite();
      title = "Now Playing";
      break;
    case "upcoming":
      queryResult = useUpcomingMoviesInfinite();
      title = "Coming Soon";
      break;
    case "popular":
      queryResult = usePopularMoviesInfinite();
      title = "Popular Movies";
      break;
    case "toprated":
      queryResult = useTopRatedMoviesInfinite();
      title = "Top Rated";
      break;
    case "like":
      queryResult = useUserLikes(userEmail);
      title = "Favorites"
      break;
    default:
      queryResult = useNowPlayingMoviesInfinite();
      title = "Now Playing";
  }

  const { data, isLoading, isFetching, isError, error, fetchNextPage, hasNextPage } = queryResult;
  const lastMovieRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
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


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const movies = category === "like" ? data : data?.pages.flatMap((page: any) => page.results);

  return (
    <main>
      <section>
        <MoviesContainer>
          <Title>{title}</Title>
          <MovieListUl>
            {movies.map((movie: { id: number; poster_path: string }, index: number) => (
              <div ref={index === movies.length - 1 ? lastMovieRef : null} key={uuidv4()}>
                <MovieItem id={movie.id} poster={movie.poster_path} />
              </div>
            ))}
          </MovieListUl>
          {isFetching && <div>데이터 새로 요청 중 ...</div>}
        </MoviesContainer>
      </section>
    </main>
  )
}

export default Movies;