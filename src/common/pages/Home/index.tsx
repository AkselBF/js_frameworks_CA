import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { url } from '../../constants/apiUrl'

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='justify-center text-center'>
      <h1 className='text-3xl font-bold my-5'>Home Page</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded border border-gray-300 mx-auto"
      />
      {filteredProducts.length > 0 ? (
        <ul className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id} className="m-5">
              <Link to={`/product/${product.id}`}>
                <h3>{product.title}</h3>
                <img src={product.image.url} alt={product.image.alt} className="rounded-lg h-48 m-auto" />
                <p>{product.description}</p>
                <p className="text-right">{product.price + ' kr'}</p>
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