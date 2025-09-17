'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import "./index.css";   // ✅ your custom CSS

const IssueSchema = Yup.object().shape({
    issueDescription: Yup.string()
        .min(5, 'Too Short !!')
        .max(300, 'Too Long !!')
        .required('Issue description is required'),
    os: Yup.string().required('OS is required'),
    category: Yup.string().required('Category is required'),
    browser: Yup.string().required('Browser is required'),
    website: Yup.string().url('Invalid URL').required('Website is required'),
});

const App = ({ websiteId }) => {
    const [openForm, setOpenForm] = useState(false);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const signupForm = useFormik({
        initialValues: {
            issueDescription: '',
            os: '',
            category: '',
            browser: '',
            website: ''
        },
        validationSchema: IssueSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            if (!token) {
                toast.error("You must be logged in to report an issue ❌");
                setSubmitting(false);
                return;
            }

            try {
                // Format issue title like PluginApp does
                const formattedTitle = `[${values.category}] Bug on ${values.browser} (${values.os})`;

                await axios.post("http://localhost:5000/api/issue/add",
                    {
                        ...values,
                        title: formattedTitle,
                        websiteId: websiteId,  // ✅ Link issue to specific website
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -10 }}
                onClick={() => setOpenForm(!openForm)}
                className="floating-btn"
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
                        className="popup-form"
                    >
                        <div className="popup-content">
                            {/* Header */}
                            <div className="popup-header">
                                <h1>🚀 Report an Issue</h1>
                                <button onClick={() => setOpenForm(false)}>✖</button>
                            </div>

                            {/* Form */}
                            <form onSubmit={signupForm.handleSubmit}>
                                {/* Input Fields */}
                                {[
                                    { id: "issueDescription", label: "Issue Description", type: "text" },
                                    { id: "category", label: "Category", type: "text" },
                                    { id: "browser", label: "Browser", type: "text" },
                                    { id: "website", label: "Website", type: "url" }
                                ].map(({ id, label, type }) => (
                                    <div className="form-group" key={id}>
                                        <label htmlFor={id}>{label}</label>
                                        <input
                                            type={type}
                                            id={id}
                                            name={id}
                                            onChange={signupForm.handleChange}
                                            value={signupForm.values[id]}
                                        />
                                        {signupForm.errors[id] && (
                                            <p className="error-text">{signupForm.errors[id]}</p>
                                        )}
                                    </div>
                                ))}

                                {/* OS Dropdown */}
                                <div className="form-group">
                                    <label htmlFor="os">OS</label>
                                    <select
                                        id="os"
                                        name="os"
                                        onChange={signupForm.handleChange}
                                        value={signupForm.values.os}
                                    >
                                        <option value="">Select OS</option>
                                        <option value="Linux">🐧 Linux</option>
                                        <option value="Unix">🖥️ Unix</option>
                                        <option value="macOS">🍎 macOS</option>
                                        <option value="Windows">🪟 Windows</option>
                                    </select>
                                    {signupForm.errors.os && (
                                        <p className="error-text">{signupForm.errors.os}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="submit-btn"
                                    disabled={signupForm.isSubmitting}
                                >
                                    {signupForm.isSubmitting ? "Submitting..." : "✅ Submit"}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default App;
