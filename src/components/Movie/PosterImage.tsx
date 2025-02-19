import styled from "styled-components"

interface Props {
  poster_path: string;
}

const S = {
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
}

const PosterImage = ({ poster_path }: Props) => {
  return (
    <S.Image src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` : "/images/noimage.png"} />
  )
}

export default PosterImage;