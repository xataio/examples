import { css } from '@emotion/react';

export const GlobalStyle = css`
  html {
    font-family: 'Inter', sans-serif;
    scroll-behavior: smooth;
  }
  body {
    max-width: 100vw;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }
  @font-face {
    font-family: 'Inter var';
    font-weight: 100 900;
    font-display: swap;
    font-style: normal;
    font-named-instance: 'Regular';
    src: url('/Inter-roman.var.woff2?v=3.19') format('woff2');
  }
  @font-face {
    font-family: 'Inter var';
    font-weight: 100 900;
    font-display: swap;
    font-style: italic;
    font-named-instance: 'Italic';
    src: url('/Inter-italic.var.woff2?v=3.19') format('woff2');
  }

  @font-face {
    font-family: 'JetBrainsMono';
    src: url('/JetBrainsMono-Medium.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  div[data-rehype-pretty-code-fragment] {
    width: 100%;
    max-width: 800px;
    margin: auto;
    margin-top: 0;
    overflow: hidden;
    border-radius: 0.5rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
    pre > code {
      display: grid;
      background: var(--chakra-colors-codeBg);
      padding: 1rem 0;
      font-size: 0.9rem;
      overflow: auto;
      font-family: 'JetBrainsMono', monospace;
      max-height: 100vh;
      overflow-y: auto;
    }

    div[data-rehype-pretty-code-title] {
      background: var(--chakra-colors-codeHeaderBg);
      border-top-right-radius: var(--chakra-radii-md);
      border-top-left-radius: var(--chakra-radii-md);
      color: var(--chakra-colors-gray-50);
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
    }

    div[data-rehype-pretty-code-title] + pre > code {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    [data-highlighted-chars-wrapper] {
      background: var(--chakra-colors-gray-500);
      color: var(--chakra-colors-text) !important;
      > * {
        color: var(--chakra-colors-text) !important;
      }
    }
    [data-highlighted-line] {
      background: var(--chakra-colors-whiteAlpha-100);
      border-left: 2px solid var(--chakra-colors-gray-400) !important;
    }

    code [data-line] {
      padding: 0 1rem;
    }

    code[data-line-numbers] [data-line] {
      padding-left: 0;
    }
    code[data-line-numbers] > [data-line]::before {
      counter-increment: line;
      content: counter(line);

      /* Other styling */
      display: inline-block;
      width: 1rem;
      margin-right: 1rem;
      text-align: right;
      color: var(--chakra-colors-gray-500);
    }

    code[data-line-numbers-max-digits='2'] > [data-line]::before {
      width: 2rem;
    }

    code[data-line-numbers-max-digits='3'] > [data-line]::before {
      width: 3rem;
    }
  }

  .chakra-ui-light .snippet--hasTabs,
  .chakra-ui-light div[data-rehype-pretty-code-fragment] {
    box-shadow:
      0 0 0 8px var(--chakra-colors-blackAlpha-100),
      0 0 1px var(--chakra-colors-stroke);
  }

  .chakra-ui-dark .snippet--hasTabs,
  .chakra-ui-dark div[data-rehype-pretty-code-fragment] {
    box-shadow:
      0 0 0 8px var(--chakra-colors-whiteAlpha-50),
      0 0 1px var(--chakra-colors-gray-500);
  }

  // snippet with tabs need some adjustments
  .snippet--hasTabs {
    max-width: 800px;
  }
  .snippet--hasTabs div[data-rehype-pretty-code-fragment] {
    border-radius: 0;
    box-shadow: none;
  }

  h1,
  H2,
  H3,
  H4,
  H5,
  H6 {
    code {
      font-size: inherit !important;
      background: var(--chakra-colors-blackAlpha-500);
    }
  }

  .tabSwiper {
    padding: 8px 40px;
    position: relative;
    max-width: 100%;

    .swiper-button-prev,
    .swiper-button-next {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      top: 32px;
      box-shadow: var(--chakra-shadows-md);
      color: var(--chakra-colors-primary);
      text-decoration: none;
      cursor: pointer;
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .swiper-button-prev {
      left: 0;
      background: linear-gradient(to right, var(--chakra-colors-gray-700), transparent);
    }

    .swiper-button-next {
      right: 0;
      background: linear-gradient(to left, var(--chakra-colors-gray-700), transparent);
    }

    .swiper-slide {
      width: auto;
    }
  }

  .tabSwiper.tabSwiper--isSnippet {
    .swiper-button-prev {
      left: 0;
      top: 26px;
      background: linear-gradient(to right, var(--chakra-colors-gray-600), transparent);
    }

    .swiper-button-next {
      right: 0;
      top: 26px;
      background: linear-gradient(to left, var(--chakra-colors-gray-600), transparent);
    }
  }

  .chakra-ui-light .tabSwiper {
    .swiper-button-prev,
    .swiper-button-next {
      background: var(--chakra-colors-bg);
    }
  }

  .chakra-ui-dark .tabSwiper {
    .swiper-button-prev,
    .swiper-button-next {
      background: var(--chakra-colors-bg);
    }
  }

  /* clears the ‘X’ from Internet Explorer */
  input[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  input[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  /* clears the ‘X’ from Chrome/Safari */
  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    display: none;
  }
`;
