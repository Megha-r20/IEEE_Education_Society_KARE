import React from 'react';
import { cn } from './utils';
import './ScrollArea.css';

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("scroll-area-root", className)}
        {...props}
    >
        <div className="scroll-area-viewport">
            {children}
        </div>
    </div>
));
ScrollArea.displayName = "ScrollArea";

// Dummy ScrollBar for API compatibility if needed, 
// though manual implementation handles scrolling natively via CSS.
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
    null
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
