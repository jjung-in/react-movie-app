import styled from "styled-components";
import Container from "../../styles/Container";
import { usePopularMovies } from "../../hooks/useMovies";

const MovieBannerSection = styled.section`
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  width: 1024px;
  height: 360px;
  object-fit: fill;
  border-radius: 10px;
`;

const MovieBanner = () => {
  const { data, isLoading, isError, error } = usePopularMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const movie = data?.results?.find((movie: { backdrop_path: string }) => movie.backdrop_path);
  const backdrop_img = movie ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` : `https://placehold.co/1024x360`;

  return (
    <MovieBannerSection>
      <Container>
        <BannerImage src={backdrop_img} alt="Movie Poster" />
      </Container>
    </MovieBannerSection>
  )
}

export default MovieBanner;