import { useEffect } from 'react';

// Sets the tab title while a page is mounted, restoring the previous one after
export function useDocumentTitle(title) {
    useEffect(() => {
        const previous = document.title;
        document.title = title;
        return () => { document.title = previous; };
    }, [title]);
}
