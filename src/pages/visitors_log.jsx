import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

function VisitorForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [error, setError] = useState('');

    // Set which fields are required
    const required = {
        name: true,
        email: true,
        message: false
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when typing
    };

    const BACKEND_URL = 'https://mywebsite-reactplayground-production.up.railway.app'; // Replace with your actual Railway URL

    const handleSubmit = async () => {
        for (const [field, isRequired] of Object.entries(required)) {
            if (isRequired && !formData[field].trim()) {
                setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                return;
            }
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.assign('index.html'); // TODO make creative_portfolio.html
            } else {
                setError('Submission failed');
            }
        } catch (err) {
            setError('Could not connect to server');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="form-container" onKeyDown={handleKeyDown}>
            {error && <div className="form-error">{error}</div>}

            <div className="form-field">
                <label className="form-label">Name {required.name && '*'}</label>
                <input
                    type="text"
                    name="name"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="form-field">
                <label className="form-label">Email {required.email && '*'}</label>
                <input
                    type="email"
                    name="email"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-field">
                <label className="form-label">Message {required.message && '*'}</label>
                <input
                    type="text"
                    name="message"
                    className="input"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <button className="submit-button input" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<VisitorForm />);

export default VisitorForm;