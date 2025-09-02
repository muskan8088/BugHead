'use client';
import { useParams } from 'next/navigation';
import React from 'react'

const PluginGenerator = () => {

    const { id } = useParams();

    

    return (
        <div>PluginGenerator</div>
    )
}

export default PluginGenerator;