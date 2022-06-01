import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Sample cho toàn bộ lab và project trong môn học Lập Trình Web Front-End với React với đầy đủ dependency.</p>
        <p>Phiên bản React hiện tại trên máy của bạn là: {React.version}</p>
        <p>Phiên bản React đã được sử dụng để thiết kế môn học: 16.14.0.</p>
      </header>
    </div>
  );
}

export default App;
