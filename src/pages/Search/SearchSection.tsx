import styled from "styled-components";
import Container from "../../styles/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClapperboard, faCrown, faFire, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchSection = ({ setCategory, setSearch }: Props) => {
  const [text, setText] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text) {
      setSearch(text);
    }
  }

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    setSearch("");
    setText("");
  }

  return (
    <section>
      <S.Container>
        <S.SearchForm onSubmit={handleSearch}>
          <S.SearchInput type="text" autoComplete="off" value={text} onChange={(e) => setText(e.target.value)} />
          <S.SearchButton><FontAwesomeIcon icon={faMagnifyingGlass} /></S.SearchButton>
        </S.SearchForm>
        <S.ButtonGroup>
          <S.StyledButton type="button" onClick={() => handleCategoryClick("nowplaying")}><FontAwesomeIcon icon={faClapperboard} /></S.StyledButton>
          <S.StyledButton type="button" onClick={() => handleCategoryClick("upcoming")}><FontAwesomeIcon icon={faCalendar} /></S.StyledButton>
          <S.StyledButton type="button" onClick={() => handleCategoryClick("popular")}><FontAwesomeIcon icon={faFire} /></S.StyledButton>
          <S.StyledButton type="button" onClick={() => handleCategoryClick("toprated")}><FontAwesomeIcon icon={faCrown} /></S.StyledButton>
        </S.ButtonGroup>
      </S.Container>
    </section>
  )
}

export default SearchSection;

const S = {
  Container: styled(Container)`
    display: flex;
    gap: 10px;
    padding-top: 30px;
    padding-bottom: 40px;
  `,

  SearchForm: styled.form`
    flex: 1;
    display: flex;
    height: 40px;
    background-color: #000000;
    border-radius: 30px;
    overflow: hidden;
  `,

  SearchInput: styled.input`
    flex: 1;
    padding: 0 20px;
  `,

  SearchButton: styled.button`
    padding: 12px 20px 10px 10px;
    cursor: pointer;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 5px;
  `,

  StyledButton: styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    font-size: 2rem;
    border-radius: 10px;
    background-color: #000000;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryText};
    }
  `,
};