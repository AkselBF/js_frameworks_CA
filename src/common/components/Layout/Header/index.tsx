import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto px-2 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">E-com</Link>
        <div className="flex items-center">
          <Link to="/" className="text-md mr-4">
            Home
          </Link>
          <Link to="/contact" className="text-md ml-4">
            Contact
          </Link>
        </div>
        <div className='relative'>
          <Link to="/cart" className="text-md">
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;