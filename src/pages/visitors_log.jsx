import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import '../styles.css';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.PARCEL_FIREBASE_API_KEY,
    authDomain: process.env.PARCEL_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PARCEL_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PARCEL_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PARCEL_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PARCEL_FIREBASE_APP_ID,
    measurementId: process.env.PARCEL_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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
        setError('');
    };

    const handleSubmit = async () => {
        for (const [field, isRequired] of Object.entries(required)) {
            if (isRequired && !formData[field].trim()) {
                setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                return;
            }
        }
        try {
            await addDoc(collection(db, 'visitors'), {
                ...formData,
                timestamp: new Date()
            });
            window.location.assign('creative_portfolio.html');
        } catch (err) {
            setError('Submission failed');
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="app-container">
            <h1>Since You Made it This Far,</h1>
            <p>Identify Yourself</p>
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
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<VisitorForm />);

export default VisitorForm;