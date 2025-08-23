'use client';
import { IconPencilCheck, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    // Function to fetch users from the API/Backend
    const fetchUsers = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/user/getall')
        console.log(res.data);
        setUserList(res.data); // Assuming the response is an array of user objects
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        const res = await axios.delete(`http://localhost:5000/user/delete/${userId}`);
        if (res.status === 200) {
            toast.success('User Delete Successfully');
            fetchUsers();
        } else {
            toast.error("Failed to delete user");
            console.log("Error deleting user:", res.data);
        }
    }


    return (
        <div className='bg-emerald-800 min-h-screen py-16'>
            <h1 className='text-center font-bold text-3xl text-white underline decoration-amber-500 decoration-wavy'>Manage Users</h1>

            <div className='flex justify-center item -center mt-8'>
                {
                    loading ? (
                        <p>Loading...Please Wait...!!</p>
                    )
                        : (
                            <table>
                                <thead className='bg-black'>
                                    <tr>
                                        <th className='text-white'>User ID</th>
                                        <th className='text-white'>Username</th>
                                        <th className='text-white'>Email</th>
                                        <th className='text-white'>Registered At</th>
                                        <th className='text-white'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-700'>
                                    {
                                        userList.map((user) => {
                                            return (
                                                <tr key={user._id} className='text-white border-b-2'>
                                                    <td className='p-4'>{user.name}</td>
                                                    <td className='p-4'>{user._id}</td>
                                                    <td className='p-4'>{user.email}</td>
                                                    <td className='p-4'>
                                                        
                                                        { new Date(user.createdAt).toLocaleDateString()}</td>
                                                    <td className=''>
                                                        <button className='px-4 py-2 rounded-2xl bg-amber-300 border-2 border-black'>
                                                            <Link href={`/admin/update-users/${user._id}`}>
                                                                <IconPencilCheck />
                                                            </Link>
                                                        </button>
                                                        <button className='px-4 py-2 rounded-2xl bg-amber-300 border-2 border-black ml-4'
                                                            onClick={() => { deleteUser(user._id) }}>
                                                            <IconTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </div>
    )
}

export default ManageUsers;