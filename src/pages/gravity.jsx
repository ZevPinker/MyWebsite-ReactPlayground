import React from 'react';
import { createRoot } from 'react-dom/client';
import { GravityGame } from '../components';
import '../styles.css';

function App() {
    return (
        <div className="app-container">
            <h1>Play this game first</h1>
            <p>be very careful...</p>
            <GravityGame />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
