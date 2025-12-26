import React from 'react';
import { createRoot } from 'react-dom/client';
import { GravityGame } from './components';
import './styles.css';

function App() {
    return (
        <div>
            <h1>Arrow-Controlled Ball with Gravity</h1>
            <p>Use arrow keys to move and jump!</p>
            <GravityGame />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
