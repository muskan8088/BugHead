'use client';
import { useParams } from 'next/navigation';
import React from 'react'
import { CopyBlock } from 'react-code-blocks';

const PluginGenerator = () => {

    const { id } = useParams();



    return (
        <div>
            <div>
                <div>
                    {/* Code Editor */}
                </div>
                <div>
                    <CopyBlock
                        text={'jhgjhghjgj'}
                        language="text"
                        showLineNumbers="true"
                        wrapLines
                    />
                </div>
            </div>
        </div>

    )
}

export default PluginGenerator;