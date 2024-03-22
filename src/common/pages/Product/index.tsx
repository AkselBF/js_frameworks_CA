import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../constants/apiUrl';
import { Link } from 'react-router-dom';
/*
interface ProductProps {
  addToCart: (product: any) => void; // Define addToCart function prop
}*/
interface ProductProps {
  addToCart: (item: any) => void; // Add addToCart prop
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

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Call addToCart function from props
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
              <p>Price: {product.price}kr</p>
              <p className='my-6'>
                If the item seems appealing, click the add to cart to add it in the cart or purchase button to purchase this one item directly.
                We hope you enjoy this purchase and any future ones you may have.
              </p>
              <div className='w-[80%] my-8 flex flex-col sm:mx-auto md:absolute md:-bottom-8 md:right-0 lg:-right-20 xl:-right-36'>
                <button onClick={handleAddToCart} 
                className='text-white font-semibold bg-green-500 mx-auto w-[200px] py-2 mb-2 rounded-full'>Add to Cart</button>
                <Link to={'/checkout'} className='mx-auto mt-2'>
                  <button className='text-white font-semibold bg-blue-700 w-[200px] py-2 rounded-full'>Checkout</button>
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

/*
import React from 'react';

const Product: React.FC = () => {
  return (
    <div>
      <h2>Product Page</h2>
    </div>
  );
};

export default Product;
*/