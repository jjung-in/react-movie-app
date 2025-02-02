import styled from "styled-components";
import Container from "../../styles/Container";
import { useParams } from "react-router-dom";
import { useMovieCredits } from "../../hooks/useMovies";

const StyledContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Title = styled.h3`
  padding-bottom: 15px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const CastItem = styled.li`
  max-width: 145px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 145px;
  /* height: 225px; */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CastName = styled.span`
`;

const CastInfo = () => {
  const movieId = Number(useParams().id);
  const { data, isLoading, isError, error } = useMovieCredits(movieId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  return (
    <section>
      <StyledContainer>
        <Title>CAST</Title>
        <CastList>
          {data?.cast?.map((actor: { cast_id: string, name: string, profile_path?: string }) => (
            <CastItem key={actor.cast_id}>
              <CastImage src={actor.profile_path ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` : `https://placehold.co/240x360`} alt="Movie Poster" />
              <CastName>{actor.name}</CastName>
            </CastItem>
          ))}
        </CastList>
      </StyledContainer>
    </section>
  )
}

export default CastInfo;