import { createElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { CityArt } from '../components/stamp-art';

/* The hero's city illustration as an <img>, used as the sample photo before
   anyone drops their own. Rendered with the client renderer already in the
   bundle, then loaded from a data URL (so the canvas stays untainted). */
let samplePromise;
export function loadSampleImage() {
    samplePromise ??= new Promise((resolve, reject) => {
        // Defer a tick: callers are usually inside a React effect, where
        // flushSync can't render synchronously and would leave host empty.
        setTimeout(() => {
            const host = document.createElement('div');
            const root = createRoot(host);
            flushSync(() => root.render(createElement(CityArt)));
            const markup = host.innerHTML.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg" width="540" height="624"');
            root.unmount();
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
        }, 0);
    }).catch((err) => {
        samplePromise = null; // don't cache a failure
        throw err;
    });
    return samplePromise;
}
