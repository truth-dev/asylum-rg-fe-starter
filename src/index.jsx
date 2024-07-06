import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  // useHistory,
  Switch,
} from 'react-router-dom';

import { Auth0Provider } from '@auth0/auth0-react';
import  Profile  from './auth/profile';
import  ProtectedRoute from './auth/protect';

import 'antd/dist/antd.less';
import { NotFoundPage } from './components/pages/NotFound';
import { LandingPage } from './components/pages/Landing';

import { FooterContent, SubFooter } from './components/Layout/Footer';
import { HeaderContent } from './components/Layout/Header';

// import { TablePage } from './components/pages/Table';

import { Layout } from 'antd';
import GraphsContainer from './components/pages/DataVisualizations/GraphsContainer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './state/reducers';
import { colors } from './styles/data_vis_colors';

const { primary_accent_color } = colors;

const domain ='dev-s6geob7upopv1sg5.us.auth0.com';
const clientId ='u3gZxVVKTrVbDq2uvhRMkmYLoBikQNMx';

console.log("domain:", domain);
console.log("clientId:", clientId);

if(!domain || !clientId) {
  console.error("missing auth0 domain or client id in src/index.jsx");
}

const store = configureStore({ reducer: reducer });
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

export function App() {
  const { Footer, Header } = Layout;
  return (
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin + '/profile',
    }}
    useRefreshTokens={true}
    cacheLocation={'localstorage'}

    >
    <Layout>
      <Header
        style={{
          height: '10vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: primary_accent_color,
        }}
      >
        <HeaderContent />
      </Header>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/graphs"  component={GraphsContainer} />
        <ProtectedRoute path="/profile"  exact component={Profile} />
        <Route component={NotFoundPage} />

      </Switch>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          color: '#E2F0F7',
        }}
      >
        <FooterContent />
      </Footer>
      <Footer
        style={{
          backgroundColor: primary_accent_color,
          padding: 0,
        }}
      >
        <SubFooter />
      </Footer>
    </Layout>
    </Auth0Provider>
  );
}
