import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Fetch categories on mount
    axios.get('https://fakestoreapi.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Category fetch error:', err));
  }, []);

  useEffect(() => {
    // Fetch products based on selected category
    const fetchProducts = async () => {
      const url = selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;
      try {
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="product" >
      <div className="product-title">
      <h2>Products</h2>

      {/* Filter Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' , marginBottom:'1rem'}}>
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      </div>

      {/* Products Grid */}
      <div className="product-item" >
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
            <h4>{product.title.slice(0, 40)}...</h4>
            <p><strong>${product.price}</strong></p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
