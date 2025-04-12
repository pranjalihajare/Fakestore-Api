import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Product fetch error:', err));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: '1rem'  }}>
      <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', flexWrap: 'wrap', gap: '2rem' }}>
        <img src={product.image} alt={product.title} style={{ width: '250px', height:'400px', objectFit: 'contain' }} />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3 style={{color:'green'}}>${product.price}</h3>
          <button
            onClick={() => addToCart(product)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'flex', 
              justifyContent:'center',
               alignItems:'center'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
