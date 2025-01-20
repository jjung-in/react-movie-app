import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies, fetchUpcomingMovies, fetchPopularMovies } from "../api/tmdb";

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
