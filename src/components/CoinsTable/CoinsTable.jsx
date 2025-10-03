import React from 'react';
import './CoinsTable.css';

const CoinsTable = ({ coins }) => {
  return (
    <div className="table-container">
      <table className="coins-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th className="hide-mobile">Market Cap</th>
            <th className="hide-mobile">Volume(24h)</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <div className="coin-info">
                  <img src={coin.image} alt={coin.name} />
                  <span>{coin.name}</span>
                  <span className="symbol">{coin.symbol.toUpperCase()}</span>
                </div>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="hide-mobile">${coin.market_cap.toLocaleString()}</td>
              <td className="hide-mobile">${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsTable;