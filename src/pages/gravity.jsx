import React from 'react';
import { createRoot } from 'react-dom/client';
import { GravityGame } from '../components';
import '../styles.css';

function App() {
    return (
        <div className="app-container">
            <h1 className='cinzel-light'>Play this game first</h1>
            <p className="eb-garamond-light">be very careful...</p>
            <GravityGame />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
