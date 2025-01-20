import styled from "styled-components"
import { Link } from "react-router-dom"

interface MovieItemProps {
  id: number;
  poster: string
}

const MovieItemLi = styled.li`
  border-radius: 10px;
  overflow: hidden;
`;

const PosterImage = styled.img`
  width: 240px;
  height: 360px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MovieItemLi}:hover & {
    transform: scale(1.1);
  }
`;

const MovieItem = ({ id, poster }: MovieItemProps) => {
  return (
    <MovieItemLi>
      <Link to={`/detail/${id}`}>
        <PosterImage src={`https://image.tmdb.org/t/p/w342/${poster}`} alt="Movie Poster" />
      </Link>
    </MovieItemLi>
  )
}

export default MovieItem;