'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import "./index.css";

const IssueSchema = Yup.object().shape({
    issueDescription: Yup.string()
        .min(5, 'Too Short !!')
        .max(300, 'Too Long !!')
        .required('Issue description is required'),
    category: Yup.string().required('Category is required'),
    website: Yup.string().url('Invalid URL').required('Website is required'),
});

const App = ({ websiteId, userId }) => {
    const [openForm, setOpenForm] = useState(false);

    const signupForm = useFormik({
        initialValues: {
            issueDescription: '',
            category: '',
            website: ''
        },
        validationSchema: IssueSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                // Get user agent and platform from the browser
                const browser = navigator.userAgent;
                const os = navigator.platform;

                // Format issue title using template literals
                const formattedTitle = `[${values.category}] Bug on ${browser} (${os})`;

                // Post the issue without a token
                await axios.post("http://localhost:5000/issue/add", {
                    ...values,
                    title: formattedTitle,
                    websiteId: websiteId,

                    os: os, // Use the correct OS
                    browser: browser // Use the correct browser
                });

                toast.success("Issue reported successfully 🎉");
                resetForm();
                setOpenForm(false);
            } catch (error) {
                console.error("Error reporting issue:", error);
                toast.error(error.response?.data?.error || "Failed to report issue 😢");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            return (
            <div className="relative w-full flex flex-col items-center">
                {/* Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOpenForm(!openForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white font-semibold rounded-2xl shadow-md hover:bg-pink-700 transition"
                >
                    <Plus size={18} />
                    {openForm ? "Close" : "Report Issue"}
                </motion.button>

                {/* Form */}
                <AnimatePresence>
                    {openForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                                Report a Bug 🐞
                            </h2>
                            <form onSubmit={signupForm.handleSubmit} className="space-y-4">
                                {/* Website URL */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.website}
                                        placeholder="https://example.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                    />
                                    {signupForm.errors.website && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {signupForm.errors.website}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.category}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="UI Bug">UI Bug</option>
                                        <option value="Functionality Bug">Functionality Bug</option>
                                        <option value="Performance">Performance</option>
                                        <option value="Security">Security</option>
                                    </select>
                                    {signupForm.errors.category && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {signupForm.errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* Issue Description */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                                        Issue Description
                                    </label>
                                    <textarea
                                        name="issueDescription"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.issueDescription}
                                        placeholder="Describe the bug in detail..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
                                    />
                                    {signupForm.errors.issueDescription && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {signupForm.errors.issueDescription}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={signupForm.isSubmitting}
                                    className="w-full py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-pink-700 transition"
                                >
                                    {signupForm.isSubmitting ? "Submitting..." : "Submit Issue"}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            );

        </>
    );
};

export default App;
