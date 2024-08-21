import React, { useState } from 'react';
import './TredningStocks.css';
import SearchResults from './SearchResults'; // Import the new component
import axios from 'axios';

const TredningStocks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/search?q=${query}&token=cpna92pr01qtggbavitgcpna92pr01qtggbaviu0`);
      setResults(response.data.result);
    } catch (err) {
      console.log(err);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <SearchResults results={results} />
    </div>
  );
};

export default TredningStocks;
