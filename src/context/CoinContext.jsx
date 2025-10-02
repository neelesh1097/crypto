import { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // ✅ State should be at the top level
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  // ✅ Fetch function
  const fetchAllCoin = async () => {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllCoin(data); // store data in state
      console.log("Fetched coins:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ✅ Run fetch only once when component mounts
  useEffect(() => {
    fetchAllCoin();
  }, []);

  // ✅ Pass values in context
  const contextValue = {
    allCoin,
    setAllCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
