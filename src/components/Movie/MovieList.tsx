import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Container from "../../styles/Container";
import MovieItem from "./MovieItem";

interface MovieListProps {
  title: string;
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

const MovieList = ({ title }: MovieListProps) => {
  return (
    <MovieListSection>
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          <SeeMoreLink to="#">더보기<FontAwesomeIcon icon={faAngleRight} />
          </SeeMoreLink>
        </TitleContainer>
        <MovieListUl>
          <MovieItem />
          <MovieItem />
          <MovieItem />
          <MovieItem />
        </MovieListUl>
      </Container>
    </MovieListSection>
  )
}

export default MovieList;