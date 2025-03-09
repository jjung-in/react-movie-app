import styled from 'styled-components';
import Container from '../components/common/Container';
import IconLink from '../components/common/IconLink';
import IconButton from '../components/common/IconButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { breakpoints } from '../styles/breakpoint';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { mutate, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        window.location.reload();
        navigate('/');
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.LogoLink to='/'>FilmSearch</S.LogoLink>
        <S.NavList>
          <li>
            <IconLink to='/search' icon={faMagnifyingGlass} />
          </li>
          <S.NavListItemWithDropdown>
            <IconButton icon={faUser} />
            <S.Dropdown>
              {isAuthenticated ? (
                <>
                  <li>
                    <S.DropdownLinkItem to='/favorites'>
                      <FontAwesomeIcon icon={faHeart} />
                      <span>Favorites</span>
                    </S.DropdownLinkItem>
                  </li>
                  <li>
                    <S.DropdownButtonItem onClick={handleLogout} disabled={isPending}>
                      <FontAwesomeIcon icon={faUser} />
                      <span>Logout</span>
                    </S.DropdownButtonItem>
                  </li>
                </>
              ) : (
                <li>
                  <S.DropdownLinkItem to='/login'>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Login</span>
                  </S.DropdownLinkItem>
                </li>
              )}
            </S.Dropdown>
          </S.NavListItemWithDropdown>
        </S.NavList>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
};

export default Header;

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

const S = {
  HeaderWrapper: styled.header`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: ${({ theme }) => theme.colors.background};
  `,

  HeaderContainer: styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;

    @media (max-width: ${breakpoints.tablet}) {
      height: 60px;
    }
  `,

  LogoLink: styled(Link)`
    @font-face {
      font-family: 'RixYeoljeongdo_Regular';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/RixYeoljeongdo_Regular.woff')
        format('woff');
      font-weight: normal;
      font-style: normal;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${({ theme }) => theme.colors.primary};
    font-family: 'RixYeoljeongdo_Regular';
    font-size: 1.5rem;
    letter-spacing: 1px;
    text-decoration: none;
  `,

  NavList: styled.ul`
    display: flex;
    gap: 10px;
    height: 100%;

    @media (max-width: ${breakpoints.mobile}) {
      gap: 5px;
    }
  `,

  DropdownLinkItem: styled(Link)`
    display: flex;
    align-items: center;
    padding: 10px 15px;

    svg {
      width: 15px;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  DropdownButtonItem: styled.button`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;

    svg {
      width: 15px;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Dropdown,
  NavListItemWithDropdown,
};
