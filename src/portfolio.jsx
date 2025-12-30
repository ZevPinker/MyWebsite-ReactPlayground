import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Portfolio data - customize with your actual projects
const projects = [
    {
        id: 1,
        title: "Energy Markets Dashboard",
        description: "Interactive visualization of ISO New England electricity market data with real-time price tracking, demand forecasting displays, and historical trend analysis using D3.js.",
        tags: ["React", "D3.js", "Energy Systems", "Data Visualization"],
        github: "https://github.com/ZevPinker/EnergyMarketsDashboard",
        category: "software",
        featured: true,
    },
    {
        id: 2,
        title: "U.S. Offshore Wind Development Policy Review",
        description: "An analysis of the stages of domestic offshore wind energy development between 2024 and 2025 (post OBBBA) based on the National Renewable Energy Laboratory annual report.",
        tags: ["Renewables", "Offshore Wind", "Clean Energy", "Policy", "Market"],
        publication: "https://cleanenergyforum.yale.edu/2025/07/30/us-offshore-wind-development-policy-review",
        category: "research",
        featured: true,
    },
    {
        id: 3,
        title: "Optimal Power Flow Research",
        description: "Capstone research exploring computational approaches to nonconvex OPF problems, investigating convex relaxations and learning-augmented optimization methods for power systems.",
        tags: ["in-progress", "Optimization", "Power Systems", "Research", "Python"],
        category: "research",
        featured: true,
    },
    {
        id: 4,
        title: "Economic Dispatch Optimizer",
        description: "Implementation of analytical and numerical optimization methods for economic dispatch, including dual gradient ascent, Newton's method, and BFGS with transmission loss modeling.",
        tags: ["Python", "Optimization", "Energy", "Numerical Methods"],
        publication: "https://available-act-9fb.notion.site/Applied-Planning-and-Optimization-Final-Project-2cdf2c8889d980bbb4f9d687128dc5ca",
        category: "software",
        featured: false,
    },
    {
        id: 5,
        title: "CT Demand Response Analysis",
        description: "IAD framework analysis of Connecticut's demand response aggregation markets, examining ISO-NE market structures and curtailment service provider regulations.",
        tags: ["Policy Analysis", "Energy Markets", "Research"],
        category: "research",
        featured: false,
    },
    {
        id: 6,
        title: "Gravity Games",
        description: "Multi-page React application featuring physics-based gravity games with interactive SVG components and smooth animations.",
        tags: ["in-progress", "React", "SVG", "Games", "Physics"],
        github: "https://github.com/ZevPinker/MyWebsite-ReactPlayground.git",
        live: "https://zevpinker.com/gravity.html",
        category: "software",
        featured: false,
    },
];

const categories = [
    { id: "all", label: "All Work" },
    { id: "software", label: "Software" },
    { id: "research", label: "Research" },
];

// Simple icon components
const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const ExternalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const DocumentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
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
                <h1 className="portfolio-title">Technical Portfolio</h1>
                <p className="portfolio-subtitle">Selected work in software engineering, energy systems, and computational research</p>
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
