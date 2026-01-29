import React from 'react';
import { cn } from './utils';
import './Separator.css';

const Separator = React.forwardRef(
    ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
        <div
            ref={ref}
            role={decorative ? "none" : "separator"}
            aria-orientation={decorative ? undefined : orientation}
            className={cn(
                "separator-root",
                orientation === "horizontal" ? "separator-horizontal" : "separator-vertical",
                className
            )}
            {...props}
        />
    )
);
Separator.displayName = "Separator";

export { Separator };
