import styled from "styled-components"
import Container from "../styles/Container";
import MovieItem from "../components/Movie/MovieItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SearchInputWrapper = styled.div`
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

const MovieList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const Search = () => {
  return (
    <main>
      <section>
        <SearchContainer>
          <SearchInputWrapper>
            <SearchInput type="text" autoComplete="off" />
            <SearchButton><FontAwesomeIcon icon={faMagnifyingGlass} /></SearchButton>
          </SearchInputWrapper>
        </SearchContainer>
      </section>
      <section>
        <SearchContainer>
          <MovieList>
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
            <MovieItem id={134456} poster="sCqhG6ipHne0TgFzz2ZvOgIPtPh.jpg" />
          </MovieList>
        </SearchContainer>
      </section>
    </main>
  )
}

export default Search;