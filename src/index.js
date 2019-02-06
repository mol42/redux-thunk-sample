import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './App';
import './index.css';

// Add these imports - Step 1
// Provider is a helper class which helps
// connect function to find the global
// store easily
// Provider is a Context actually.
import { Provider } from 'react-redux';
// we use the store that we create in redux.js file
// and pass it to Provider class so that it
// becomes visible to whole React tree.
import { store } from './redux';

// Wrap existing app in Provider - Step 2
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
