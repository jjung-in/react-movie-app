import styled from "styled-components";
import { MovieImages as Images } from "../../types/movie.type";

interface Props {
  images: Images;
}

const MovieImages = ({ images }: Props) => {
  const backdropsImages = images?.backdrops;

  return (
    <>
      {backdropsImages && (
        <S.PhotosWrapper>
          <S.SubTitle>PHOTOS</S.SubTitle>
          <S.ImageList>
            {backdropsImages.map((images) => (
              <S.ImageItem key={images.file_path}>
                <img src={`https://image.tmdb.org/t/p/w780/${images.file_path}`} alt="" />
              </S.ImageItem>
            ))}
          </S.ImageList>
        </S.PhotosWrapper>
      )}
    </>
  )
}

export default MovieImages;

const S = {
  PhotosWrapper: styled.div`
  
  `,

  SubTitle: styled.h6`
    margin-bottom: 10px;
    font-size: 2rem;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  ImageList: styled.ul`
    /* background-color: gray; */
    display: flex;
  `,

  ImageItem: styled.li`
    /* background-color: pink; */
    flex-shrink: 0;

    & img {
      /* width: 145px; */
      /* height: 225px; */
      object-fit: cover;
      /* border-radius: 10px; */
    }
  `,
}