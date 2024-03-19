import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { url } from '../../constants/apiUrl'

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const responseData = await response.json();
        const fetchedProducts = responseData.data;
        //console.log('Fetched products:', fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  /*
  useEffect(() => {
    console.log('Products state:', products);
  }, [products]);
  */

  return (
    <div>
      <h2>Home Page</h2>
      {Array.isArray(products) && products.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className='m-5'>
              <Link to={`/product/${product.id}`}>
                <h3>{product.title}</h3>
                <img src={product.image.url} alt={product.image.alt} 
                className='rounded-lg h-48 m-auto' />
                <p>{product.description}</p>
                <p className='text-right'>{product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Home;