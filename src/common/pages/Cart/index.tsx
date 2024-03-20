import React from 'react';

interface CartProps {
  cart: any[]; // Define cart prop
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
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
      <h4>Total Price: {totalPrice}</h4>
    </div>
  );
};

export default Cart;