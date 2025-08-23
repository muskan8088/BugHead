'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import "./index.css";   // ✅ your custom CSS

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
        initialValues: { issueDescription: '', os: '', category: '', browser: '', website: '' },
        validationSchema: SignUpSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, { resetForm }) => {
            axios.post("http://localhost:5000/issue/add", values)
                .then(() => {
                    toast.success("Website registered successfully 🎉");
                    resetForm();
                    setOpenForm(false);
                })
                .catch(() => {
                    toast.error("Something went wrong 😢");
                });
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
                                <h1>🚀 Create Issue</h1>
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
                                        {signupForm.errors[id] && signupForm.touched[id] && (
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
                                    {signupForm.errors.os && signupForm.touched.os && (
                                        <p className="error-text">{signupForm.errors.os}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="submit-btn"
                                >
                                    ✅ Submit
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
