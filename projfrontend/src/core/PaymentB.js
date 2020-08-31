import React, { useState, useEffect } from 'react';
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import { getmeToken, processPayment } from './helper/paymentBHealper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';

import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({ products, setReaload = (f) => f, reaload = undefined }) => {
   const [info, setInfo] = useState({
      loading: false,
      success: false,
      clientToken: null,
      error: '',
      instance: {},
   });

   const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;

   const getToken = (userId, token) => {
      getmeToken(userId, token).then((info) => {
         if (info.error) {
            setInfo({ ...info, error: info.error });
         } else {
            const clientToken = info.clientToken;
            setInfo({ clientToken });
         }
      });
   };

   useEffect(() => {
      getToken(userId, token);
   }, []);

   const showbtdropIn = () => {
      return (
         <div>
            {info.clientToken !== null && products.length > 0 ? (
               <div>
                  <DropIn
                     options={{ authorization: info.clientToken }}
                     onInstance={(instance) => (info.instance = instance)}
                  />
                  <button
                     className='btn btn-block btn-success'
                     onClick={onPurchase}
                  >
                     Buy
                  </button>
               </div>
            ) : (
               <h3>Please Login or add Something to cart</h3>
            )}
         </div>
      );
   };

   const onPurchase = () => {
      setInfo({ loading: true });
      let nonce;
      let getnonce = info.instance.requestPaymentMethod().then((data) => {
         nonce = data.nonce;
         const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount(),
         };
         processPayment(userId, token, paymentData)
            .then((res) => {
               setInfo({ ...info, success: response.success, loading: false });
            })
            .catch((error) => {
               setInfo({ loading: false, success: false });
            });
      });
   };

   const getAmount = () => {
      let amount = 0;
      products.map((product) => {
         amount = amount + p * price;
      });
      return amount;
   };

   return (
      <div>
         <h3>Your Bill is {getAmount()}</h3>
         {showbtdropIn()}
      </div>
   );
};

export default PaymentB;
