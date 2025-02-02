import styled from "styled-components"
import Container from "../../styles/Container";
import AgeRating from "../Movie/AgeRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useMovieAgeRating, useMovieDetails } from "../../hooks/useMovies";
import { useAuth } from "../../context/AuthContext";
import { useMovieLikes } from "../../hooks/useLikes";

const StyledContainer = styled(Container)`
  display: flex;
  gap: 50px;
  padding-top: 20px;
`;

const PosterWrapper = styled.div`
  flex: 0 0 auto;
`;

const PosterImage = styled.img`
  width: 240px;
  /* height: 360px; */
  object-fit: cover;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const FavoriteButton = styled.button<{ $isLiked?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ $isLiked, theme }) => ($isLiked ? "#CF2F11" : theme.colors.primaryText)};
  font-size: 2.5rem;
  cursor: pointer;
`;

const InfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const Tagline = styled.p`
  margin: 30px 0;
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  letter-spacing: 2px;
`;

const Description = styled.p`
  line-height: 1.8;
`;

const MovieInfo = () => {
  const { user } = useAuth();
  const userEmail = user?.email || null;
  const movieId = Number(useParams().id);

  const { data: movieData, isLoading: movieLoading, isError: movieError, error: movieErrorMsg } = useMovieDetails(movieId);
  const { data: ageRating, isLoading: ageRatingLoading, isError: ageRatingError, error: ageRatingErrprMsg } = useMovieAgeRating(movieId!);
  const { data: isLiked, isLoading: likeLoading, isError: likeError, error: likeErrprMsg, addLike, removeLike } = useMovieLikes(userEmail, movieData);

  const handleLikes = () => {
    if (!userEmail) {
      alert("Please log in to continue.");
      return;
    }

    if (isLiked) {
      removeLike.mutate();
    } else {
      addLike.mutate();
    }
  };

  if (movieLoading || ageRatingLoading) {
    return <div>Loading...</div>;
  }

  if (movieError || ageRatingError) {
    return <div>Error: {movieErrorMsg instanceof Error || ageRatingErrprMsg instanceof Error ? movieErrorMsg?.message || ageRatingErrprMsg?.message : 'Something went wrong'}</div>;
  }

  return (
    <section>
      <StyledContainer>
        <PosterWrapper>
          <PosterImage src={`https://image.tmdb.org/t/p/w342/${movieData.poster_path}`} alt="Movie Poster" />
        </PosterWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <Title>{movieData.title}</Title>
            <FavoriteButton $isLiked={isLiked} onClick={handleLikes}><FontAwesomeIcon icon={faHeart} /></FavoriteButton>
          </TitleWrapper>
          <InfoList>
            <li><AgeRating rating={ageRating} /></li>
            <li><b>RELEASE</b>&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.release_date}</li>
            <li><b>RUNTIME</b>&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.runtime}M</li>
            <li><b>GENRE</b>&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.genres.map((genre: any) => genre.name).join(", ")}</li>
          </InfoList>
          <Tagline>"&nbsp;&nbsp;{movieData.tagline ? movieData.tagline : movieData.title}&nbsp;&nbsp;"</Tagline>
          <Description >{movieData.overview}</Description>
        </ContentWrapper>
      </StyledContainer>
    </section>
  )
}

export default MovieInfo;