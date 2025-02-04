import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieAgeRating,
  fetchMovieSearch,
} from "../api/tmdb";

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

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ["details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery({
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

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchMovieSearch(query),
  });
};
