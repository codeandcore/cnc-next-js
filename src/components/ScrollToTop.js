'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const ScrollToTop = () => {
    const { pathname } = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;