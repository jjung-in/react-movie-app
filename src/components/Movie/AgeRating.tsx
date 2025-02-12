import styled from "styled-components";

interface AgeRatingProps {
  rating: string;
  options?: {
    fontSize?: string;
  };
}

const RatingBadge = styled.span<{ $rating: string, $options: AgeRatingProps["options"] }>`
  display: inline-block;
  padding: 2.5px 5px;
  color: #fff;
  font-size: ${({ $options }) => $options?.fontSize || "1.5rem"};
  font-weight: bold;
  letter-spacing: 1px;
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

const AgeRating = ({ rating, options }: AgeRatingProps) => {

  const getDisplayRating = (rating: string): string => {
    const ratingMap: { [key: string]: string } = {
      "G": "ALL",
      "PG": "12+",
      "PG-13": "15+",
      "R": "19+",
      "NC-17": "19+",
    }

    return ratingMap[rating.toUpperCase()] || "N/A";
  };


  return (
    <RatingBadge $rating={rating} $options={options || {}}>{getDisplayRating(rating)}</RatingBadge>
  )
}

export default AgeRating;