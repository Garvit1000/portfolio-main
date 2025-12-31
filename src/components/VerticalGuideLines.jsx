import React from 'react';

const VerticalGuideLines = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="container-xl h-full mx-auto">
                <div className="max-w-4xl h-full mx-auto relative">
                    {/* Left vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
                    {/* Right vertical line */}
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10"></div>
                </div>
            </div>
        </div>
    );
};

export default VerticalGuideLines;
