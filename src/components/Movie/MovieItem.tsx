import styled from "styled-components"
import PosterImage from "./PosterImage";
import { Link } from "react-router-dom"

interface Props {
  id: number;
  title: string;
  poster_path: string
}

const Item = styled.li`
  flex: 0 0 240px;
  width: 240px;
  height: 360px;
  border-radius: 10px;
  overflow: hidden;
`;

const ItemLink = styled(Link)`
  position: relative;
  display: block;
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
  padding: 30px;
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
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const S = { Item, ItemLink, HoverInfo, Title };

const MovieItem = ({ id, title, poster_path }: Props) => {
  return (
    <S.Item>
      <S.ItemLink to={`/detail/${id}`}>
        <PosterImage poster_path={poster_path} />
        <S.HoverInfo><S.Title>{title}</S.Title></S.HoverInfo>
      </S.ItemLink>
    </S.Item>
  )
}

export default MovieItem;