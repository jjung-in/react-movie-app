import styled from "styled-components";
import Container from "../styles/Container";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../context/AuthContext";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderLink = styled(Link)`
  @font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  padding: 15px 0px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: 'RixYeoljeongdo_Regular';
  font-size: 2rem;
  letter-spacing: 1px;
  text-decoration: none;
`;

const StyledList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const StyledLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  right: 0;
  background: #000000; 
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const DropdownLink = styled(Link)`
  display: block;
  width: 100px;
  padding: 10px;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100px;
  padding: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const ListItemWithDropdown = styled.li`
  position: relative;

  span {
    padding-left: 8px;
  }

  &:hover ${DropdownMenu} {
    visibility: visible;
    opacity: 1;
  }
`;

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { mutate, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.log(error.message);
      }
    })
  }

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledHeaderLink to="/">FilmSearch</StyledHeaderLink>
        <StyledList>
          <li>
            <StyledLinkButton to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} /></StyledLinkButton>
          </li>
          <ListItemWithDropdown>
            <StyledLinkButton to="#"><FontAwesomeIcon icon={faUser} /></StyledLinkButton>
            <DropdownMenu>
              {isAuthenticated ? (
                <li>
                  <DropdownButton onClick={handleLogout} disabled={isPending}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Logout</span>
                  </DropdownButton>
                </li>
              ) : (
                <li>
                  <DropdownLink to="/login">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                  </DropdownLink>
                </li>
              )}
            </DropdownMenu>
          </ListItemWithDropdown>
        </StyledList>
      </StyledContainer>
    </StyledHeader >
  )
}

export default Header;