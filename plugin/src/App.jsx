'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  issueDescription: Yup.string().required('Issue Description is required'),
  os: Yup.string().required('OS is required'),
  category: Yup.string().required('Category is required'),
  browser: Yup.string().required('Browser is required'),
  website: Yup.string().required('Website is required'),
});

const App = () => {
  const signupForm = useFormik({
    initialValues: {
      issueDescription: '',
      os: '',
      category: '',
      browser: '',
      website: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios
        .post('http://localhost:5000/issue/add', values)
        .then((result) => {
          toast.success('Issue registered successfully');
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong!');
        });
    },
    validationSchema: SignUpSchema,
  });

  return (
    <div className=" w-1/4 mx-auto my-18 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Create Issue
          </h1>
        </div>

        <div className="mt-5">
          <form onSubmit={signupForm.handleSubmit}>
            <div className="grid gap-y-4" />

            {/* Issue Description Dropdown */}
            <div>
              <label
                htmlFor="issueDescription"
                className="block text-sm mb-2 dark:text-white"
              >
                Issue Description
              </label>
              <select
                id="issueDescription"
                name="issueDescription"
                onChange={signupForm.handleChange}
                value={signupForm.values.issueDescription}
                className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
                dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="">-- Select Issue --</option>
                <option value="UI not loading">UI not loading</option>
                <option value="Slow response">Slow response</option>
                <option value="App crashed">App crashed</option>
                <option value="Security issue">Security issue</option>
                <option value="Other">Other</option>
              </select>
              {signupForm.errors.issueDescription &&
                signupForm.touched.issueDescription && (
                  <p className="text-xs text-red-600 mt-2">
                    {signupForm.errors.issueDescription}
                  </p>
                )}
            </div>

            {/* OS Dropdown */}
            <div>
              <label htmlFor="os" className="block text-sm mb-2 dark:text-white">
                Operating System
              </label>
              <select
                id="os"
                name="os"
                onChange={signupForm.handleChange}
                value={signupForm.values.os}
                className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
                dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="">-- Select OS --</option>
                <option value="Windows">Windows</option>
                <option value="Linux">Linux</option>
                <option value="macOS">macOS</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
              {signupForm.errors.os && signupForm.touched.os && (
                <p className="text-xs text-red-600 mt-2">
                  {signupForm.errors.os}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm mb-2 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={signupForm.handleChange}
                value={signupForm.values.category}
                className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
                dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="">-- Select Category --</option>
                <option value="UI Bug">UI Bug</option>
                <option value="Performance">Performance</option>
                <option value="Crash">Crash</option>
                <option value="Security">Security</option>
                <option value="Other">Other</option>
              </select>
              {signupForm.errors.category && signupForm.touched.category && (
                <p className="text-xs text-red-600 mt-2">
                  {signupForm.errors.category}
                </p>
              )}
            </div>

            {/* Browser Dropdown */}
            <div>
              <label
                htmlFor="browser"
                className="block text-sm mb-2 dark:text-white"
              >
                Browser
              </label>
              <select
                id="browser"
                name="browser"
                onChange={signupForm.handleChange}
                value={signupForm.values.browser}
                className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
                dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="">-- Select Browser --</option>
                <option value="Chrome">Chrome</option>
                <option value="Firefox">Firefox</option>
                <option value="Edge">Edge</option>
                <option value="Safari">Safari</option>
                <option value="Opera">Opera</option>
              </select>
              {signupForm.errors.browser && signupForm.touched.browser && (
                <p className="text-xs text-red-600 mt-2">
                  {signupForm.errors.browser}
                </p>
              )}
            </div>

            {/* Website Dropdown */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm mb-2 dark:text-white"
              >
                Website
              </label>
              <select
                id="website"
                name="website"
                onChange={signupForm.handleChange}
                value={signupForm.values.website}
                className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm 
                focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 
                dark:text-neutral-400 dark:focus:ring-neutral-600"
              >
                <option value="">-- Select Website --</option>
                <option value="https://google.com">Google</option>
                <option value="https://facebook.com">Facebook</option>
                <option value="https://twitter.com">Twitter</option>
                <option value="https://github.com">GitHub</option>
                <option value="https://yourwebsite.com">Other</option>
              </select>
              {signupForm.errors.website && signupForm.touched.website && (
                <p className="text-xs text-red-600 mt-2">
                  {signupForm.errors.website}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm 
              font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 
              focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
