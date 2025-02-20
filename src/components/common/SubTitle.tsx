import styled from "styled-components";

interface Props {
  category: string;
};

const titleMapping: Record<string, string> = {
  nowplaying: "Now Playing",
  upcoming: "Coming Soon",
  popular: "Popular Movies",
  toprated: "Top Rated",
  likes: "My Favorites",
};

const SubTitle = ({ category }: Props) => {
  const title = titleMapping[category] || category;

  return (
    <S.Title>{title}</S.Title>
  );
};

export default SubTitle;

const S = {
  Title: styled.h3`
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  `,
};