import React from 'react';
import './Badge.css';

const Badge = React.forwardRef(({ className = '', variant = 'default', children, ...props }, ref) => {
    const variantClass = `badge-${variant}`;
    return (
        <span
            ref={ref}
            className={`badge ${variantClass} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
});
Badge.displayName = "Badge";

export { Badge };
