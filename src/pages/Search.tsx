import styled from "styled-components"
import Container from "../styles/Container";
import MovieItem from "../components/Movie/MovieItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useMovieSearch, usePopularMovies } from "../hooks/useMovies";

const SearchContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  height: 40px;
  background-color: #000000;
  border-radius: 30px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1 1 auto;
  padding: 0 20px;
`;

const SearchButton = styled.button`
  padding: 12px 20px 10px 10px;
  cursor: pointer;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const Search = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const { data: popularMovies, isLoading: popularLoading, isError: popularError, error: popularErrorMsg } = usePopularMovies();
  const { data: searchMovies, isLoading: searchLoading, isError: searchError, error: searchErrorMsg } = useMovieSearch(query);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(text);
  }

  if (popularLoading || searchLoading) {
    return <div>Loading...</div>;
  }

  if (popularError || searchError) {
    return <div>Error: {searchErrorMsg instanceof Error ? searchErrorMsg.message : 'Something went wrong'}</div>;
  }

  return (
    <main>
      <section>
        <SearchContainer>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput type="text" autoComplete="off" onChange={(e) => setText(e.target.value)} />
            <SearchButton><FontAwesomeIcon icon={faMagnifyingGlass} /></SearchButton>
          </SearchForm>
        </SearchContainer>
      </section>
      <section>
        <SearchContainer>
          <Title>{query ? `Search Results for "${query}"` : "Popular Movies"}</Title>
          <MovieList>
            {(query ? searchMovies : popularMovies)?.results?.map((movie: { id: number, movieId: number, poster_path: string }) => (
              <MovieItem key={movie.id} id={movie.id} poster={movie.poster_path} />
            ))}
          </MovieList>
        </SearchContainer>
      </section>
    </main>
  )
}

export default Search;