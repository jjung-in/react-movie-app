import styled from "styled-components";
import { MovieDetails, MovieImages as Images, Video } from "../../types/movie.type";
import { Cast } from "../../types/credits.type";
import MovieCasts from "./MovieCasts";
import MovieVideos from "./MovieVideos";
import MovieImages from "./MovieImages";

interface Props {
  movie: MovieDetails;
  casts?: Cast[];
  videos?: Video[];
  images?: Images;
}

const MovieContents = ({ movie, casts, videos, images }: Props) => {
  // console.log(movie);

  return (
    <>
      <S.OverviewWrapper>
        <S.SubTitle>STORYLINE</S.SubTitle>
        <p>{movie.overview}</p>
      </S.OverviewWrapper>
      {casts && casts.length > 0 && <MovieCasts casts={casts} />}
      {videos && videos.length > 0 && <MovieVideos videos={videos} />}
      {images && <MovieImages images={images} />}
      {/* Watch now */}
      {/* Similar Movies */}
    </>
  )
}

export default MovieContents;

const S = {
  SubTitle: styled.h6`
    margin-bottom: 10px;
    font-size: 2rem;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.primaryText};
  `,

  OverviewWrapper: styled.div`
    
  `,
}