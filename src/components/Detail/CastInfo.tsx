import styled from "styled-components";
import Container from "../../styles/Container";

const StyledContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Title = styled.h3`
  padding-bottom: 15px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const CastItem = styled.li`
  max-width: 145px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 145px;
  /* height: 225px; */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CastName = styled.span`
`;

const CastInfo = () => {
  return (
    <section>
      <StyledContainer>
        <Title>출연/제작</Title>
        <CastList>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/hNwZWdT2KxKj1YLbipvtUhNjfAp.jpg" alt="Movie Poster" />
            <CastName>에런 피어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/6kpDyaZzmSbqCNYuXZUfeMwS1bq.jpg" alt="Movie Poster" />
            <CastName>케빈 해리슨 주니어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/9LwqRFdSzxVtnutDUg98YLq0bSz.jpg" alt="Movie Poster" />
            <CastName>티파니 분</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/hNwZWdT2KxKj1YLbipvtUhNjfAp.jpg" alt="Movie Poster" />
            <CastName>에런 피어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/6kpDyaZzmSbqCNYuXZUfeMwS1bq.jpg" alt="Movie Poster" />
            <CastName>케빈 해리슨 주니어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/9LwqRFdSzxVtnutDUg98YLq0bSz.jpg" alt="Movie Poster" />
            <CastName>티파니 분</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/hNwZWdT2KxKj1YLbipvtUhNjfAp.jpg" alt="Movie Poster" />
            <CastName>에런 피어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/6kpDyaZzmSbqCNYuXZUfeMwS1bq.jpg" alt="Movie Poster" />
            <CastName>케빈 해리슨 주니어</CastName>
          </CastItem>
          <CastItem>
            <CastImage src="https://image.tmdb.org/t/p/w500/9LwqRFdSzxVtnutDUg98YLq0bSz.jpg" alt="Movie Poster" />
            <CastName>티파니 분</CastName>
          </CastItem>
        </CastList>
      </StyledContainer>
    </section>
  )
}

export default CastInfo;