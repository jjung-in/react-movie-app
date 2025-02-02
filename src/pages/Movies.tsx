import styled from "styled-components";
import Container from "../styles/Container"
import MovieItem from "../components/Movie/MovieItem"
import { useParams } from "react-router-dom";
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "../hooks/useMovies";
import { useAuth } from "../context/AuthContext";
import { useUserLikes } from "../hooks/useLikes";

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
      queryResult = useNowPlayingMovies();
      title = "Now Playing";
      break;
    case "upcoming":
      queryResult = useUpcomingMovies();
      title = "Coming Soon";
      break;
    case "popular":
      queryResult = usePopularMovies();
      title = "Popular Movies";
      break;
    case "like":
      queryResult = useUserLikes(userEmail);
      title = "Favorites"
      break;
    default:
      queryResult = useNowPlayingMovies();
      title = "Now Playing";
  }
  const { data, isLoading, isError, error } = queryResult;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const movies = category === "like" ? data : data?.results;

  return (
    <main>
      <section>
        <MoviesContainer>
          <Title>{title}</Title>
          <MovieListUl>
            {movies.map((movie: { id: number, poster_path: string }) => (
              <MovieItem key={movie.id} id={movie.id} poster={movie.poster_path} />
            ))}
          </MovieListUl>
        </MoviesContainer>
      </section>
    </main>
  )
}

export default Movies;