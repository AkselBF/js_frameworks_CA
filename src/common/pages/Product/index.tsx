import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../../constants/apiUrl';

const Product: React.FC = () => {
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

  const addToCart = () => {
    console.log('Product added to cart:', product);
  };

  return (
    <div>
      <h2>Product Page</h2>
      {product ? (
        <div>
          <h3>{product.title}</h3>
          <img src={product.image.url} alt={product.image.alt} />
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={addToCart}>Add to Cart</button>
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