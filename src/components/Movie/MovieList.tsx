import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Container from "../../styles/Container";
import MovieItem from "./MovieItem";
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "../../hooks/useMovies";

interface MovieListProps {
  title: string;
  url: string;
}

const MovieListSection = styled.section`
  margin-bottom: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const SeeMoreLink = styled(Link)`
  display: flex;
  align-items: center;

  & > svg {
    margin-left: 5px;
  }
`;

const MovieListUl = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const MovieList = ({ title, url }: MovieListProps) => {
  let queryResult;
  switch (url) {
    case "nowplaying":
      queryResult = useNowPlayingMovies();
      break;
    case "upcoming":
      queryResult = useUpcomingMovies();
      break;
    case "popular":
      queryResult = usePopularMovies();
      break;
    default:
      queryResult = { data: [], isLoading: false, isError: false }
  }
  const { data, isLoading, isError, error } = queryResult;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const movies = data?.results?.slice(0, 4);

  return (
    <MovieListSection>
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          <SeeMoreLink to={`movies/${url}`}>더보기<FontAwesomeIcon icon={faAngleRight} />
          </SeeMoreLink>
        </TitleContainer>
        <MovieListUl>
          {movies && movies.map((movie: { id: number, poster_path: string }) => (
            <MovieItem key={movie.id} id={movie.id} poster={movie.poster_path} />
          ))}
        </MovieListUl>
      </Container>
    </MovieListSection>
  )
}

export default MovieList;