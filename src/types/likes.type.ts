export type LikedMoviesList = LikedMovie[];

export interface LikedMovie {
  id: string;
  movieId: number;
  poster_path: string;
  title: string;
  userEmail: string;
}
