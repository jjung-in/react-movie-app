import { MovieDetails, MovieImages as Images, Video } from '../../types/movie.type';
import { Cast } from '../../types/credits.type';
import SubTitle from '../../components/common/SubTitle';
import MovieCasts from './MovieCasts';
import MovieVideos from './MovieVideos';
import MovieImages from './MovieImages';

interface Props {
  movie: MovieDetails;
  casts?: Cast[];
  videos?: Video[];
  images?: Images;
}

const MovieContents = ({ movie, casts, videos, images }: Props) => {
  return (
    <>
      <div>
        <SubTitle category='STORYLINE' />
        <p>{movie.overview}</p>
      </div>
      {casts && casts.length > 0 && <MovieCasts casts={casts} />}
      {videos && videos.length > 0 && <MovieVideos videos={videos} />}
      {images && <MovieImages images={images} />}
    </>
  );
};

export default MovieContents;
