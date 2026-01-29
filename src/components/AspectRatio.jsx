import React from 'react';
import './AspectRatio.css';

const AspectRatio = React.forwardRef(({ ratio = 1, children, className = '', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`aspect-ratio-container ${className}`}
            style={{ '--aspect-ratio': ratio }}
            data-slot="aspect-ratio"
            {...props}
        >
            <div className="aspect-ratio-spacer" />
            <div className="aspect-ratio-content">
                {children}
            </div>
        </div>
    );
});

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
