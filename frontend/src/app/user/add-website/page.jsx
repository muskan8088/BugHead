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
    repository: Yup.string().required('Repository is required'),
    website: Yup.string().url('Invalid URL').required('Website is required'),
    github: Yup.string().url('Invalid URL').required('GitHub link is required'),
});

const WebsiteSignup = () => {
    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            repository: '',
            website: '',
            github: '',
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                if (!token) {
                    toast.error("You must be logged in to add a website");
                    return;
                }

                // Split the repository string to get githubOwner and githubRepo
                const repoUrlParts = values.github.split('/');
                const githubOwner = repoUrlParts[repoUrlParts.length - 2];
                const githubRepo = repoUrlParts[repoUrlParts.length - 1];

                const res = await axios.post(
                    'http://localhost:5000/website/add',
                    {
                        ...values,
                        githubOwner,
                        githubRepo,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                toast.success('Website registered successfully');
                resetForm();
                // Optionally redirect to Manage Website tab
                // router.push('/user/manage-website');
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
            }
        },
        validationSchema: SignUpSchema,
    });

    return (
        <div className="flex items-center justify-center min-h-screen p-8"> {/* Added flex utilities for centering */}
            <div className="w-full max-w-md bg-white bg-opacity-90 border border-purple-200 rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h1 className="block text-4xl font-extrabold text-gray-900">
                        Add New Website
                    </h1>
                </div>

                <div>
                    {/* Form */}
                    <form onSubmit={signupForm.handleSubmit}>
                        <div className="grid gap-y-5"> {/* Increased gap */}
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2 font-semibold text-gray-800">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.name}
                                    className="py-3 px-4 block w-full border-purple-300 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 outline-none" // Updated styling
                                />
                                {signupForm.errors.name && signupForm.touched.name && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Repository */}
                            <div>
                                <label htmlFor="repository" className="block text-sm mb-2 font-semibold text-gray-800">
                                    Repository
                                </label>
                                <input
                                    type="text"
                                    id="repository"
                                    name="repository"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.repository}
                                    className="py-3 px-4 block w-full border-purple-300 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 outline-none" // Updated styling
                                />
                                {signupForm.errors.repository && signupForm.touched.repository && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.repository}
                                    </p>
                                )}
                            </div>

                            {/* Website */}
                            <div>
                                <label htmlFor="website" className="block text-sm mb-2 font-semibold text-gray-800">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.website}
                                    className="py-3 px-4 block w-full border-purple-300 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 outline-none" // Updated styling
                                />
                                {signupForm.errors.website && signupForm.touched.website && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.website}
                                    </p>
                                )}
                            </div>

                            {/* GitHub */}
                            <div>
                                <label htmlFor="github" className="block text-sm mb-2 font-semibold text-gray-800">
                                    GitHub Repo Link
                                </label>
                                <input
                                    type="url"
                                    id="github"
                                    name="github"
                                    onChange={signupForm.handleChange}
                                    value={signupForm.values.github}
                                    className="py-3 px-4 block w-full border-purple-300 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 outline-none" // Updated styling
                                />
                                {signupForm.errors.github && signupForm.touched.github && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {signupForm.errors.github}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300" // Updated styling
                            >
                                Add Website
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WebsiteSignup;