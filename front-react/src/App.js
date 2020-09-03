import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello world!</p>
        <button
          className="btn"
          onClick={() => alert('I am globally styled')}>
          I am button 1 - Press Me
        </button>
      </header>
    </div>
  );
}

export default App;
