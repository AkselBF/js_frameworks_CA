import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">E-com</Link>
        <div className="flex items-center">
          <Link to="/" className="text-md mr-4">
            Home
          </Link>
          <Link to="/contact" className="text-md ml-4">
            Contact
          </Link>
        </div>
        <Link to="/cart" className="text-md">
          <ShoppingCartIcon />
        </Link>
      </nav>
    </header>
  );
};

export default Header;