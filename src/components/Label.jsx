import React from 'react';
import { cn } from './utils';
import './Label.css';

const Label = React.forwardRef(({ className, children, ...props }, ref) => (
    <label
        ref={ref}
        data-slot="label"
        className={cn("label-root", className)}
        {...props}
    >
        {children}
    </label>
));
Label.displayName = "Label";

export { Label };
