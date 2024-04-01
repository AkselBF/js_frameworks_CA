import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/ecom_logo.png';

interface CartProps {
  cart: any[];
  removeFromCart: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.discountedPrice, 0).toFixed(2);

  return (
    <div className='w-full p-5'>
      <h1 className='text-3xl text-center font-bold mb-5'>My cart</h1>
      <div className='flex flex-col lg:flex-row sm:justify-between'>
        <div className='lg:w-[45%]'>
          <ul className='my-5 lg:max-h-[410px] overflow-y-auto'>
            {cart.length === 0 ? (
              <li className='text-gray-500'>No items</li>
            ) : (
              cart.map((item, index) => (
                <li key={index} className='my-5 flex flex-col sm:flex-row sm:justify-between'>
                  <div className='flex flex-row'>
                    <img src={item.image.url} alt={item.image.alt} 
                    className='w-10 h-12 rounded-md' />
                    <div className='mx-5'>
                      <h2 className='font-semibold'>{item.title}</h2>
                      <p className='text-[#FF8A00]'>Discount: {item.discountedPrice}kr</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(index)} 
                  className='mx-0 md:mx-5 my-3 sm:my-0 bg-red-600 text-white font-semibold rounded-md py-2 w-[160px]'>
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className='bg-[#171717] p-5 text-white rounded-lg lg:w-[50%]'>
          <img src={Logo} alt="Logo" className="h-20 my-5 mx-auto" />
          <p className='my-5'>
            All selected items will be purchased at once. After purchase, it's too late to turn back. Be sure to verify the selected items on the in the list. If there is an item that's out-of-place or if there's one too many. You can delete the item via the delete button beside each individual item.
          </p>
          <p className='my-5'>
            With that, we wish you happy shopping!
          </p>
          <h4 className='text-right text-[#FF8A00] font-semibold'>Total Price: {totalPrice}kr</h4>
          <div className='relative my-28'>
            {cart.length > 0 ? (
              <Link to={'/checkout'}>
                <button className='absolute bottom-10 right-0 text-black font-semibold bg-[#00B2FF] py-2 w-[180px] rounded-md'>Checkout</button>
              </Link>
            ) : (
              <button disabled className='absolute bottom-10 right-0 text-white font-semibold bg-gray-400 w-[180px] rounded-md py-2 cursor-not-allowed'>
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;