import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieRating,
  fetchMovieSearch,
  fetchTopRatedMovies,
  fetchMovieVideos,
  fetchMovieImages,
} from '../api/tmdb';
import { MovieDetails, MovieImages, MovieList, MovieVideos, SearchList } from '../types/movie.type';
import { Credits } from '../types/credits.type';

export const useNowPlayingMovies = () => {
  return useQuery<MovieList, Error>({
    queryKey: ['nowPlayingMovies'],
    queryFn: () => fetchNowPlayingMovies({ pageParam: 1 }),
  });
};

export const useUpcomingMovies = () => {
  return useQuery<MovieList, Error>({
    queryKey: ['upcomingMovies'],
    queryFn: () => fetchUpcomingMovies({ pageParam: 1 }),
  });
};

export const usePopularMovies = () => {
  return useQuery<MovieList, Error>({
    queryKey: ['popularMovies'],
    queryFn: () => fetchPopularMovies({ pageParam: 1 }),
  });
};

export const useTopRatedMovies = () => {
  return useQuery<MovieList, Error>({
    queryKey: ['topRatedMovies'],
    queryFn: () => fetchTopRatedMovies({ pageParam: 1 }),
  });
};

export const useNowPlayingMoviesInfinite = () => {
  return useInfiniteQuery<MovieList, Error>({
    queryKey: ['nowPlayingMovies', 'infinite'],
    queryFn: ({ pageParam }) => fetchNowPlayingMovies({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useUpcomingMoviesInfinite = () => {
  return useInfiniteQuery<MovieList, Error>({
    queryKey: ['upcomingMovies', 'infinite'],
    queryFn: ({ pageParam }) => fetchUpcomingMovies({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const usePopularMoviesInfinite = () => {
  return useInfiniteQuery<MovieList, Error>({
    queryKey: ['popularMovies', 'infinite'],
    queryFn: ({ pageParam }) => fetchPopularMovies({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useTopRatedMoviesInfinite = () => {
  return useInfiniteQuery<MovieList, Error>({
    queryKey: ['topRatedMovies', 'infinite'],
    queryFn: ({ pageParam }) => fetchTopRatedMovies({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useMovieSearchInfinite = (query: string) => {
  return useInfiniteQuery<SearchList, Error>({
    queryKey: ['search', 'infinite', query],
    queryFn: ({ pageParam = 1 }) => fetchMovieSearch({ query, pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useMovieDetails = (movieId?: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ['details', movieId],
    queryFn: () => {
      if (!movieId) throw new Error('Movie ID is required');
      return fetchMovieDetails(movieId);
    },
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery<Credits, Error>({
    queryKey: ['credits', movieId],
    queryFn: () => fetchMovieCredits(movieId),
  });
};

export const useMovieVideos = (movieId: number) => {
  const query = useQuery<MovieVideos, Error>({
    queryKey: ['videos', movieId],
    queryFn: () => fetchMovieVideos(movieId),
  });
  return query;
};

export const useMovieImages = (movieId: number) => {
  const query = useQuery<MovieImages, Error>({
    queryKey: ['images', movieId],
    queryFn: () => fetchMovieImages(movieId),
  });
  return query;
};

export const useMovieRating = (movieId?: number) => {
  return useQuery<string, Error>({
    queryKey: ['rating', movieId],
    queryFn: () => {
      if (!movieId) throw new Error('Movie ID is required');
      return fetchMovieRating(movieId);
    },
  });
};
