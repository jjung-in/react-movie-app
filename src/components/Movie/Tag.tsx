import styled from "styled-components";

interface Props {
  value: number | string;
  options?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
  };
};

const genreMapping: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
}

const Tag = ({ value, options }: Props) => {
  return (
    <S.TagBox $options={options || {}}>{typeof value === "number" ? genreMapping[value] : value}</S.TagBox>
  )
}

export default Tag;

const S = {
  TagBox: styled.span<{ $options: Props["options"] }>`
    padding: 3px 8px;
    border-radius: 20px;
    color: ${({ $options, theme }) => $options?.color || theme.colors.secondaryText};
    font-size: ${({ $options }) => $options?.fontSize || '1.5rem'};
    font-weight: ${({ $options }) => $options?.fontWeight || 'normal'};
    letter-spacing: 1px;
    backdrop-filter: blur(5px);
    background-color: ${({ $options }) => $options?.backgroundColor || 'rgba(255,255,255, 0.2)'};
  `,
};