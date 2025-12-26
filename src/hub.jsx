import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>React Playground</h1>
            <p>Choose an experiment:</p>
            <nav style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="/circles.html">
                    <button>Circle Builder</button>
                </a>
                <a href="/gravity.html">
                    <button>Gravity Game</button>
                </a>
            </nav>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
