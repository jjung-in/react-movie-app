import styled from "styled-components";
import Container from "../../styles/Container";
import SubTitle from "../common/SubTitle";
import MovieList from "./MovieList";

interface Props {
  url: string;
}

const S = {
  MovieWrapper: styled.section`
    margin-bottom: 30px;
  `,
}

const MovieSection = ({ url }: Props) => {
  return (
    <S.MovieWrapper>
      <Container>
        <SubTitle url={url} />
        <MovieList category={url} />
      </Container>
    </S.MovieWrapper>
  )
}

export default MovieSection;