import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Coin.css';

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching coin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!coin) return <div className="error">No coin data found</div>;

  return (
    <div className="coin-container">
      <div className="coin-header">
        <img src={coin.image.large} alt={coin.name} />
        <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
        <span className={`rank-badge ${coin.market_cap_rank <= 10 ? 'top-10' : ''}`}>
          Rank #{coin.market_cap_rank}
        </span>
      </div>

      <div className="coin-stats">
        <div className="stat-item">
          <h3>Current Price</h3>
          <p>${coin.market_data.current_price.usd.toLocaleString()}</p>
        </div>

        <div className="stat-item">
          <h3>Market Cap</h3>
          <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
        </div>

        <div className="stat-item">
          <h3>24h Change</h3>
          <p className={coin.market_data.price_change_percentage_24h > 0 ? 'green' : 'red'}>
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        <div className="stat-item">
          <h3>24h Trading Volume</h3>
          <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
        </div>

        <div className="stat-item">
          <h3>Circulating Supply</h3>
          <p>{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
        </div>

        <div className="stat-item">
          <h3>Max Supply</h3>
          <p>{coin.market_data.max_supply ? coin.market_data.max_supply.toLocaleString() : '∞'} {coin.symbol.toUpperCase()}</p>
        </div>
      </div>

     

      <div className="market-stats">
        <h2>Market Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>All Time High</h3>
            <p>${coin.market_data.ath.usd.toLocaleString()}</p>
            <span className="date">({new Date(coin.market_data.ath_date.usd).toLocaleDateString()})</span>
          </div>
          <div className="stat-item">
            <h3>All Time Low</h3>
            <p>${coin.market_data.atl.usd.toLocaleString()}</p>
            <span className="date">({new Date(coin.market_data.atl_date.usd).toLocaleDateString()})</span>
          </div>
        </div>
      </div>

      <div className="coin-description">
        <h3>About {coin.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: coin.description.en }}></p>
      </div>
    </div>
  );
};

export default Coin;