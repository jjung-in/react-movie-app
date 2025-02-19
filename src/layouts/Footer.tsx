import styled from "styled-components";
import Container from "../styles/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { breakpoints } from "../styles/breakpoint";

const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <span>Copyright 2025. jjung-in.</span>
        <a href="https://github.com/jjung-in" target="_blank" rel="noopener noreferrer" aria-label="Visit jjung-in's GitHub profile"><FontAwesomeIcon icon={faGithub} /></a>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
};

export default Footer;

const S = {
  FooterWrapper: styled.footer`
    border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
  `,

  FooterContainer: styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 1px;
    height: 100px;

    span {
      font-size: 0.8rem;
    }

    a {
      font-size: 1.5rem;

      &:hover {
        color: ${({ theme }) => theme.colors.primaryText};
      }
    }

    @media (max-width: ${breakpoints.tablet}) {
      height: 80px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      height: 60px;
    }
  `,
};