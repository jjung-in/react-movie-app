import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieAgeRating,
  fetchMovieSearch,
  fetchTopRatedMovies,
  fetchMovieVideos,
  fetchMovieImages,
} from "../api/tmdb";
import { MovieDetails, MovieImages, MovieVideos } from "../types/movie.type";
import { Credits } from "../types/credits.type";

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => fetchNowPlayingMovies({ pageParam: 1 }),
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => fetchUpcomingMovies({ pageParam: 1 }),
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => fetchPopularMovies({ pageParam: 1 }),
  });
};

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => fetchTopRatedMovies({ pageParam: 1 }),
  });
};

export const useNowPlayingMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["nowPlayingMovies", "infinite"],
    queryFn: fetchNowPlayingMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useUpcomingMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["upcomingMovies", "infinite"],
    queryFn: fetchUpcomingMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const usePopularMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["popularMovies", "infinite"],
    queryFn: fetchPopularMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useTopRatedMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["topRatedMovies", "infinite"],
    queryFn: fetchTopRatedMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useMovieSearchInfinite = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", "infinite", query],
    queryFn: ({ pageParam = 1 }) => fetchMovieSearch({ query, pageParam }), 
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery<Credits, Error>({
    queryKey: ["credits", movieId],
    queryFn: () => fetchMovieCredits(movieId),
  });
};

export const useMovieAgeRating = (movieId: number) => {
  return useQuery({
    queryKey: ["ageRating", movieId],
    queryFn: () => fetchMovieAgeRating(movieId),
  });
};

export const useMovieVideos = (movieId: number) => {
  const query = useQuery<MovieVideos, Error>({
    queryKey: ["videos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
  });
  return query;
};

export const useMovieImages = (movieId: number) => {
  const query = useQuery<MovieImages, Error>({
    queryKey: ["images", movieId],
    queryFn: () => fetchMovieImages(movieId),
  });
  return query;
};
