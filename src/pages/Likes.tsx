import styled from "styled-components";
import Container from "../styles/Container";
import SubTitle from "../components/common/SubTitle";
import Tag from "../components/Movie/Tag";
import Rating from "../components/Movie/Rating";
import AgeRating from "../components/Movie/AgeRating";
import PosterImage from "../components/Movie/PosterImage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useUserLikes } from "../hooks/useLikes";
import { useEffect, useState } from "react";
import { useMovieAgeRating, useMovieDetails } from "../hooks/useMovies";

const Likes = () => {
  const { user } = useAuth();
  const userEmail = user?.email || null;
  const [selectMovie, setSelectMovie] = useState<number | null>(null);
  const { data, isLoading, isError, error } = useUserLikes(userEmail);
  const { data: movieDetails, isLoading: movieDetailsLoading, isError: movieDetailsError, error: movieDetailsErrorMessage } = useMovieDetails(selectMovie);
  const { data: ageRating, isLoading: ageRatingLoading, isError: ageRatingError, error: ageRatingErrprMsg } = useMovieAgeRating(selectMovie!);

  const handleItemClick = (movieId: number) => {
    setSelectMovie(movieId);
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectMovie(data[0].movieId);
    }
  }, [data]);

  if (isLoading || movieDetailsLoading || ageRatingLoading) {
    return <div>Loading...</div>;
  }

  if (isError || movieDetailsError || ageRatingError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }
  console.log(movieDetails)
  return (
    <>
      {data && data.length ? (
        <S.MainContainer $backdrop_path={movieDetails.backdrop_path}>
          <S.ContentContainer>
            <S.ContentSection>
              <S.MovieTitle>{movieDetails.title}</S.MovieTitle>
              <S.InfoWrapper>
                <AgeRating rating={ageRating} />
                <S.GenreList>
                  {movieDetails.genres.map((genre) => <Tag key={genre.id} value={genre.id} options={{ fontWeight: "bold" }} />)}
                </S.GenreList>
                <Tag value={`${movieDetails.runtime}M`} options={{ fontWeight: "bold", backgroundColor: "rgba(0,0,0, 0.2)" }} />
              </S.InfoWrapper>
              <Rating rating={movieDetails.vote_average} options={{ fontSize: "2rem", fontWeight: "bold" }} />
              <S.WatchLink to={`/detail/${movieDetails.id}`}><FontAwesomeIcon icon={faPlay} />Watch</S.WatchLink>
            </S.ContentSection>
            <S.ListSection>
              <SubTitle url="likes"></SubTitle>
              <S.MovieList>
                {data?.map((movie) => (
                  <S.MovieItem $id={movie.movieId} $selectMovie={selectMovie} key={movie.movieId} onClick={() => handleItemClick(movie.movieId)}>
                    <PosterImage poster_path={movie.poster_path} />
                  </S.MovieItem>
                ))}
              </S.MovieList>
            </S.ListSection>
          </S.ContentContainer>
        </S.MainContainer>
      ) : (
        <div>none</div>
      )}
    </>
  )
}

export default Likes;

const S = {
  MainContainer: styled.main<{ $backdrop_path: string }>`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: calc(100vh - 70px);

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: ${({ $backdrop_path }) => `url(https://image.tmdb.org/t/p/w1280/${$backdrop_path})`};
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 90%);
      z-index: -1;
    }
  `,

  ContentContainer: styled(Container)`
    flex: 1;
    padding: 3% 5% 2% 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    overflow: hidden;
  `,

  ContentSection: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `,

  ListSection: styled.section`
    width: 100%;
  `,

  MovieTitle: styled.h2`
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 4rem;
    letter-spacing: 1px;
  `,

  InfoWrapper: styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
  `,

  GenreList: styled.div`
    display: flex;
    gap: 10px;
  `,

  WatchLink: styled(Link)`
    padding: 10px 20px;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.primaryText};
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.pointText};

    svg {
      margin-right: 10px;
    }

    &:hover {
      text-decoration: underline;
    }
  `,

  MovieList: styled.div`
    display: flex;
    gap: 30px;
    overflow-x: auto;
    height: 380px;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background};
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #2e2e2e;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #5a5a5a;
    }
  `,

  MovieItem: styled.div<{ $id, $selectMovie }>`
    flex: 0 0 240px;
    width: 240px;
    height: 360px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    border: ${({ $id, $selectMovie }) => $id === $selectMovie ? "3px solid #ffffff" : "none"};

    & img {
      transition: all 0.5s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }
  `,


}
