import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyRatesTable = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'e7f0e5985ed64a399fb6d5e1e34018d9';
    const currencies = "CAD,EUR,IDR,JPY,CHF,GBP";
    const url = `https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=${currencies}`;

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(url);
                setRates(response.data.rates);
                setLoading(false);
            } catch (err) {
                setError("error pada API");
                setLoading(false);
            }
        };

        fetchRates();
    }, [url]);

    if (loading) return <p>Memuat data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='flex items-center justify-center flex-col py-[25dvh] text-white'>
            <h2 className='text-lg font-semibold tracking-widest'>Farhan Aufar - Project: Display Rate Currency</h2>
            <table border="1" cellPadding="8" className='bg-black/50 text-center rounded-lg border-spacing-4 my-4 w-[40dvw] shadow-lg'>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(rates).map((currency) => {

                        const exchangeRate = parseFloat(rates[currency]);
                        const weBuy = (exchangeRate * 1.05).toFixed(4); // %5 lebih tinggi
                        const weSell = (exchangeRate * 0.95).toFixed(4); // %5 lebih rendah

                        return (
                        <tr key={currency} className='odd:bg-black/10'>
                            <td>{currency}</td>
                            <td>{weBuy}</td>
                            <td>{exchangeRate.toFixed(4)}</td>
                            <td>{weSell}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            <h3 className='text-sm'>Rates are based from 1 USD.</h3>
            <h3 className='text-sm'>This application uses API from https://currencyfreaks.com</h3>
        </div>
    );
};

export default CurrencyRatesTable;
