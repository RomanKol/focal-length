/* eslint-disable
  react/jsx-filename-extension,
  import/no-named-as-default,
  import/no-named-as-default-member
  */


import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';

import App from './App';
import globalStyles from './globalStyles';

ReactDOM.render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>,
  document.querySelector('#app'),
);
