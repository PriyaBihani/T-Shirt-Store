import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
   const [products, setProducts] = useState([]);
   const [error, setError] = useState(false);

   const loadAllProduct = () => {
      getProducts().then((data) => {
         if (data.error) {
            setError(data.error);
         } else {
            setProducts(data);
         }
      });
   };

   useEffect(() => {
      loadAllProduct();
   }, []);

   return (
      <div>
         <Base title='Home Page' description='Welcome to the Tshirt store'>
            <div className='row text-center'>
               <h1 className='text-white'>All of tshirts</h1>
               <div className='row'>
                  {products.map((product, index) => {
                     return (
                        <div className='col-4'>
                           <Card product={product} />
                        </div>
                     );
                  })}
               </div>
            </div>
         </Base>
      </div>
   );
};

export default Home;
