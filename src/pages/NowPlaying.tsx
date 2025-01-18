import styled from "styled-components";
import MovieItem from "../components/Movie/MovieItem"

interface MoviesProps {
  title: string;
}

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

const MovieListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 5px;
  row-gap: 20px;
`;

const NowPlaying = ({ title }: MoviesProps) => {
  return (
    <>
      <Title>{title}</Title>
      <MovieListUl>
        <MovieItem key={1} id={1} />
        <MovieItem key={2} id={2} />
        <MovieItem key={3} id={3} />
        <MovieItem key={4} id={4} />
        <MovieItem key={5} id={5} />
        <MovieItem key={6} id={6} />
        <MovieItem key={7} id={7} />
        <MovieItem key={8} id={8} />
        <MovieItem key={9} id={9} />
        <MovieItem key={10} id={10} />
        <MovieItem key={11} id={11} />
        <MovieItem key={12} id={12} />
      </MovieListUl>
    </>
  )
}

export default NowPlaying;