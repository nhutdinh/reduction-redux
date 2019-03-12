import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index.reducer'

import App from './App';

const middleware = [ thunk ]
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
