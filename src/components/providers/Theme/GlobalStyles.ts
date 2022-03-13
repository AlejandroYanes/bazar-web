import { createGlobalStyle, css } from 'styled-components';

const mobileStyles = css`
  body {
    background-color: ${({ theme }) => theme.colors.BACKGROUND};
    color: ${({ theme }) => theme.colors.FONT};
  }

  *::selection, input::selection, textarea::selection {
    background-color: ${({ theme }) => theme.colors.BRAND_BG};
    color: ${({ theme }) => theme.colors.BACKGROUND_LIGHTER};
  }

  div, section, article, aside, main, header, footer {
    box-sizing: border-box;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }
`;

export const PrimaryGlobalStyles = createGlobalStyle`
  ${mobileStyles};

  * {
    -webkit-tap-highlight-color: transparent;
  }
`;
