import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

const Signup = () => {
   const [values, setvalues] = useState({
      name: '',
      email: '',
      password: '',
      error: '',
      success: false,
   });

   const { name, email, password, error, success } = values;

   const handleChange = (name) => (event) => {
      setvalues({ ...values, error: false, [name]: event.target.value });
   };

   const onSubmit = (event) => {
      event.preventDefault();
      setvalues({ ...values, error: false });
      signup({ name, email, password })
         .then((data) => {
            if (data.error) {
               setvalues({ ...values, error: data.error, success: false });
            } else {
               setvalues({
                  ...values,
                  name: '',
                  email: '',
                  password: '',
                  error: '',
                  success: true,
               });
            }
         })
         .catch(console.log('Error in signup'));
   };

   const signUpForm = () => {
      return (
         <div className='row'>
            <div className='col-md-6 offset-sm-3 text-left'>
               <form action=''>
                  <div className='form-group'>
                     <label className='text-light'>Name</label>
                     <input
                        className='form-control'
                        onChange={handleChange('name')}
                        type='text'
                        value={name}
                     />
                  </div>
                  <div className='form-group'>
                     <label className='text-light'>Email</label>
                     <input
                        className='form-control'
                        onChange={handleChange('email')}
                        type='email'
                        value={email}
                     />
                  </div>
                  <div className='form-group'>
                     <label className='text-light'>Password</label>
                     <input
                        className='form-control'
                        type='password'
                        onChange={handleChange('password')}
                        value={password}
                     />
                  </div>
                  <button onClick={onSubmit} className='btn btn-success block'>
                     Submit
                  </button>
               </form>
            </div>
         </div>
      );
   };

   const successMessage = () => (
      <div
         className='alert alert-success'
         style={{ display: success ? '' : 'none' }}
      >
         New account was created successfully. Please{' '}
         <Link to='/signin'> Login here</Link>
      </div>
   );

   const errorMessage = () => (
      <div
         className='alert alert-danger'
         style={{ display: error ? '' : 'none' }}
      >
         {error}
      </div>
   );

   return (
      <Base title='Sign up Page' description=' A page for user to sign up!'>
         <div className='col-md-6 offset-sm-3 text-left'>
            {successMessage()}
            {errorMessage()}
         </div>
         {signUpForm()}
         <p className='text-white text-center'></p>
      </Base>
   );
};

export default Signup;
