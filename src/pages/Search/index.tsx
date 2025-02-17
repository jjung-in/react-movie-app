import SearchSection from "./SearchSection";
import MovieListSection from "./MovieListSection";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const { category: state } = location.state || { category: "popular" };
  const [category, setCategory] = useState(state);
  const [search, setSearch] = useState("");

  return (
    <main>
      <SearchSection setCategory={setCategory} setSearch={setSearch} />
      <MovieListSection category={category} search={search} />
    </main>
  )
}

export default Search;