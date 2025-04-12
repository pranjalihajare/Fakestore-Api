import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
  {cart.map(item => (
    <div className="cart-item" key={item.id}>
      <p className="cart-title">{item.title}</p>
      <input
        className="cart-input"
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, +e.target.value)}
      />
      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  ))}

  <h3 className="total">Total: ${total.toFixed(2)}</h3>

  <button className="checkout-btn" onClick={handleCheckout}>
    Checkout
  </button>

  {showPopup && <div className="popup">Order placed successfully!</div>}
</div>

  );
};
export default Cart;
