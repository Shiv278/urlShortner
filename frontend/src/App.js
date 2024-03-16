import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [error, setError] = useState(null);

  const handleShortenURL = async () => {
    try {
      const response = await axios.post("http://localhost:8080/shorten", {
        original_url: originalURL,
      });
      setShortenedURL(response.data.short_url);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError(error.message);
    }
  };

  return (
      <div>
        <h1>URL Shortener</h1>
        <input
            type="text"
            placeholder="Enter URL"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
        />
        <button onClick={handleShortenURL}>Shorten URL</button>
        {shortenedURL && (
            <div>
              <p>Shortened URL: <a
                  href={`http://localhost:8080/${shortenedURL}`}>{`http://localhost:8080/${shortenedURL}`}</a></p>
            </div>
        )}

        <div>
          {/* Your JSX code */}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
  );
};

export default App;
