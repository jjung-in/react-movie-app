import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface Props {
  rating: number;
}

const S = {
  RatingBox: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,

  Star: styled.span`
    color: #ffd700;
    font-size: 2rem;
  `,

  Score: styled.span`
    margin-right: 7px;
    color: #ffd700;
    font-size: 2rem;
  `,
}

const Rating = ({ rating }: Props) => {
  const totalStars = 5;
  const fullStar = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < fullStar) {
        stars.push(<S.Star key={i}><FontAwesomeIcon icon={faStar} /></S.Star>);
      } else if (i === fullStar && hasHalfStar) {
        stars.push(<S.Star key={i}><FontAwesomeIcon icon={faStarHalfStroke} /></S.Star>);
      } else {
        stars.push(<S.Star key={i}><FontAwesomeIcon icon={faStarRegular} /></S.Star>);
      }
    }
    return stars;
  }

  return (
    <S.RatingBox>
      <S.Score>{rating.toFixed(1)}</S.Score>
      {renderStars()}
    </S.RatingBox>
  );
};

export default Rating;
