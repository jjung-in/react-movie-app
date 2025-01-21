import styled from "styled-components"
import Container from "../../styles/Container";
import AgeRating from "../Movie/AgeRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useMovieAgeRating, useMovieDetails } from "../../hooks/useMovies";

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

const FavoriteButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2.5rem;
  cursor: pointer;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.pointText};
  }
`;

const InfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const InfoItem = styled.li`
  position: relative;
  padding-left: 15px;

  &::before {
    position: absolute;
    content: "•";
    left: 0;
  }
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
  const movieId = Number(useParams().id);
  const { data: movieData, isLoading: movieLoading, isError: movieError, error: movieErrorMsg } = useMovieDetails(movieId);
  const { data: ageRating, isLoading: ageRatingLoading, isError: ageRatingError, error: ageRatingErrprMsg } = useMovieAgeRating(movieId!);

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
            <FavoriteButton><FontAwesomeIcon icon={faHeart} /></FavoriteButton>
          </TitleWrapper>
          <InfoList>
            <InfoItem><AgeRating rating={ageRating} /></InfoItem>
            <InfoItem>개봉일&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.release_date}</InfoItem>
            <InfoItem>러닝타임&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.runtime}분</InfoItem>
            <InfoItem>장르&nbsp;&nbsp;|&nbsp;&nbsp;{movieData.genres.map((genre: any) => genre.name).join(", ")}</InfoItem>
          </InfoList>
          <Tagline>"&nbsp;&nbsp;{movieData.tagline ? movieData.tagline : movieData.title}&nbsp;&nbsp;"</Tagline>
          <Description >{movieData.overview}</Description>
        </ContentWrapper>
      </StyledContainer>
    </section>
  )
}

export default MovieInfo;