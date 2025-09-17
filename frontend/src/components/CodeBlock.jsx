'use client';
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language = "javascript" }) => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-md my-4">
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    fontSize: "0.9rem",
                    borderRadius: "1rem",
                }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
