import { Link } from "react-router-dom";
import styled from "styled-components";
import AgeRating from "../../components/Movie/AgeRating";
import Tag from "../../components/Movie/Tag";
import Star from "../../components/Movie/Star";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { MovieDetails } from "../../types/movie.type";

interface Props {
  details: MovieDetails;
  rating: string;
};

const MovieContentSection = ({ details, rating }: Props) => {
  return (
    <S.Section>
      <S.MovieTitle>{details.title}</S.MovieTitle>
      <S.TagBox>
        <AgeRating rating={rating} />
        {details.genres.map((genre) => <Tag key={genre.id} value={genre.id} options={{ fontWeight: "bold" }} />)}
        <Tag value={`${details.runtime}M`} options={{ fontWeight: "bold", backgroundColor: "rgba(0,0,0, 0.2)" }} />
      </S.TagBox>
      <Star rating={details.vote_average} options={{ fontSize: "1.5rem", fontWeight: "bold" }} />
      <S.MoreLink to={`/detail/${details.id}`}>See More<FontAwesomeIcon icon={faAngleRight} /></S.MoreLink>
    </S.Section >
  );
};

export default MovieContentSection;

const S = {
  Section: styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  `,

  MovieTitle: styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5rem;
    letter-spacing: 1px;
  `,

  TagBox: styled.div`
    display: flex;
    gap: 0.8rem;
    align-items: center;
    flex-wrap: wrap;
  `,

  MoreLink: styled(Link)`
    padding: 10px 20px;
    padding: 0.6rem 1.2rem;
    border-radius: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.point};

    svg {
      margin-left: 10px;
    }
  `,
};