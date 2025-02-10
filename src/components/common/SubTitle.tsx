import styled from "styled-components";

interface Props {
  url: string;
}

const S = {
  Title: styled.h3`
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.primaryText};
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
  `,
}

const titleMapping: Record<string, string> = {
  nowplaying: "Now Playing",
  upcoming: "Coming Soon",
  popular: "Popular Movies",
  toprated: "Top Rated",
  like: "Favorites",
}

const SubTitle = ({ url }: Props) => {
  const title = titleMapping[url] || "Now Playing";

  return (
    <S.Title>{title}</S.Title>
  )
}

export default SubTitle;