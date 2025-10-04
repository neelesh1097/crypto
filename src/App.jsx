import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import { CoinContextProvider } from './context/CoinContext';
import './index.css'; // Changed from './Index.css' to './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <CoinContextProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/coin/:coinId' element={<Coin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CoinContextProvider>
    </BrowserRouter>
  )
}

export default App;