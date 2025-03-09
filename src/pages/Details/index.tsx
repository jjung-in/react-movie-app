import styled from 'styled-components';
import Container from '../../components/common/Container';
import MovieSummary from './MovieSummary';
import MovieContents from './MovieContents';
import Spinner from '../../components/common/Spinner';
import { breakpoints } from '../../styles/breakpoint';
import { useParams } from 'react-router-dom';
import {
  useMovieRating,
  useMovieCredits,
  useMovieDetails,
  useMovieImages,
  useMovieVideos,
} from '../../hooks/useMovies';

const Details = () => {
  const movieId = Number(useParams().id);
  const { data: details, isFetching: isDetailsFetching } = useMovieDetails(movieId);
  const { data: rating, isFetching: isRatingFetching } = useMovieRating(movieId);
  const { data: credits, isFetching: isCreditsFetching } = useMovieCredits(movieId);
  const { data: videos, isFetching: isVideosFetching } = useMovieVideos(movieId);
  const { data: images, isFetching: isImagesFetching } = useMovieImages(movieId);

  const isFetching = isDetailsFetching || isRatingFetching || isCreditsFetching || isVideosFetching || isImagesFetching;

  return (
    <S.PageLayout>
      <S.ContentContainer>
        {isFetching ? (
          <Spinner />
        ) : (
          details &&
          rating && (
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
    </S.PageLayout>
  );
};

export default Details;

const S = {
  PageLayout: styled.main``,

  ContentContainer: styled(Container)`
    display: flex;
    gap: 3rem;
    min-height: calc(100vh - 70px);
    padding: 2rem 5%;

    @media (max-width: ${breakpoints.tablet}) {
      min-height: calc(100vh - 60px);
      flex-direction: column;
      gap: 1.75rem;
    }
  `,

  SideSection: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 300px;

    @media (max-width: ${breakpoints.laptop}) {
      width: 240px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
      gap: 1.75rem;
    }
  `,

  MainSection: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    overflow: hidden;
  `,
};
