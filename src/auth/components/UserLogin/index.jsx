import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function UserLogin() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        // Handle form submission here
        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
            <Field type="email" name="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-800 dark:focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40" />
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
            <Field type="password" name="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-800 dark:focus:border-gray-800 focus:ring-gray-800 focus:outline-none focus:ring focus:ring-opacity-40" />
            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
          </div>
          <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            <span>Sign In </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </Form >
      )}
    </Formik>
  )
}

export default UserLogin