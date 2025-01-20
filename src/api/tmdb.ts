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
