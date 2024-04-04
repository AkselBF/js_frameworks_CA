import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../constants/apiUrl';
import { Link } from 'react-router-dom';

interface ProductProps {
  addToCart: (item: any) => void;
}

const Product: React.FC<ProductProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const responseData = await response.json();
        const fetchedProduct = responseData.data;
        //console.log('Fetched product:', fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const calculateDiscountPercentage = (price: number, discountedPrice: number) => {
    const discount = price - discountedPrice;
    const discountPercentage = ((discount / price) * 100);
    return Math.round(discountPercentage) + '% off';
  };

  return (
    <div className='justify-center md:w-[95%]'>
      {product ? (
        <div className='mx-auto my-3 w-full lg:w-[90%]'>
          <h1 className='text-3xl italic font-bold mx-5 lg:mx-auto my-5'>{product.title}</h1>
          <div className='bg-[#171717] px-5 pt-10 pb-10 md:pb-24 lg:pb-10 md:pr-10 md:pl-5 mx-auto flex flex-col md:flex-row md:rounded-r-xl lg:rounded-l-xl'>
            <img src={product.image.url} alt={product.image.alt}
            className='w-[300px] mx-auto md:mx-10 rounded-lg' />
            <div className='relative text-white w-[80%] mx-auto'>
              <p className='mt-5 md:mt-0 mb-3'>{product.description}</p>
              <p className='text-[#80A4FF] font-semibold'>Discount: {calculateDiscountPercentage(product.price, product.discountedPrice)}</p>
              <p className='text-[#FF8A00] font-semibold'>Total: {product.discountedPrice}kr</p>
              <p className='mt-6 mb-12'>
                If the item is to your liking, click the add to cart to add it in the cart or purchase button to purchase this one item directly.
              </p>
              <div className='flex flex-col md:flex-row sm:mx-auto md:absolute right-0 bottom-0 md:-bottom-20 lg:-bottom-3'>
                <button onClick={handleAddToCart} 
                className='text-black font-semibold bg-[#80A4FF] mx-auto md:mx-3 w-[200px] py-2 mb-2 rounded-md'>Add to Cart</button>
                <Link to={'/checkout'} className='mx-auto mt-2 md:mt-0'>
                  <button className='text-black font-semibold bg-[#FF8A00] w-[200px] py-2 rounded-md'>Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;