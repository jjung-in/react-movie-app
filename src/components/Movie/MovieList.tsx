import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Container from "../../styles/Container";
import MovieItem from "./MovieItem";
import { useNowPlayingMovies, usePopularMovies, useUpcomingMovies } from "../../hooks/useMovies";
import { useAuth } from "../../context/AuthContext";
import { useUserLikes } from "../../hooks/useLikes";

interface MovieListProps {
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
    padding-bottom: 2px;
  }
`;

const MovieListUl = styled.ul`
  display: flex;
  gap: 20px;
`;

const MovieList = ({ url }: MovieListProps) => {
  const { user } = useAuth();
  const userEmail = user?.email || null;

  let queryResult, title;
  switch (url) {
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

  const movies = url === "like" ? data.slice(0, 4) : data?.results?.slice(0, 4);

  return (
    <>
      {movies && movies.length && (
        <MovieListSection>
          <Container>
            <TitleContainer>
              <Title>{title}</Title>
              <SeeMoreLink to={`movies/${url}`}>More<FontAwesomeIcon icon={faAngleRight} />
              </SeeMoreLink>
            </TitleContainer>
            <MovieListUl>
              {movies.map((movie: { id: number, movieId: number, poster_path: string }) => (
                <MovieItem key={movie.id} id={url === "like" ? movie.movieId : movie.id} poster={movie.poster_path} />
              ))}
            </MovieListUl>
          </Container>
        </MovieListSection>
      )}
    </>
  )
}

export default MovieList;