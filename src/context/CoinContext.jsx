import { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch coins');
        }

        const data = await response.json();
        setAllCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <CoinContext.Provider value={{ allCoin, loading, error }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
