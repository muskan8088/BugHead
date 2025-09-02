import React from 'react';

export default function UserLayout({ children }) {
    return (
        <div className="user-layout">
            {/* You can add a header or sidebar here if needed */}
            <main>
                {children}
            </main>
        </div>
    );
}