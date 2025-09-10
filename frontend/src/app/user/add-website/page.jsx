'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short !!')
        .max(30, 'Too Long !!')
        .required('Name is required'),
    owner: Yup.string().required('Owner is required'),
    repository: Yup.string().required('repository is required'),
    website: Yup.string().url('invalid url').required('website is required'),
});

const WebsiteSignup = () => {
    const router = useRouter();
    const signupForm = useFormik({
        initialValues: {
            name: '',
            owner: '',
            repository: '',
            website: '',
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            axios
                .post('http://localhost:5000/website/add', values)
                .then((result) => {
                    toast.success('Website registered successfully');
                    resetForm();
                    // router.push('/login');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Something went wrong!');
                });
        },
        validationSchema: SignUpSchema,
    });

    return (
        <div className="w-1/3 mx-auto my-12 bg-white border border-gray-300 rounded-xl shadow-lg">
            <div className="p-6 sm:p-8">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">
                        Website Sign up
                    </h1>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg
                            className="w-4 h-auto"
                            width={46}
                            height={47}
                            viewBox="0 0 46 47"
                            fill="none"
                        >
                            <path
                                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                                fill="#34A853"
                            />
                            <path
                                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                                fill="#EB4335"
                            />
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6">
                        Or
                    </div>

                    {/* Form */}
                    <form onSubmit={signupForm.handleSubmit}>
                        <div className="grid gap-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.name}
                                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                {signupForm.errors.name && signupForm.touched.name && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Owner */}
                            <div>
                                <label htmlFor="owner" className="block text-sm mb-2 text-gray-700">
                                    Owner
                                </label>
                                <input
                                    type="text"
                                    id="owner"
                                    name="owner"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.owner}
                                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                {signupForm.errors.owner && signupForm.touched.owner && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.owner}
                                    </p>
                                )}
                            </div>

                            {/* Repository */}
                            <div>
                                <label htmlFor="repository" className="block text-sm mb-2 text-gray-700">
                                    Repository
                                </label>
                                <input
                                    type="text"
                                    id="repository"
                                    name="repository"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.repository}
                                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                {signupForm.errors.repository && signupForm.touched.repository && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.repository}
                                    </p>
                                )}
                            </div>

                            {/* Website */}
                            <div>
                                <label htmlFor="website" className="block text-sm mb-2 text-gray-700">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.website}
                                    className="py-2.5 sm:py-3 px-4 block w-full border border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                {signupForm.errors.website && signupForm.touched.website && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.website}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WebsiteSignup;
