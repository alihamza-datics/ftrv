import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../../components/layout';
import Routes from '../../routes';
import ErrorBoundary from '../error/errorBoundry';
import { AuthProvider } from '../../context/authContext';
import './style.css';

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Layout>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  );
}
