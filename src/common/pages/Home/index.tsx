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
      <h1 className='text-5xl font-bold my-5 underline'>E-com</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 my-5 rounded-full border border-gray-300"
      />
      {filteredProducts.length > 0 ? (
        <ul className="text-left mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id} className="m-5 p-3 text-white bg-sky-950 w-[300px] rounded-xl relative">
              <Link to={`/product/${product.id}`}>
                <h3 className='font-semibold underline mt-1 mb-3 w-[80%] mx-auto'>{product.title}</h3>
                <img src={product.image.url} alt={product.image.alt} className="rounded-lg h-48 mx-auto my-3 w-[80%]" />
                <p className='w-[80%] mx-auto mb-16 line-clamp-2'>{product.description}</p>
                <p className="absolute right-0 bottom-5 bg-black rounded-l-full pr-9 pl-4 py-2">{product.price + ' kr'}</p>
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