import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { Spin } from 'antd';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
