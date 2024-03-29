import ExtraBoldFont from "@fonts/Montserrat-ExtraBold.woff2";
import RegularFont from "@fonts/Montserrat-Regular.woff2";
import SemiBoldFont from "@fonts/Montserrat-SemiBold.woff2";
import {createGlobalStyle} from "styled-components";
import normalize from "styled-normalize";

const BaseStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: "Montserrat";
    src: url(${ExtraBoldFont}) format("woff2");
    font-display: swap;
    font-weight: 800;
  }

  @font-face {
    font-family: "Montserrat";
    src: url(${RegularFont}) format("woff2");
    font-display: swap;
    font-weight: 400;
  }

  @font-face {
    font-family: "Montserrat";
    src: url(${SemiBoldFont}) format("woff2");
    font-display: swap;
    font-weight: 600;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    font-family: ${({theme}) => theme.fontFamilies.montserrat};
    font-weight: 400;
    font-size: ${({theme}) => theme.fontSizes.md};
    color: ${({theme}) => theme.colors.textPrimary.main};
    min-width: 320px;
    background-color: ${({theme}) => theme.colors.background.main};

    &.lock {
      overflow: hidden;
    }
  }

  button {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  input {
    background: transparent;
    border: none;
  }

  input::-ms-clear,
  input[type=password]::-ms-reveal {
    display: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ::selection {
    color: ${({theme}) => theme.colors.background.main};
    background: ${({theme}) => theme.colors.secondary.main};
  }
`;

export default BaseStyle;
