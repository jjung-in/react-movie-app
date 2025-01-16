import styled from "styled-components";
import Container from "../../styles/Container";

const MovieBannerSection = styled.section`
  margin-bottom: 30px;
`;

const BannerImage = styled.img`
  width: 1024px;
  height: auto;
  border-radius: 10px;
`;

const MovieBanner = () => {
  return (
    <MovieBannerSection>
      <Container>
        <BannerImage src="https://placehold.co/1024x360" alt="Movie Poster" />
      </Container>
    </MovieBannerSection>
  )
}

export default MovieBanner;