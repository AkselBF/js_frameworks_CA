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

  return (
    <div className='justify-center md:w-[90%]'>
      {product ? (
        <div className='mx-auto w-full lg:w-[90%]'>
          <h1 className='text-3xl font-bold mx-auto my-5 underline'>{product.title}</h1>
          <div className='bg-[#171717] px-5 py-10 md:pr-10 md:pl-5 mx-auto flex flex-col md:flex-row md:rounded-r-xl'>
            <img src={product.image.url} alt={product.image.alt}
            className='w-[300px] mx-auto md:mx-10 rounded-lg' />
            <div className='relative text-white w-[80%] mx-auto'>
              <p className='mt-5 md:mt-0 mb-3'>{product.description}</p>
              <p className='font-semibold'>Price: {product.discountedPrice}kr</p>
              <p className='my-6 md:line-clamp-3'>
                If the item is to your liking, click the add to cart to add it in the cart or purchase button to purchase this one item directly.
                We hope you enjoy this purchase and any future ones you may have.
              </p>
              <div className='w-[80%] my-8 flex flex-col sm:mx-auto md:absolute md:-bottom-8 md:right-0 lg:-right-20 xl:-right-36'>
                <button onClick={handleAddToCart} 
                className='text-black font-semibold bg-[#80A4FF] mx-auto w-[200px] py-2 mb-2 rounded-md'>Add to Cart</button>
                <Link to={'/checkout'} className='mx-auto mt-2'>
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