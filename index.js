/* eslint-disable
  react/jsx-filename-extension,
  import/no-named-as-default,
  import/no-named-as-default-member
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';

import './src/styles.css';

ReactDOM.render(
  <App />,
  document.querySelector('#app'),
);

module.hot.accept();
