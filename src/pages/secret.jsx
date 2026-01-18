import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

function PortfolioApp() {
    return (
        <div className="portfolio-container">
            <div className="background-texture" />

            <header className="portfolio-header">
                <div className="header-accent" />
                <h1 className="portfolio-title">Under Construction</h1>
                <p className="portfolio-subtitle">Check back soon for more shenanigans</p>
            </header>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<PortfolioApp />);

export default PortfolioApp;