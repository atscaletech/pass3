import React from 'react';
import routes from './router';
import { useRoutes } from 'react-router-dom';
import Layout from 'components/Layout';
import './App.css';

function App() {
  const element = useRoutes(routes);

  return (
    <div className='App'>
      <Layout>{element}</Layout>
    </div>
  );
}

export default App;
