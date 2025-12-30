import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function CubeButton({ children, href }) {
  return (
    <a href={href}>
      <button className="btn cube cube-hover" type="button">
        <div className="bg-top"><div className="bg-inner" /></div>
        <div className="bg-right"><div className="bg-inner" /></div>
        <div className="bg"><div className="bg-inner" /></div>
        <div className="text">{children}</div>
      </button>
    </a>
  );
}

function App() {
  return (
    <div className="app-container">
      <h1>Zev Pinker</h1>
      <nav className="nav-col">
        <CubeButton href="/circles.html">Circle Builder</CubeButton>
        <CubeButton href="/gravity.html">Gravity Game</CubeButton>
        <CubeButton href="portfolio.html">My Portfolio</CubeButton>
      </nav>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);