import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { getCategories } from './helper/adminapicall';

const ManageCatogeries = () => {
   const [categories, setCategories] = useState([]);

   const { user, token } = isAuthenticated();

   const preload = () => {
      getCategories().then((data) => {
         if (data.error) {
            console.log(data.error);
         } else {
            setCategories(data);
         }
      });
   };

   useEffect(() => {
      preload();
   }, []);

   return (
      <Base title='Welcome admin' description='Manage products here'>
         <Link className='btn btn-info' to={`/admin/dashboard`}>
            <span className=''>Admin Home</span>
         </Link>
         <h2 className='mb-4'>All categories:</h2>

         <div className='row'>
            <div className='col-12'>
               <h2 className='text-center text-white my-3'>
                  Total 3 categories
                  {}
               </h2>
            </div>
         </div>
      </Base>
   );
};

export default ManageCatogeries;
