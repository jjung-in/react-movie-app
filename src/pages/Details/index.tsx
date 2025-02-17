import styled from "styled-components";
import Container from "../../styles/Container";
import MovieSummary from "./MovieSummary";
import MovieContents from "./MovieContents";
import { useParams } from "react-router-dom";
import { useMovieAgeRating, useMovieCredits, useMovieDetails, useMovieImages, useMovieVideos } from "../../hooks/useMovies";
import Spinner from "../../components/common/Spinner";

const Details = () => {
  const movieId = Number(useParams().id);
  const { data: details, isFetching: isDetailsFetching } = useMovieDetails(movieId);
  const { data: rating, isFetching: isRatingFetching } = useMovieAgeRating(movieId);
  const { data: credits, isFetching: isCreditsFetching } = useMovieCredits(movieId);
  const { data: videos, isFetching: isVideosFetching } = useMovieVideos(movieId);
  const { data: images, isFetching: isImagesFetching } = useMovieImages(movieId);

  const isFetching = isDetailsFetching || isRatingFetching || isCreditsFetching || isVideosFetching || isImagesFetching;

  return (
    <main>
      <S.ContentContainer>
        {isFetching ? (
          <Spinner />
        ) : (
          details && (
            <>
              <S.SideSection>
                <MovieSummary movie={details} rating={rating} />
              </S.SideSection>
              <S.MainSection>
                <MovieContents movie={details} casts={credits?.cast} videos={videos?.results} images={images} />
              </S.MainSection>
            </>
          )
        )}
      </S.ContentContainer>
    </main>
  )
}

export default Details;

const S = {
  ContentContainer: styled(Container)`
    display: flex;
    gap: 80px;
    min-height: calc(100vh - 70px);
    padding: 3% 5% 2% 5%;
  `,

  SideSection: styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 300px;
    overflow: hidden;
  `,

  MainSection: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow: hidden;
  `,
}