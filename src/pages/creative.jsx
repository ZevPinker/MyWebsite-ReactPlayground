import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

// Import images using url: prefix to get proper URLs
import gesundheitImg from 'url:./images/creative/gesundheit.jpg';
import pollenPoolImg from 'url:./images/creative/pollen-pool.jpg';
import farmCelloImg from 'url:./images/creative/farm-cello.jpg';

// Import videos using url: prefix
import celloVideo from 'url:./videos/creative/cello-performance.mp4';
import celloVideo2 from 'url:./videos/creative/cello-performance-2.mp4'

const projects = [
    {
        id: 1,
        title: "Gesundheit",
        description: "Performing with my band, Gesundheit",
        category: "music",
        tags: ["Music", "Alt-Rock"],
        media: {
            type: "image",
            src: gesundheitImg,
            alt: "Band"
        },
        featured: false
    },
    {
        id: 2,
        title: "Yale Slavic Chorus",
        description: "Cello Performance",
        category: "music",
        tags: ["Cello", "Folk-Music"],
        media: {
            type: "video",
            src: celloVideo,
            poster: farmCelloImg
        },
        link: "https://www.youtube.com/live/PIjHKVFrd8k?si=x4WXphzwH5ZCvUws&t=1440",
    },
    {
        id: 3,
        title: "Photography",
        description: "Street photography capturing city life",
        category: "visual",
        tags: ["Photography"],
        media: {
            type: "image",
            src: pollenPoolImg,
            alt: "Urban street photography"
        },
        link: "https://drive.google.com/drive/folders/1Nr9S34_c00i2XinDeoJzV-vzZQpHYmDd?usp=share_link",
    },
    {
        id: 4,
        title: "Klezmer Band",
        description: "Performance on cello with Klezmer Band",
        category: "music",
        tags: ["Klezmer", "Cello"],
        media: {
            type: "video",
            src: celloVideo2,
            poster: farmCelloImg
        },
        link: "https://slifkacenter.org/yale-klezmer-band/"
    }
];

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

const MusicIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
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

                        <div className="project-media">
                            {project.media?.type === 'image' ? (
                                <img
                                    src={project.media.src}
                                    alt={project.media.alt}
                                    className="media-image"
                                    onError={(e) => {
                                        console.error(`Image failed to load: ${project.media.src}`);
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<div class="media-fallback">Image not found</div>';
                                    }}
                                />
                            ) : project.media?.type === 'video' ? (
                                <video
                                    controls
                                    poster={project.media.poster}
                                    className="media-video"
                                    onError={(e) => {
                                        console.error(`Video failed to load: ${project.media.src}`);
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<div class="media-fallback">Video not found</div>';
                                    }}
                                >
                                    <source src={project.media.src} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="media-fallback">No media available</div>
                            )}
                        </div>

                        <div className="card-content">
                            <div className="category-indicator">
                                <span className={`category-dot ${project.category === 'music' ? 'dot-music' : 'dot-visual'}`} />
                                <span className="category-label">{project.category}</span>
                            </div>

                            <h2 className="card-title">{project.title}</h2>
                            <p className="card-description">{project.description}</p>

                            <div className="tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="links">
                                {project.spotify && (
                                    <a href={project.spotify} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <MusicIcon />
                                        <span>Listen</span>
                                    </a>
                                )}
                                {project.link && (
                                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <ExternalIcon />
                                        <span>View</span>
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