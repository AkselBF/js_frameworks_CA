import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../images/ecom_logo.png';

interface HeaderProps {
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto px-2 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>
        <div className="hidden lg:flex flex-grow justify-center">
          <Link to="/" className="text-md mx-4">
            Home
          </Link>
          <Link to="/contact" className="text-md mx-4">
            Contact
          </Link>
        </div>
        <div className="flex items-center">
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white">
              <MenuIcon />
            </button>
          </div>
          <div className={`lg:hidden absolute rounded-bl-xl top-16 w-40 right-0 bg-gray-900 text-white pt-2 pb-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="container mx-auto flex flex-col px-6 items-start">
              <Link to="/" className="text-md my-2" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/contact" className="text-md my-2" onClick={toggleMenu}>
                Contact
              </Link>
              <Link to="/cart" className="text-md my-2 relative" onClick={toggleMenu}>
                <ShoppingCartIcon />
                {cartItemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center">
            <Link to="/cart" className="text-md relative">
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;