'use client'
import { IconPencilCheck, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const ManageWebsite
    = () => {

        const [loading, setLoading] = useState(false);
        const [websiteList, setWebsiteList] = useState([]);

        const fetchWebsites = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/website/getall')//it will ensure filling up of data before going further into programming function.
            console.log(res.data);
            setWebsiteList(res.data);//assuming the response is an array of user objects.
            setLoading(false);
        }

        useEffect(() => {//one time re render

            
            fetchWebsites()

        }, []);

        const deleteUser= async(userId)=>{

                const res = await axios.delete(`http://localhost:5000/website/delete/${userId}`);
                if(res.status===200){
                    toast.success("user deleted successfully");
                    fetchWebsites();
                }else{
                    toast.error('error to delete user');
                    console.log('error deleting user:',res.data);
                    
                }
            }


        return (
            <div className='bg-pink-200  min-h-screen py-16'>

                <h1 className='text-center font-bold text-3xl text-pink-600 underline decoration-pink-600 decoration-dashed'>Manage Websites</h1>
                <div className='flex justify-center items-center m-8'>
                    {

                        loading ? (
                            <p>Loading...Please wait...!</p>
                        ) : (

                            <table>
                                <thead className='bg-white text-pink-600'>
                                    <tr >
                                        <th className='p-4'>Owner</th>
                                        <th className='p-4'>Name</th>
                                        
                                        <th className='p-4'>Repository</th>
                                        <th className='p-4'>Website</th>
                                        <th className='p-4'>Registered at</th>
                                        <th className='p-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white bg-pink-400'>
                                    {
                                        websiteList.map((user) => {
                                            return (
                                                <tr key={user._id} className='border-b-2'>
                                                    <td className='p-4'>{user._id}</td>
                                                    <td className='p-4'>{user.name}</td>
                                                    
                                                    <td className='p-4'>{user.repository}</td>
                                                    <td className='p-4'>{user.website}</td>
                                                    <td className='p-4'>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                    <td className='p-4'>
                                                        <button className='px-4 py-2 bg-white text-pink-600 border-2 rounded-2xl border-pink-600 mr-2'>
                                                            <Link href={`/admin/update-user/${user._id}`}>
                                                            <IconPencilCheck/>
                                                            </Link>
                                                            </button>
                                                        <button className='px-4 py-2 bg-white text-pink-600 border-2 rounded-2xl border-pink-600 ml-3'
                                                        onClick={()=>{deleteUser(user._id)}}>
                                                            <Link href={`/update-user/${user._id}`}>

                                                            <IconTrash/>
                                                            </Link>
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

export default ManageWebsite;