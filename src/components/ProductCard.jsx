const ProductCard = ({ product }) => (
    <div className="product-card">
      <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </div>
  );
  export default ProductCard;
  