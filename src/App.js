import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing the pages
import ProductPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoriesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Microservices App</h1>
        </header>
        
        <nav className="navbar">
          <ul>
            <li><div className="card">
              <a href="/products">Products</a>
              </div></li>
            <li><div className="card">
              <a href="/categories">Categories</a>
            </div></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/categories" element={<CategoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;