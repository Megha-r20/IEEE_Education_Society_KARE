import React from 'react';
import { cn } from './utils';
import './Progress.css';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
    return (
        <div
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className={cn("progress-root", className)}
            {...props}
        >
            <div
                className="progress-indicator"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </div>
    );
});
Progress.displayName = "Progress";

export { Progress };
