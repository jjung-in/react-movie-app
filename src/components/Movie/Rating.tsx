import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

interface Props {
  rating: number;
  options?: {
    fontSize?: string;
    fontWeight?: string;
  };
}

const Rating = ({ rating, options }: Props) => {
  const totalStars = 5;
  const fullStar = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < fullStar) {
        stars.push(<S.Star key={i} $options={options || {}}><FontAwesomeIcon icon={faStar} /></S.Star>);
      } else if (i === fullStar && hasHalfStar) {
        stars.push(<S.Star key={i} $options={options || {}}><FontAwesomeIcon icon={faStarHalfStroke} /></S.Star>);
      } else {
        stars.push(<S.Star key={i} $options={options || {}}><FontAwesomeIcon icon={faStarRegular} /></S.Star>);
      }
    }
    return stars;
  }

  return (
    <S.RatingBox>
      <S.Score $options={options || {}}>{rating.toFixed(1)}</S.Score>
      {renderStars()}
    </S.RatingBox>
  );
};

export default Rating;

const S = {
  RatingBox: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,

  Star: styled.span<{ $options: Props["options"] }>`
    color: #ffd700;
    font-size: ${({ $options }) => $options?.fontSize || '1.5rem'};
  `,

  Score: styled.span<{ $options: Props["options"] }>`
    margin-right: 7px;
    color: #ffd700;
    font-size: ${({ $options }) => $options?.fontSize || '1.5rem'};
    font-weight: ${({ $options }) => $options?.fontWeight || 'normal'};
  `,
};
