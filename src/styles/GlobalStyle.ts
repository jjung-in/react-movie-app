import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './breakpoint';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    html {
      font-size: 15px;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.basic};
    font-family: 'NanumSquare';
  }
`;
