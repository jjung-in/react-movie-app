import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Container from "../../styles/Container";
import MovieItem from "./MovieItem";

interface MovieListProps {
  title: string;
  url: string;
}

const MovieListSection = styled.section`
  margin-bottom: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const SeeMoreLink = styled(Link)`
  display: flex;
  align-items: center;

  & > svg {
    margin-left: 5px;
  }
`;

const MovieListUl = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const MovieList = ({ title, url }: MovieListProps) => {
  return (
    <MovieListSection>
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          <SeeMoreLink to={`movies/${url}`}>더보기<FontAwesomeIcon icon={faAngleRight} />
          </SeeMoreLink>
        </TitleContainer>
        <MovieListUl>
          <MovieItem key={1} id={1} />
          <MovieItem key={2} id={2} />
          <MovieItem key={3} id={3} />
          <MovieItem key={4} id={4} />
        </MovieListUl>
      </Container>
    </MovieListSection>
  )
}

export default MovieList;