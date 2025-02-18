import styled from "styled-components";
import Container from "../../styles/Container";
import SubTitle from "../../components/common/SubTitle";
import MovieList from "./MovieList";

interface Props {
  category: string;
};

const MovieSection = ({ category }: Props) => {
  return (
    <S.MovieWrapper>
      <Container>
        <SubTitle category={category} />
        <MovieList category={category} />
      </Container>
    </S.MovieWrapper>
  );
};

export default MovieSection;

const S = {
  MovieWrapper: styled.section`
    margin-bottom: 30px;
  `,
};