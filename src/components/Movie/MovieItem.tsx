import styled from "styled-components"
import PosterImage from "./PosterImage";
import { Link } from "react-router-dom"
import { breakpoints } from "../../styles/breakpoint";

interface Props {
  id: number;
  title: string;
  poster_path: string
};

const MovieItem = ({ id, title, poster_path }: Props) => {
  return (
    <S.Item>
      <S.ItemLink to={`/detail/${id}`}>
        <PosterImage poster_path={poster_path} />
        <S.HoverInfo><S.Title>{title}</S.Title></S.HoverInfo>
      </S.ItemLink>
    </S.Item>
  );
};

export default MovieItem;

const Item = styled.div`
  flex: 0 0 240px;
  width: 240px;
  height: 360px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    flex: 0 0 200px;
    width: 200px;
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 160px;
    width: 160px;
    height: 240px;
  }
`;

const ItemLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const HoverInfo = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; 
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: all 0.5s ease; 

  ${ItemLink}:hover & {
    opacity: 1;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const S = { Item, ItemLink, HoverInfo, Title };