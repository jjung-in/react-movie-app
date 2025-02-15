import styled from "styled-components";
import { Cast } from "../../types/credits.type";

interface Props {
  casts: Cast[];
}

const MovieCasts = ({ casts }: Props) => {
  return (
    <S.MainWrapper>
      <S.SubTitle>CAST</S.SubTitle>
      <S.CastList>
        {casts.map((cast) => (
          <S.CastItem key={cast.id}>
            <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w185/${cast.profile_path}` : `https://placehold.co/240x360`} />
            <span>{cast.name}</span>
          </S.CastItem>
        ))}
      </S.CastList>
    </S.MainWrapper>
  )
}

export default MovieCasts;

const S = {
  MainWrapper: styled.div`
  `,

  SubTitle: styled.h6`
    margin-bottom: 10px;
    font-size: 2rem;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  CastList: styled.ul`
    /* background-color: gray; */
    display: flex;
  `,

  CastItem: styled.li`
    /* background-color: pink; */
    flex-shrink: 0;
    text-align: center;

    & img {
      width: 145px;
      height: 225px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 10px;
    }
  `,
}