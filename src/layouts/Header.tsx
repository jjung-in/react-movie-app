import styled from "styled-components";
import Container from "../styles/Container";
import IconLink from "../components/common/IconLink";
import IconButton from "../components/common/IconButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faSun, faUser } from "@fortawesome/free-regular-svg-icons";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const LogoLink = styled(Link)`
  @font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: 'RixYeoljeongdo_Regular';
  font-size: 2rem;
  letter-spacing: 1px;
  text-decoration: none;
  height: 100%;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  top: 60px;
  background: #000000; 
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const DropdownLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 15px;

  svg {
    width: 15px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const DropdownButtonItem = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  svg {
    width: 15px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const NavListItemWithDropdown = styled.li`
  position: relative;

  span {
    padding-left: 8px;
  }

  &:hover ${Dropdown} {
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
    <HeaderWrapper>
      <HeaderContainer>
        <LogoLink to="/">FilmSearch</LogoLink>
        <NavList>
          <li>
            <IconLink to="/search" icon={faMagnifyingGlass} />
          </li>
          <li>
            <IconButton icon={faSun} />
          </li>
          <NavListItemWithDropdown>
            <IconButton icon={faUser} />
            <Dropdown>
              {isAuthenticated ? (
                <>
                  <li>
                    <DropdownButtonItem>
                      <FontAwesomeIcon icon={faHeart} />
                      <span>Favorites</span>
                    </DropdownButtonItem>
                  </li>
                  <li>
                    <DropdownButtonItem onClick={handleLogout} disabled={isPending}>
                      <FontAwesomeIcon icon={faUser} />
                      <span>Logout</span>
                    </DropdownButtonItem>
                  </li>
                </>
              ) : (
                <li>
                  <DropdownLinkItem to="/login">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                  </DropdownLinkItem>
                </li>
              )}
            </Dropdown>
          </NavListItemWithDropdown>
        </NavList>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header;