import { useNavigate } from "react-router-dom";
import './SearchResults.css'; // Make sure to create this CSS file


const SearchResults = ({ results }) => {
    const navigate = useNavigate();

    function changeRoute (stock) {
        navigate(`/stock/${stock}`);
    }
    
    return (
        <div className="results-container">
            {results.map((stock) => (
                stock.type !== '' ?
                    <div onClick={() => changeRoute(stock.symbol)} className="stock-card" key={stock.symbol}>
                        <h2 className="stock-symbol">{stock.displaySymbol}</h2>
                        <p className="stock-description">{stock.description}</p>
                        <p className="stock-type">{stock.type}</p>
                    </div> : null
            ))}
        </div>
    );
};

export default SearchResults;
