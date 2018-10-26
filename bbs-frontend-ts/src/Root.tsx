import App from 'components/App';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import { hot } from 'react-hot-loader';
import socket from 'lib/socket';

const store = configure();

const socketURI =
  process.env.NODE_ENV === 'production'
    ? window.location.protocol === `https:`
      ? `wss://${window.location.host}/user`
      : `ws://${window.location.host}/user`
    : 'ws://localhost:8080/user';

socket.initialize(store, socketURI);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default hot(module)(Root);
