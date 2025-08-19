'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const SignUpSchema = Yup.object().shape({
    issueDescription: Yup.string()
        .min(2, 'Too Short !!')
        .max(30, 'Too Long !!')
        .required('issueDescription is required'),
    os: Yup.string().required('Os is required'),
    category: Yup.string().required('category is required'),
    browser: Yup.string(),
    website: Yup.string().url('invalid url').required('website is required'),
});

const App = () => {
    const [openForm, setOpenForm] = useState(false);

    const signupForm = useFormik({
        initialValues: {
            issueDescription: '',
            os: '',
            category: '',
            browser: '',
            website: '',
        },
        onSubmit: (values, { resetForm }) => {
            axios
                .post('http://localhost:5000/issue/add', values)
                .then(() => {
                    toast.success('Website registered successfully');
                    resetForm();
                    setOpenForm(false);
                })
                .catch(() => {
                    toast.error('Something went wrong!');
                });
        },
        validationSchema: SignUpSchema,
    });

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenForm(!openForm)}
                className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg z-50"
            >
                <Plus size={28} />
            </motion.button>

            {/* Popup Form */}
            <AnimatePresence>
                {openForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-6 w-80 bg-white dark:bg-neutral-900 
                                   border border-gray-200 dark:border-neutral-700 rounded-xl shadow-xl z-50"
                    >
                        <div className="p-4">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Create Issue
                                </h1>
                                <button
                                    onClick={() => setOpenForm(false)}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    ✖
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={signupForm.handleSubmit} className="space-y-3">
                                {/* issueDescription */}
                                <div>
                                    <label htmlFor="issueDescription" className="block text-xs mb-1 dark:text-white">
                                        Issue Description
                                    </label>
                                    <input
                                        type="text"
                                        id="issueDescription"
                                        name="issueDescription"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.issueDescription}
                                        className="w-full px-3 py-1.5 text-sm border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                    />
                                    {signupForm.errors.issueDescription && signupForm.touched.issueDescription && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {signupForm.errors.issueDescription}
                                        </p>
                                    )}
                                </div>

                                {/* os */}
                                <div>
                                    <label htmlFor="os" className="block text-xs text-white mb-1 dark:text-white">
                                        OS
                                    </label>
                                    <select
                                        id="os"
                                        name="os"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.os}
                                        className="w-full px-3 py-1.5 text-sm border text-white rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                    >
                                        <option value="">Select OS</option>
                                        <option value="Linux">Linux</option>
                                        <option value="Unix">Unix</option>
                                        <option value="macOS">macOS</option>
                                        <option value="Windows">Windows</option>
                                    </select>
                                    {signupForm.errors.os && signupForm.touched.os && (
                                        <p className="text-xs text-red-600 mt-1">{signupForm.errors.os}</p>
                                    )}
                                </div>


                                {/* category */}
                                <div>
                                    <label htmlFor="category" className="block text-xs mb-1 dark:text-white">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.category}
                                        className="w-full px-3 py-1.5 text-sm border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                    />
                                    {signupForm.errors.category && signupForm.touched.category && (
                                        <p className="text-xs text-red-600 mt-1">{signupForm.errors.category}</p>
                                    )}
                                </div>

                                {/* browser */}
                                <div>
                                    <label htmlFor="browser" className="block text-xs mb-1 dark:text-white">
                                        Browser
                                    </label>
                                    <input
                                        type="text"
                                        id="browser"
                                        name="browser"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.browser}
                                        className="w-full px-3 py-1.5 text-sm border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                    />
                                </div>

                                {/* website */}
                                <div>
                                    <label htmlFor="website" className="block text-xs mb-1 dark:text-white">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.website}
                                        className="w-full px-3 py-1.5 text-sm border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                                    />
                                    {signupForm.errors.website && signupForm.touched.website && (
                                        <p className="text-xs text-red-600 mt-1">{signupForm.errors.website}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default App;
