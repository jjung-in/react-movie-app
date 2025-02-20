import styled from "styled-components";
import Container from "../../styles/Container";
import TooltipButton from "./TooltipButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClapperboard, faCrown, faFire, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { breakpoints } from "../../styles/breakpoint";
import { useState } from "react";

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchSection = ({ setCategory, setSearch }: Props) => {
  const [text, setText] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text) {
      setSearch(text);
    }
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
    setSearch("");
    setText("");
  };

  return (
    <section>
      <S.Container>
        <S.SearchForm onSubmit={handleSearch}>
          <S.SearchInput type="text" autoComplete="off" value={text} onChange={(e) => setText(e.target.value)} />
          <S.SearchButton><FontAwesomeIcon icon={faMagnifyingGlass} /></S.SearchButton>
        </S.SearchForm>
        <S.ButtonGroup>
          <TooltipButton tooltipText="Now Playing" category="nowplaying" onClick={(category) => handleCategoryClick(category)} options={{ width: "100%" }}><FontAwesomeIcon icon={faClapperboard} /></TooltipButton>
          <TooltipButton tooltipText="Coming Soon" category="upcoming" onClick={(category) => handleCategoryClick(category)} options={{ width: "100%" }}><FontAwesomeIcon icon={faCalendar} /></TooltipButton>
          <TooltipButton tooltipText="Populars Movies" category="popular" onClick={(category) => handleCategoryClick(category)} options={{ width: "100%" }}><FontAwesomeIcon icon={faFire} /></TooltipButton>
          <TooltipButton tooltipText="Top Rated" category="toprated" onClick={(category) => handleCategoryClick(category)} options={{ width: "100%" }}><FontAwesomeIcon icon={faCrown} /></TooltipButton>
        </S.ButtonGroup>
      </S.Container>
    </section>
  );
};

export default SearchSection;

const S = {
  Container: styled(Container)`
    display: flex;
    gap: 10px;
    padding-top: 30px;
    padding-bottom: 40px;

    @media (max-width: ${breakpoints.tablet}) {
      padding-top: 20px;
      padding-bottom: 30px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
    }
  `,

  SearchForm: styled.form`
    flex: 1;
    display: flex;
    height: 40px;
    background-color: #000000;
    border-radius: 30px;
    overflow: hidden;

    @media (max-width: ${breakpoints.mobile}) {
      flex: 0 0 40px;
    }
  `,

  SearchInput: styled.input`
    flex: 1;
    min-width: 0;
    padding: 0 20px;
  `,

  SearchButton: styled.button`
    padding: 2px 20px 0px;
    cursor: pointer;
  `,

  ButtonGroup: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;

    @media (max-width: ${breakpoints.mobile}) {
      gap: 1rem;
    }
  `,
};