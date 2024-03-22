import React from 'react';
import { Link } from 'react-router-dom';

interface CartProps {
  cart: any[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div>
      <div>
        <h2>Cart Page</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Total Price: {totalPrice}</h4>
        {cart.length > 0 ? (
          <Link to={'/checkout'}>
            <button className='text-white bg-blue-700 py-2 px-8 rounded-full'>Checkout</button>
          </Link>
        ) : (
          <button disabled className='text-black bg-transparent cursor-not-allowed'>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;