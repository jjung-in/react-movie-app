import styled from "styled-components";
import Container from "../styles/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const StyledFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  letter-spacing: 1px;

  span {
    font-size: 1.2rem;
  }
  a {
    font-size: 2.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryText};
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <span>Copyright 2025. jjung-in.</span>
        <a href="https://github.com/jjung-in" target="_blank" rel="noopener noreferrer" aria-label="Visit jjung-in's GitHub profile"><FontAwesomeIcon icon={faGithub} /></a>
      </StyledContainer>
    </StyledFooter>
  )
}

export default Footer;