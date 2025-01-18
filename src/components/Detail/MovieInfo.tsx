import styled from "styled-components"
import Container from "../../styles/Container";
import AgeRating from "../Movie/AgeRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled(Container)`
  display: flex;
  gap: 50px;
  padding-top: 20px;
`;

const PosterWrapper = styled.div`
  flex: 0 0 auto;
`;

const PosterImage = styled.img`
  width: 240px;
  height: 360px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const FavoriteButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2.5rem;
  cursor: pointer;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.pointText};
  }
`;

const InfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const InfoItem = styled.li`
  position: relative;
  padding-left: 15px;

  &::before {
    position: absolute;
    content: "•";
    left: 0;
  }
`;

const Tagline = styled.p`
  margin: 30px 0;
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  letter-spacing: 2px;
`;

const Description = styled.p`
  line-height: 1.8;
`;

const MovieInfo = () => {
  return (
    <section>
      <StyledContainer>
        <PosterWrapper>
          <PosterImage src="https://placehold.co/240x360" alt="Movie Poster" />
        </PosterWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <Title>무파사: 라이온 킹 (2024)</Title>
            <FavoriteButton><FontAwesomeIcon icon={faHeart} /></FavoriteButton>
          </TitleWrapper>
          <InfoList>
            <InfoItem><AgeRating rating="PG" /></InfoItem>
            <InfoItem>개봉일&nbsp;&nbsp;|&nbsp;&nbsp;2024-12-18</InfoItem>
            <InfoItem>러닝타임&nbsp;&nbsp;|&nbsp;&nbsp;118분</InfoItem>
            <InfoItem>장르&nbsp;&nbsp;|&nbsp;&nbsp;모험, 가족, 애니메이션</InfoItem>
          </InfoList>
          <Tagline>"&nbsp;&nbsp;하나의 왕좌, 엇갈린 운명&nbsp;&nbsp;"</Tagline>
          <Description >길을 잃고 혼자가 된 새끼 사자 무파사는 광활한 야생을 떠돌던 중 왕의 혈통이자 예정된 후계자 타카와 우연히 만나게 된다. 마치 친형제처럼 끈끈한 우애를 나누며 함께 자란 무파사와 타카는 운명을 개척하기 위해 거대한 여정을 함께 떠난다. 한 치 앞을 알 수 없는 적들의 위협 속에서 두 형제의 끈끈했던 유대에 금이 가기 시작하고 예상치 못한 위기까지 맞닥뜨리게 되는데…</Description>
        </ContentWrapper>
      </StyledContainer>
    </section>
  )
}

export default MovieInfo;