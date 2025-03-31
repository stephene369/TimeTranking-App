import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
