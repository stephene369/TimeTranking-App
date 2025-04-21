import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <AuthProvider>
        <BrowserRouter>
          <TimerProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </TimerProvider>
        </BrowserRouter>
      </AuthProvider> 
    </ConfigProvider>
  </React.StrictMode>
);
