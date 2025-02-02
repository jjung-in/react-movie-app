import { useQuery } from "@tanstack/react-query";
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
    queryFn: fetchNowPlayingMovies,
  });
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: fetchUpcomingMovies,
  });
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
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
