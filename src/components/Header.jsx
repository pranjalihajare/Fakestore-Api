import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
export default Header;
