import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from './analytics';

function useAnalytics() {
    const location = useLocation();
    const initialPageTracked = useRef(false);
    const lastTrackedPath = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const currentPath = location.pathname;

        // Cegah tracking duplicate untuk path yang sama
        if (lastTrackedPath.current === currentPath) {
            return;
        }

        const isInitialLoad = !initialPageTracked.current;

        if (isInitialLoad) {
            const initialPage = window.__INITIAL_PAGE__;

            if (initialPage && initialPage.tracked && initialPage.path === currentPath) {
                console.log('Analytics: Initial page already tracked by SSR');
                initialPageTracked.current = true;
                lastTrackedPath.current = currentPath;
                return;
            }
        }

        // Delay untuk memastikan DOM dan title sudah terupdate
        const timer = setTimeout(() => {
            const pageTitle = document.title;
            console.log(`Analytics Client: Tracking ${currentPath} with title: ${pageTitle}`);

            analytics.pageView(currentPath, pageTitle);
            initialPageTracked.current = true;
            lastTrackedPath.current = currentPath;
        }, 200); // Increase delay sedikit

        return () => clearTimeout(timer);
    }, [location.pathname]);
}

export default useAnalytics;