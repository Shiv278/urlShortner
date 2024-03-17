import React, { useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
    const [originalURL, setOriginalURL] = useState("");
    const [customURL, setCustomURL] = useState("");
    const [outputMessage, setOutputMessage] = useState("");
    const [error, setError] = useState(null);
    const [expirationDateTime, setExpirationDateTime] = useState("");

    const handleShortenURL = async () => {
        try {
            const response = await axios.post("http://localhost:8080/shorten", {
                original_url: originalURL,
                short_url: customURL,
                expiration_date_time: expirationDateTime,
            });

            const shortenedURL = response.data.short_url;
            setOutputMessage(
                <p className="text-blue-500">
                    Shortened URL:{" "}
                    <a href={`http://localhost:8080/${shortenedURL}`} target="_blank" rel="noopener noreferrer">
                        http://localhost:8080/{shortenedURL}
                    </a>
                </p>
            );
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error shortening URL:", error);

            if (error.response && error.response.status === 400) {
                // Backend returned a 400 Bad Request response
                setError(`Bad Request: ${error.response.data.error}`);
                setOutputMessage("");
            } else {
                // Other errors
                setError("An error occurred while processing the request.");
                setOutputMessage("");
            }
        }
    };

    return (
    <div className="container mx-auto my-10 px-4">
        <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Enter URL"
                value={originalURL}
                onChange={(e) => setOriginalURL(e.target.value)}
            />
            <input
                type="text"
                placeholder="Custom URL (optional)"
                value={customURL}
                onChange={(e) => setCustomURL(e.target.value)}
            />
            {/*<input*/}
            {/*    type="date" // Input field for expiration date*/}
            {/*    placeholder="Expiration Date"*/}
            {/*    value={expiryDate}*/}
            {/*    onChange={(e) => setExpiryDate(e.target.value)}*/}
            {/*/>*/}
            <input
                type="datetime-local"
                placeholder="Expiration Date and Time"
                value={expirationDateTime}
                onChange={(e) => setExpirationDateTime(e.target.value)}
            />
            <button onClick={handleShortenURL}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">Shorten
                URL
            </button>
        </div>
        <div className={`mt-4 ${outputMessage ? 'move-up-down' : ''}`}>
            {outputMessage}
        </div>
        <div className="mt-4">
            {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    </div>
    );
};

export default App;
