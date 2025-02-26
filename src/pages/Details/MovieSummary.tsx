import styled from 'styled-components';
import PosterImage from '../../components/Movie/PosterImage';
import Star from '../../components/Movie/Star';
import AgeRating from '../../components/Movie/AgeRating';
import Tag from '../../components/Movie/Tag';
import { MovieDetails } from '../../types/movie.type';

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
      {rating && (
        <S.RatingWrapper>
          <S.SubTitle>RATING</S.SubTitle>
          <AgeRating rating={rating} />
        </S.RatingWrapper>
      )}
      <S.GenreWrapper>
        <S.SubTitle>GENRE</S.SubTitle>
        <div>
          {movie.genres.map((genre) => (
            <Tag key={genre.id} value={genre.id} options={{ color: '#ffffff' }} />
          ))}
        </div>
      </S.GenreWrapper>
      <S.ReleaseWrapper>
        <S.SubTitle>RELEASE</S.SubTitle>
        <Tag value={`${movie.release_date}`} options={{ color: '#ffffff' }} />
      </S.ReleaseWrapper>
      <S.RuntimeWrapper>
        <S.SubTitle>RUNTIME</S.SubTitle>
        <Tag value={`${movie.runtime}M`} options={{ color: '#ffffff' }} />
      </S.RuntimeWrapper>
      <S.StarWrapper>
        <S.SubTitle>STAR</S.SubTitle>
        <Star rating={movie.vote_average} options={{ fontSize: '1.25rem' }} />
      </S.StarWrapper>
    </>
  );
};

export default MovieSummary;

const S = {
  Poster: styled.div`
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
  `,

  Title: styled.h2`
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  SubTitle: styled.h6`
    margin-bottom: 0.5rem;
    font-size: 1rem;
  `,

  RatingWrapper: styled.div``,

  GenreWrapper: styled.div`
    & div {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  `,

  RuntimeWrapper: styled.div``,

  ReleaseWrapper: styled.div``,

  StarWrapper: styled.div``,
};
