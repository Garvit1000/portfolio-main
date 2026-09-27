import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBrain01Icon } from '@hugeicons/core-free-icons';

// Simple Icons slug + brand colour for each tech name used in the data
const TECH_ICONS = {
    'React': ['react', '61DAFB'],
    'ReactNative': ['react', '61DAFB'],
    'JavaScript': ['javascript', 'F7DF1E'],
    'TypeScript': ['typescript', '3178C6'],
    'Typescript': ['typescript', '3178C6'],
    'Tailwind CSS': ['tailwindcss', '06B6D4'],
    'shadcn/ui': ['shadcnui', '3C3A38'],
    'Shadcn': ['shadcnui', '3C3A38'],
    'Node.js': ['nodedotjs', '339933'],
    'Express': ['express', '3C3A38'],
    'MongoDB': ['mongodb', '47A248'],
    'PostgreSQL': ['postgresql', '4169E1'],
    'PostgrSql': ['postgresql', '4169E1'],
    'Firebase': ['firebase', 'FFCA28'],
    'CSS3': ['css', '663399'],
    'CSS': ['css', '663399'],
    'Python': ['python', '3776AB'],
    'CLI': ['gnubash', '4EAA25'],
    'Vite': ['vite', '646CFF'],
    'Git': ['git', 'F05032'],
    'Vercel': ['vercel', '3C3A38'],
    'Postman': ['postman', 'FF6C37'],
    'Expo': ['expo', '3C3A38'],
};

const TechPill = ({ name, className = '' }) => {
    const icon = TECH_ICONS[name];
    return (
        <span className={`pill ${className}`}>
            {icon ? (
                <img src={`https://cdn.simpleicons.org/${icon[0]}/${icon[1]}`} alt="" className="h-3.5 w-3.5" loading="lazy" />
            ) : (
                <HugeiconsIcon icon={AiBrain01Icon} className="h-3.5 w-3.5 text-[#ff7700]" />
            )}
            {name}
        </span>
    );
};

export default TechPill;
