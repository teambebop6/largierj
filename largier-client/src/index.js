import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'semantic-ui-css/semantic.min.css';
import './../node_modules/video-react/dist/video-react.css';
import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.less';

const root = document.getElementById('root');

const provider = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(provider, root);
registerServiceWorker();
