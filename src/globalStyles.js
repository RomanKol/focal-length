import { css } from '@emotion/core';

export default css`
  html {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }

  body {
    background:
      linear-gradient(170deg, hsla(0, 0%, 100%, .9) 20%, hsla(0, 0%, 100%, 0) 50%),
      linear-gradient(180deg, hsl(212, 92%, 77%) 50%, hsla(212, 100%, 71%, 0.3) 100%);
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  h1,
  h2,
  h3 {
    font-weight: normal;
    margin: 1rem 0 1.5rem;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.75em;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1em;
    font-weight: normal;
    margin: .5rem 0 .75rem;
  }

  h1 ~ p {
    font-size: 1.2em;
    font-weight: lighter;
    margin: .5rem 0 .75rem;
  }

  pre {
    font-family: 'Courier New', Courier, monospace;
    color: white;
    background: linear-gradient(170deg, #282c34 66%, #424751);
    padding: 1em;
    width: 100%;
    overflow: auto;
  }
`;
