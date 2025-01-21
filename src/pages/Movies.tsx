import styled from "styled-components";
import Container from "../styles/Container"
import MovieItem from "../components/Movie/MovieItem"
import { useParams } from "react-router-dom";
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "../hooks/useMovies";

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

  let queryResult, title;
  switch (category) {
    case "nowplaying":
      queryResult = useNowPlayingMovies();
      title = "현재 상영작";
      break;
    case "upcoming":
      queryResult = useUpcomingMovies();
      title = "상영 예정작작";
      break;
    case "popular":
      queryResult = usePopularMovies();
      title = "인기 작품";
      break;
    default:
      queryResult = useNowPlayingMovies();
      title = "현재 상영작";
  }
  const { data, isLoading, isError, error } = queryResult;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  return (
    <main>
      <section>
        <MoviesContainer>
          <Title>{title}</Title>
          <MovieListUl>
            {data?.results?.map((movie: { id: number, poster_path: string }) => (
              <MovieItem key={movie.id} id={movie.id} poster={movie.poster_path} />
            ))}
          </MovieListUl>
        </MoviesContainer>
      </section>
    </main>
  )
}

export default Movies;