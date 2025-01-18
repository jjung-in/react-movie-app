import styled from "styled-components";

interface AgeRatingProps {
  rating: string;
}

const RatingBadge = styled.span<{ $rating: string }>`
  display: inline-block;
  padding: 2.5px 5px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: default;
  background-color: ${({ $rating }) => {
    switch ($rating.toUpperCase()) {
      case "G":
        return "#4caf50";
      case "PG":
        return "#e9b630";
      case "PG-13":
        return "#ff9800";
      case "R":
      case "NC-17":
        return "#f44336";
      default: return "#607d8b";
    }
  }};
`;

const AgeRating = ({ rating }: AgeRatingProps) => {

  const getDisplayRating = (rating: string): string => {
    const ratingMap: { [key: string]: string } = {
      "G": "ALL",
      "PG": "12+",
      "PG-13": "15+",
      "R": "19+",
      "NC- 17": "19+",
    }

    return ratingMap[rating.toUpperCase()] || "N/A";
  };


  return (
    <RatingBadge $rating={rating}>{getDisplayRating(rating)}</RatingBadge>
  )
}

export default AgeRating;