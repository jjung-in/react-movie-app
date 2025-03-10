import { Release, ReleaseDate } from '../types/movie.type';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'en';
const BASE_REGION = 'US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchNowPlayingMovies = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=${pageParam}`,
    options
  );
  return await response.json();
};

export const fetchUpcomingMovies = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=${pageParam}`,
    options
  );
  return await response.json();
};

export const fetchPopularMovies = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=${pageParam}`,
    options
  );
  return await response.json();
};

export const fetchTopRatedMovies = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=${pageParam}`,
    options
  );
  return await response.json();
};

export const fetchMovieSearch = async ({ query, pageParam = 1 }: { query: string; pageParam: number }) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=${BASE_LANG}-${BASE_REGION}&page=${pageParam}`,
    options
  );
  return await response.json();
};

export const fetchMovieDetails = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?language=${BASE_LANG}-${BASE_REGION}`, options);
  return await response.json();
};

export const fetchMovieCredits = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=${BASE_LANG}-${BASE_REGION}`, options);
  return await response.json();
};

export const fetchMovieVideos = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=${BASE_LANG}-${BASE_REGION}`, options);
  return await response.json();
};

export const fetchMovieImages = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/images?language=${BASE_LANG}`, options);
  return await response.json();
};

export const fetchMovieRating = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/release_dates`, options);
  const data = await response.json();
  const usRelease = data.results.find((release: ReleaseDate) => release.iso_3166_1 === 'US');

  if (usRelease && usRelease.release_dates) {
    const rating = usRelease.release_dates.find((release: Release) => release.certification)?.certification;
    return rating || 'No Rating';
  }

  return 'No Rating';
};
