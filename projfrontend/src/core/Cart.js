import React, { useState, useEffect } from 'react';
import '../styles.css';
import Base from './Base';
import Card from './Card';
import StripeCheckout from './StripeCheckout';
import { loadCart } from './helper/cartHelper';
import PaymentB from './PaymentB';

const Cart = () => {
   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);

   useEffect(() => {
      setProducts(loadCart());
   }, [reload]);

   const loadAllProducts = (products) => {
      return (
         <div>
            <h2>Load Products</h2>
            {products.map((products, index) => (
               <Card
                  key={index}
                  product={products}
                  addToCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
               />
            ))}
         </div>
      );
   };

   return (
      <Base title='Cart Page' description='Ready to checkout'>
         <div className='row text-center '>
            <div className='col-6'>
               {products.length > 0 ? (
                  loadAllProducts(products)
               ) : (
                  <h3>No Products in Cart</h3>
               )}
            </div>
            <div className='col-6'>
               <PaymentB products={products} setReload={setReload} />
            </div>
         </div>
      </Base>
   );
};

export default Cart;
