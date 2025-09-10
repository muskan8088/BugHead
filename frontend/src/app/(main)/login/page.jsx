'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Login = () => {
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            const res = await axios.post(`http://localhost:5000/user/authenticate`, values);
            console.log(res.data);
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
                toast.success("success");
                resetForm();
                router.push("/user/Dashboard");
            }
        }
    });

    return (
        <div className="w-1/4 mx-auto mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs 
                    dark:bg-gray-100 dark:border-gray-300">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-gray-900">
                        Sign in
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-700">
                        Don't have an account yet?
                        <a
                            className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-700"
                            href="../examples/html/signup.html"
                        >
                            Sign up here
                        </a>
                    </p>
                </div>

                <div className="mt-5">
                    <button
                        type="button"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium 
                       rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 
                       focus:outline-hidden focus:bg-gray-50 
                       dark:bg-gray-100 dark:border-gray-300 dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                        {/* Google SVG */}
                        <svg className="w-4 h-auto" width={46} height={47} viewBox="0 0 46 47" fill="none">
                            <path d="M46 24.0287C46 22.09 ..." fill="#4285F4" />
                            <path d="M23.4694 47C29.8061 ..." fill="#34A853" />
                            <path d="M10.1212 28.1413..." fill="#FBBC05" />
                            <path d="M23.4694 9.07688..." fill="#EB4335" />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase 
                          before:flex-1 before:border-t before:border-gray-200 before:me-6 
                          after:flex-1 after:border-t after:border-gray-200 after:ms-6 
                          dark:text-gray-600 dark:before:border-gray-400 dark:after:border-gray-400">
                        Or
                    </div>

                    {/* Form */}
                    <form onSubmit={loginForm.handleSubmit}>
                        <div className="grid gap-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 dark:text-gray-900">
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                        onChange={loginForm.handleChange}
                                        value={loginForm.values.email}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                               focus:border-blue-500 focus:ring-blue-500 
                               dark:bg-gray-50 dark:border-gray-300 dark:text-gray-900 dark:placeholder-gray-500 
                               dark:focus:ring-blue-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <label htmlFor="password" className="block text-sm mb-2 dark:text-gray-900">
                                        Password
                                    </label>
                                    <a
                                        className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 
                               hover:underline font-medium dark:text-blue-700"
                                        href="../examples/html/recover-account.html"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="off"
                                        onChange={loginForm.handleChange}
                                        value={loginForm.values.password}
                                        className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                               focus:border-blue-500 focus:ring-blue-500 
                               dark:bg-gray-50 dark:border-gray-300 dark:text-gray-900 dark:placeholder-gray-500 
                               dark:focus:ring-blue-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 
                             dark:bg-gray-50 dark:border-gray-300 dark:checked:bg-blue-600 dark:checked:border-blue-600"
                                />
                                <label htmlFor="remember-me" className="ms-3 text-sm dark:text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium 
                           rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 
                           focus:outline-hidden focus:bg-blue-700 
                           dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
