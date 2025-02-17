import SearchSection from "./SearchSection";
import MovieListSection from "./MovieListSection";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const { category } = location.state || { category: "popular" };
  const [search, setSearch] = useState("");

  // const { data: movies, isFetching: isMoviesFetching, fetchNextPage: moviesFetchNextPage, hasNextPage: moviesHasNextPage } = queryResult;
  // const { data: searchMovies, isFetching: isSearchFetching, fetchNextPage: searchFetchNextPage, hasNextPage: searchHasNextPage } = useMovieSearchInfinite(search);

  return (
    <main>
      <SearchSection setSearch={setSearch} />
      <MovieListSection category={category} search={search} />
    </main>
  )
}

export default Search;