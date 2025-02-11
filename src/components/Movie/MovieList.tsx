import styled from "styled-components";
import MovieItem from "./MovieItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies } from "../../hooks/useMovies";

interface Props {
  category: string;
  options?: {
    wrap?: string;
  }
}

const ListWrapper = styled.div`
  position: relative;
`;

const List = styled.div<{ $options: Props["options"] }>`
  display: flex;
  gap: 30px 20px;
  flex-wrap: ${({ $options }) => $options?.wrap || "nowrap"};
  overflow: hidden;
`;

const MoreLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.5s ease;

  ${ListWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const S = { ListWrapper, List, MoreLink };

const MovieList = ({ category, options }: Props) => {
  let queryResult;
  switch (category) {
    case "nowplaying":
      queryResult = useNowPlayingMovies();
      break;
    case "upcoming":
      queryResult = useUpcomingMovies();
      break;
    case "popular":
      queryResult = usePopularMovies();
      break;
    case "toprated":
      queryResult = useTopRatedMovies();
      break;
    default:
      queryResult = useNowPlayingMovies();
  }
  const { data, isLoading, isError, error } = queryResult;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const movies = data?.results;

  return (
    <>
      {movies && movies.length && (
        <S.ListWrapper>
          <S.List $options={options || {}}>
            {movies.map((movie: { id: number, movieId: number, title: string, poster_path: string }) => (
              <MovieItem key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
            ))}
          </S.List>
          <S.MoreLink to={`movies/${category}`}><FontAwesomeIcon icon={faAngleRight} /></S.MoreLink>
        </S.ListWrapper>
      )}
    </>
  )
}

export default MovieList;