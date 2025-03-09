import styled from 'styled-components';
import MovieItem from '../../components/Movie/MovieItem';
import Spinner from '../../components/common/Spinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies } from '../../hooks/useMovies';
import { breakpoints } from '../../styles/breakpoint';

interface Props {
  category: string;
}

const MovieList = ({ category }: Props) => {
  const [spinnerHeight, setSpinnerHeight] = useState('360px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSpinnerHeight('240px');
      } else if (window.innerWidth <= 768) {
        setSpinnerHeight('300px');
      } else {
        setSpinnerHeight('360px');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nowPlayingMovies = useNowPlayingMovies();
  const upcomingMovies = useUpcomingMovies();
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();

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
  const { data, isFetching } = queryResult;

  return (
    <>
      {isFetching ? (
        <Spinner height={spinnerHeight} />
      ) : (
        <S.ListWrapper>
          <S.List>
            {data?.results.map((movie) => (
              <MovieItem key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
            ))}
          </S.List>
          <S.MoreLink to={`/search`} state={{ category }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </S.MoreLink>
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
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
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
