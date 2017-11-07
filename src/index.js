import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import { LOCALSTORAGE_KEY_AUTHENTICATION_TOKEN } from './constants';
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7jmvhsk08g001569gnwdhhg',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    const token = localStorage.getItem(LOCALSTORAGE_KEY_AUTHENTICATION_TOKEN)
    const reqHeaders = req.options.headers
      || {};

    req.options.headers = {
      ...reqHeaders,
      authorization: token
        ? `Bearer ${token}`
        : null,
    };

    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render((
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
