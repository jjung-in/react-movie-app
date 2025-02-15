import styled from "styled-components";
import PosterImage from "../../components/Movie/PosterImage";
import Rating from "../../components/Movie/Rating";
import AgeRating from "../../components/Movie/AgeRating";
import Tag from "../../components/Movie/Tag";
import { MovieDetails } from "../../types/movie.type";

interface Props {
  movie: MovieDetails;
  rating: string;
}

const MovieSummary = ({ movie, rating }: Props) => {
  return (
    <>
      <S.Poster>
        <PosterImage poster_path={movie.poster_path} />
      </S.Poster>
      <S.Title>{movie.title}</S.Title>
      {rating && (<S.RatingWrapper>
        <S.SubTitle>RATING</S.SubTitle>
        <AgeRating rating={rating} />
      </S.RatingWrapper>)}
      <S.GenreWrapper>
        <S.SubTitle>GENRE</S.SubTitle>
        <div>
          {movie.genres.map((genre) => <Tag key={genre.id} value={genre.id} options={{ color: "#ffffff" }} />)}
        </div>
      </S.GenreWrapper>
      <S.ReleaseWrapper>
        <S.SubTitle>RELEASE</S.SubTitle>
        <Tag value={`${movie.release_date}`} options={{ color: "#ffffff" }} />
      </S.ReleaseWrapper>
      <S.RuntimeWrapper>
        <S.SubTitle>RUNTIME</S.SubTitle>
        <Tag value={`${movie.runtime}M`} options={{ color: "#ffffff" }} />
      </S.RuntimeWrapper>
      <S.StarWrapper>
        <S.SubTitle>STAR</S.SubTitle>
        <Rating rating={movie.vote_average} options={{ fontSize: "2rem" }} />
      </S.StarWrapper>
    </>
  )
}

export default MovieSummary;

const S = {
  Poster: styled.div`
    width: 240px;
    height: 360px;
    border-radius: 10px;
    overflow: hidden;
  `,

  Title: styled.h2`
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  SubTitle: styled.h6`
    margin-bottom: 7px;
    font-size: 1.5rem;
  `,

  RatingWrapper: styled.div`
    
  `,

  GenreWrapper: styled.div`
    & div {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `,

  RuntimeWrapper: styled.div`
  `,

  ReleaseWrapper: styled.div`
    & span {
      color: ${({ theme }) => theme.colors.primaryText};
    }
  `,

  StarWrapper: styled.div`
      
  `,
}