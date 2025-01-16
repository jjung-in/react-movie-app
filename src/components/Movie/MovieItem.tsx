import styled from "styled-components"
import { Link } from "react-router-dom"

const MovieItemLi = styled.li`
  background-color: pink;
  border-radius: 10px;
  overflow: hidden;
`;

const PosterImage = styled.img`
  width: 240px;
  /* height: 360px; */
  height: auto;
  transition: transform 0.3s ease;

  ${MovieItemLi}:hover & {
    transform: scale(1.1);
  }
`;

const MovieItem = () => {
  return (
    <MovieItemLi>
      <Link to="/detail">
        <PosterImage src="https://placehold.co/240x360" alt="Movie Poster" />
      </Link>
    </MovieItemLi>
  )
}

export default MovieItem;