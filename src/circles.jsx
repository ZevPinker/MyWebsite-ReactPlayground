import React from 'react';
import { createRoot } from 'react-dom/client';
import { CircleBuilder } from './components';
import './styles.css';

function App() {
    return (
        <div>
            <h1>Circles!</h1>
            <p>Click the STOP button to add circles. Drag them around!</p>
            <CircleBuilder />
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
