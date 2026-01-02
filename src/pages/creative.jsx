import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

const projects = []
const categories = [
    { id: "all", label: "All Work" },
    { id: "music", label: "Music" },
    { id: "visual", label: "Visual" },
];



const ExternalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);



function PortfolioApp() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [hoveredProject, setHoveredProject] = useState(null);

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="portfolio-container">
            <div className="background-texture" />

            <header className="portfolio-header">
                <div className="header-accent" />
                <h1 className="portfolio-title">Creative Portfolio</h1>
                <p className="portfolio-subtitle">Selected work in art and music</p>
            </header>

            <nav className="filters">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`filter-button ${activeCategory === cat.id ? 'filter-button-active' : ''}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            <main className="projects-grid">
                {filteredProjects.map((project) => (
                    <article
                        key={project.id}
                        className={`project-card ${project.featured ? 'card-featured' : ''} ${hoveredProject === project.id ? 'card-hovered' : ''}`}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {project.featured && <span className="featured-badge">Featured</span>}

                        <div className="card-content">
                            <div className="category-indicator">
                                <span className={`category-dot ${project.category === 'software' ? 'dot-software' : 'dot-research'}`} />
                                <span className="category-label">{project.category === 'software' ? 'Software' : 'Research'}</span>
                            </div>

                            <h2 className="card-title">{project.title}</h2>
                            <p className="card-description">{project.description}</p>

                            <div className="tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="links">
                                {project.github && (
                                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <GitHubIcon />
                                        <span>Code</span>
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <ExternalIcon />
                                        <span>Live</span>
                                    </a>
                                )}
                                {project.publication && (
                                    <a href={project.publication} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <DocumentIcon />
                                        <span>Paper</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="corner-accent" />
                    </article>
                ))}
            </main>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<PortfolioApp />);

export default PortfolioApp;
