import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess: React.FC = () => {
  return (
    <div>
      <h2>Success</h2>
      <p>Thank you for your purchase. We hope to see you again!</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default CheckoutSuccess;