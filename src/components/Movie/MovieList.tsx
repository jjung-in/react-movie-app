import styled from "styled-components";
import MovieItem from "./MovieItem";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies } from "../../hooks/useMovies";
import { breakpoints } from "../../styles/breakpoint";

interface Props {
  category: string;
};

const MovieList = ({ category }: Props) => {
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
  const { data, isFetching } = queryResult;

  return (
    <>
      {isFetching ? (
        <Spinner height="360px" />
      ) : (
        <S.ListWrapper>
          <S.List>
            {data?.results.map((movie) => (
              <MovieItem key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
            ))}
          </S.List>
          <S.MoreLink to={`/search`} state={{ category }}><FontAwesomeIcon icon={faAngleRight} /></S.MoreLink>
        </S.ListWrapper>
      )}
    </>
  );
};

export default MovieList;

const ListWrapper = styled.div`
  position: relative;
`;

const List = styled.div`
  display: flex;
  gap: 30px 20px;
  overflow: hidden;
`;

const MoreLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
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

  @media (max-width: ${breakpoints.mobile}) {
    width: 30px;
  }
`;

const S = { ListWrapper, List, MoreLink };