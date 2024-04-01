import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { url } from '../../constants/apiUrl';
import Logo from '../../images/ecom_logo.png';

interface HomeProps {
  addToCart: (item: any) => void;
  cart: any[];
}

const Home: React.FC<HomeProps> = ({ addToCart }) => {
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
    <div className='justify-center text-center p-3'>
      <img src={Logo} alt="Logo" className="h-40 my-5 mx-auto" />
      <h1 className='text-center text-5xl font-bold underline my-5'>Welcome to E-com!</h1>
      <p className='text-center'>Easy access and purchase for any available product.</p>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 my-5 rounded-full border border-gray-300"
      />
      {filteredProducts.length > 0 ? (
        <ul className="text-left mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {filteredProducts.map((product) => (
            <li key={product.id} className="mt-5 p-3 mx-auto text-white bg-[#171717] w-[270px] sm:w-[300px] rounded-xl relative">
              <Link to={`/product/${product.id}`}>
                <h2 className='text-lg text-[#00B2FF] line-clamp-1 font-semibold mt-1 mb-3 w-[80%] mx-auto'>{product.title}</h2>
                <img src={product.image.url} alt={product.image.alt} className="rounded-lg h-48 mx-auto my-3 w-[80%]" />
                <p className='w-[80%] mx-auto mb-16 line-clamp-2'>{product.description}</p>
                <p className="absolute font-semibold right-0 bottom-5 bg-[#FF8A00] rounded-l-md pr-9 pl-4 py-2 text-black">{product.price + ' kr'}</p>
              </Link>
              <button onClick={() => addToCart(product)} 
              className="absolute bottom-5 left-0 text-black font-semibold bg-[#80A4FF] pr-4 pl-9 py-2 rounded-r-md">
                Add to Cart
              </button>
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