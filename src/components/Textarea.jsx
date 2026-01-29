import React from 'react';
import { cn } from './utils';
import './Textarea.css';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            data-slot="textarea"
            className={cn(
                "textarea-root",
                className
            )}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
