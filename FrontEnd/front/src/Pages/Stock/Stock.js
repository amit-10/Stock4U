import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './Stock.css';
import { getRealTimeStock } from '../../Services/Backend.service';

const StockPage = () => {
    const [stockData, setStockData] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { symbol } = useParams();

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const stockResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cpna92pr01qtggbavitgcpna92pr01qtggbaviu0`);
                const companyResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=cpna92pr01qtggbavitgcpna92pr01qtggbaviu0`);

                if (stockResponse.data.d === null)
                    throw new Error('Symbol does not exist');

                setStockData(stockResponse.data);
                setCompanyProfile(companyResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    if (loading) return <p className='loadingMessage'>Loading...</p>;
    if (error) return <p className='errorMessage'>Error loading stock data. <br /> {error.message ? error.message : null}</p>;

    const isPositive = stockData.c >= stockData.pc;

    return (
        <div className='container'>
            <div className='header'>
                {companyProfile && companyProfile.logo && <img className='logo' src={companyProfile.logo} alt={`${companyProfile.name} logo`} />}
                <div>
                    <h1 className='title'>{Boolean(companyProfile.name) ? companyProfile.name : symbol}</h1>
                    {companyProfile && <h3 className='subtitle'>{companyProfile.ticker} - {companyProfile.exchange}</h3>}
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='tableHeader'>Attribute</th>
                        <th className='tableHeader'>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='tableRow'>
                        <td className='tableData'>Current Price</td>
                        <td className='tableData' style={{ color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
                            ${stockData.c}
                            <span className='stockChangeIcon'>
                                {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                            </span>
                        </td>
                    </tr>
                    <tr className='tableRow'>
                        <td className='tableData'>High Price of the Day</td>
                        <td className='tableData'>${stockData.h}</td>
                    </tr>
                    <tr className='tableRow'>
                        <td className='tableData'>Low Price of the Day</td>
                        <td className='tableData'>${stockData.l}</td>
                    </tr>
                    <tr className='tableRow'>
                        <td className='tableData'>Opening Price</td>
                        <td className='tableData'>${stockData.o}</td>
                    </tr>
                    <tr className='tableRow'>
                        <td className='tableData'>Previous Close</td>
                        <td className='tableData'>${stockData.pc}</td>
                    </tr>
                    {Boolean(companyProfile.marketCapitalization) ??
                        <tr className='tableRow'>
                            <td className='tableData'>Market Cap</td>
                            <td className='tableData'>${companyProfile.marketCapitalization.toFixed(0)} M</td>
                        </tr>
                    }
                    {Boolean(companyProfile.finnhubIndustry) ??
                        <tr className='tableRow'>
                            <td className='tableData'>Industry</td>
                            <td className='tableData'>{companyProfile.finnhubIndustry}</td>
                        </tr>
                    }
                    {Boolean(companyProfile.weburl) ??
                        <tr className='tableRow'>
                            <td className='tableData'>Website</td>
                            <td className='tableData'>
                                <a href={companyProfile.weburl} target="_blank" rel="noopener noreferrer">
                                    {companyProfile.weburl}
                                </a>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default StockPage;
