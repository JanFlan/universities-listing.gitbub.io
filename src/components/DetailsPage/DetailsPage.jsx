import React from 'react';
import { useLocation } from 'react-router-dom';
import './DetailsPage.css';

const DetailsPage = () => {
    const location = useLocation();
    const { item = {} } = location.state || {};

    const {
        name,
        country,
        "state-province": stateProvince,
        domains,
        web_pages: webPages,
        alpha_two_code: alphaTwoCode
    } = item;

    /**
     * Renders the field value or "Not provided" if the value is falsy
     * @param {string} value - The value to render 
     * @returns {string} - The rendered field value or "Not provided" if the value is falsy
     */
    const renderFieldValue = (value) => {
        return value ? value : "Not provided";
    };

    return (
        <div className="container">
            <h1>{renderFieldValue(name)}</h1>
            <p><strong>Country:</strong> {renderFieldValue(country)}</p>
            <p><strong>State/Province:</strong> {renderFieldValue(stateProvince)}</p>
            <p><strong>Domains:</strong> {renderFieldValue(domains && domains.join(', '))}</p>
            <p><strong>Web Pages:</strong></p>
            <ul>
                {webPages && webPages.map((page, index) => (
                    <li key={index}><a href={page} target="_blank" rel="noreferrer">{page}</a></li>
                ))}
            </ul>
            <p><strong>Alpha Two Code:</strong> {renderFieldValue(alphaTwoCode)}</p>
        </div>
    );
};

export default DetailsPage;
