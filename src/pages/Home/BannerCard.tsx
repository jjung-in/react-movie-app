import styled from 'styled-components';
import Star from '../../components/Movie/Star';
import Tag from '../../components/Movie/Tag';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../types/movie.type';

interface Props {
  movie: Movie;
}

const BannerCard = ({ movie }: Props) => {
  return (
    <S.CardBox>
      <S.BackImage src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} />
      <S.ContentWrapper>
        <Tag value='🔥 Now Popular' options={{ color: '#ffffff', fontSize: '0.75rem' }} />
        <S.MovieTitle>{movie.title}</S.MovieTitle>
        <S.GenreList>
          {movie.genre_ids.map((genre_id: number) => (
            <Tag key={genre_id} value={genre_id} options={{ fontSize: '0.75rem' }} />
          ))}
        </S.GenreList>
        <Star rating={movie.vote_average} />
        <S.WatchLink to={`/detail/${movie.id}`}>
          <FontAwesomeIcon icon={faPlay} />
          Watch
        </S.WatchLink>
      </S.ContentWrapper>
    </S.CardBox>
  );
};

export default BannerCard;

const S = {
  CardBox: styled.div`
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  `,

  BackImage: styled.img`
    filter: brightness(70%);
  `,

  ContentWrapper: styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 1.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.25rem;
  `,

  ContentInner: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  MovieTitle: styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.75rem;
    font-weight: bold;
    letter-spacing: 1px;
  `,

  GenreList: styled.div`
    display: flex;
    gap: 10px;
  `,

  WatchLink: styled(Link)`
    position: absolute;
    right: 1.75rem;
    bottom: 1.75rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.point};

    svg {
      margin-right: 10px;
    }
  `,
};
