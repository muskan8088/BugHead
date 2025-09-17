// hooks/useAuth.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UseAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");

        if (storedUserId && storedToken) {
            setIsAuthenticated(true);
        } else {
            // Only redirect if not on the login page to prevent a loop
            if (window.location.pathname !== '/login') {
                router.push('/login');
            }
        }
        setIsLoading(false);
    }, [router]);

    return { isAuthenticated, isLoading };
};

export default UseAuth;