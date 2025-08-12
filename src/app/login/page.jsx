import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';

const Login = () => {

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      axios.post('http://localhost:5000/user/authenticate',values)
      .then((result) => {
        toast.success("login sucessfully...!!!")
        localStorage.setItem('token', result.data.token)
      }).catch((err) => {
        toast.err("login unsuccessfull...!!")
        console.log(err);

      });


    }
  }
  );


  return (
    <div className=" w-1/4 mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Don't have an account yet?
            <a
              className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
              href="../examples/html/signup.html"
            >
              Sign up here
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}




export default Login