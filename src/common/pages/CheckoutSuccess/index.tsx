import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/ecom_logo.png';

const CheckoutSuccess: React.FC = () => {
  return (
    <div className='justify-center text-center px-5'>
      <h1 className='text-[#00B2FF] text-center text-5xl font-bold my-5'>Success!</h1>
      <img src={Logo} alt="Logo" className="h-40 my-10 mx-auto" />
      <p>Thank you for your purchase. We hope to see you again!</p>
      <p className='text-left my-5 font-semibold'>E-com</p>
      <Link to="/">
        <button className='text-white font-semibold bg-[#171717] py-3 w-[200px] rounded-md my-12'>Back to home</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;