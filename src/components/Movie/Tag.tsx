import styled from "styled-components";

interface Props {
  value: number | string;
  options?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
  };
}

const S = {
  TagBox: styled.span<{ $options: Record<string, any> }>`
    padding: 3px 8px;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    color: ${({ $options, theme }) => $options.color ? $options.color : theme.colors.secondaryText};
    font-size: ${({ $options }) => $options.fontSize ? $options.fontSize : '1.5rem'};
    font-weight: ${({ $options }) => $options.fontWeight ? $options.fontWeight : 'normal'};
    background-color: ${({ $options }) => $options.backgroundColor ? $options.backgroundColor : 'rgba(255,255,255, 0.2)'};
  `,
}

const genreMapping: any = {
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