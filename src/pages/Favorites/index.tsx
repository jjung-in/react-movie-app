import styled from "styled-components";
import Container from "../../components/common/Container";
import MovieContentSection from "./MovieContentSection";
import MovieListSection from "./MovieListSection";
import Spinner from "../../components/common/Spinner";
import { breakpoints } from "../../styles/breakpoint";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLikedMovies } from "../../hooks/useLikes";
import { useMovieRating, useMovieDetails } from "../../hooks/useMovies";

const FavoritesPage = () => {
  const { user } = useAuth();
  const userEmail = user?.email || null;
  const [selectMovie, setSelectMovie] = useState<number | undefined>();
  const { data: movies, isFetching: isMoviesFetching } = useLikedMovies(userEmail);
  const { data: details, isFetching: isDetailsFetching } = useMovieDetails(selectMovie);
  const { data: rating, isFetching: isAgeFetching } = useMovieRating(selectMovie);

  const isFetching = isMoviesFetching || isDetailsFetching || isAgeFetching;

  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectMovie(movies[0].movieId);
    }
  }, [movies]);

  return (
    <S.PageLayout $backdrop_path={details?.backdrop_path}>
      <S.Container>
        {isFetching ? (
          <S.LoadingBox>
            <Spinner height="100%" />
          </S.LoadingBox>
        ) : (
          <>
            {movies && movies.length && details && rating ? (
              <>
                <MovieContentSection details={details} rating={rating} />
                <MovieListSection movies={movies} selectMovie={selectMovie} setSelectMovie={setSelectMovie} />
              </>
            ) : (
              <S.LoadingBox>You have no liked movies.</S.LoadingBox>
            )}
          </>
        )}
      </S.Container>
    </S.PageLayout>
  );
};

export default FavoritesPage;

const S = {
  PageLayout: styled.main<{ $backdrop_path?: string }>`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: calc(100vh - 70px);

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: ${({ $backdrop_path }) => $backdrop_path ? `url(https://image.tmdb.org/t/p/w1280/${$backdrop_path})` : ""};
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 90%);
      z-index: -1;
    }

    @media (max-width: ${breakpoints.tablet}) {
      min-height: calc(100vh - 60px); 
    }
  `,

  Container: styled(Container)`
    flex: 1;
    padding: 2rem 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    overflow: hidden;
  `,

  LoadingBox: styled(Container)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};