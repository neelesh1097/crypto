import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './Home.css';
import { CoinContext } from '../../context/CoinContext';

const Home = () => {
  const { allCoin } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input,setInput] = useState('');

  const inputHandler = (event) => {
     setInput(event.target.value);
  }

  const searchHandler = (event) => {
  event.preventDefault();
  const coins = allCoin.filter((item) => 
    item.name.toLowerCase().includes(input.toLowerCase()) ||
    item.symbol.toLowerCase().includes(input.toLowerCase())
  );
  setDisplayCoin(coins);
}

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} type="text" placeholder="search crypto" />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout table-header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="change">24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

       {displayCoin.slice(0, 10).map((item) => (
  <Link 
    to={`/coin/${item.id}`} 
    className="table-layout table-row" // Added table-row class for consistency
    key={item.id} // Changed to item.id instead of index
  >
    <p>{item.market_cap_rank}</p>

    <div className="coin-info">
      <img src={item.image} alt={item.name} />
      <p>{item.name} <span className="symbol">({item.symbol.toUpperCase()})</span></p>
    </div>

    <p className="price">${item.current_price?.toLocaleString() || 'N/A'}</p>

    <p
      className={`change ${item.price_change_percentage_24h >= 0 ? 'green' : 'red'}`}
    >
      {item.price_change_percentage_24h?.toFixed(2) || 0}%
    </p>

    <p className="market-cap">
      ${item.market_cap?.toLocaleString() || 'N/A'}
    </p>
  </Link>
))}

      </div>
    </div>
  );
};

export default Home;
