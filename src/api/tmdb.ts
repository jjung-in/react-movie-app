const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_LANG = "ko";
const BASE_REGION = "KR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchNowPlayingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=1`,
    options
  );
  return await response.json();
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=1`,
    options
  );
  return await response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${BASE_LANG}-${BASE_REGION}&page=1`,
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

export const fetchMovieAgeRating = async (movieId: number) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/release_dates`, options);
  const data = await response.json();
  const usRelease = data.results.find((release: any) => release.iso_3166_1 === "US");

  if (usRelease && usRelease.release_dates) {
    const ageRating = usRelease.release_dates.find((release: any) => release.certification)?.certification;
    return ageRating || "No Rating";
  }

  return "No Rating";
};

export const fetchMovieSearch = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search/movie?query=${query}&language=${BASE_LANG}-${BASE_REGION}`, options);
  return await response.json();
};
