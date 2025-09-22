// App.jsx
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

                // Format issue title
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
            {/* ... rest of your component remains the same ... */}
        </>
    );
};

export default App;