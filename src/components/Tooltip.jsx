import React, { useState, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from './utils';
import './Tooltip.css';

const TooltipContext = React.createContext({
    open: false,
    setOpen: () => { },
    triggerRect: null,
    setTriggerRect: () => { }
});

const TooltipProvider = ({ children, delayDuration = 0 }) => {
    // delayDuration handling skipped for simplicity in first pass manual, but added stub.
    return <>{children}</>;
};

const Tooltip = ({ children, ...props }) => {
    const [open, setOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);

    return (
        <TooltipContext.Provider value={{ open, setOpen, triggerRect, setTriggerRect }}>
            {children}
        </TooltipContext.Provider>
    );
};

const TooltipTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
    const { setOpen, setTriggerRect } = useContext(TooltipContext);
    const triggerRef = useRef(null);

    return (
        <span
            ref={(node) => {
                triggerRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            className="tooltip-trigger-wrapper"
            onMouseEnter={() => {
                if (triggerRef.current) setTriggerRect(triggerRef.current.getBoundingClientRect());
                setOpen(true);
            }}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => {
                if (triggerRef.current) setTriggerRect(triggerRef.current.getBoundingClientRect());
                setOpen(true);
            }}
            onBlur={() => setOpen(false)}
            {...props}
        >
            {children}
        </span>
    );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => {
    const { open, triggerRect } = useContext(TooltipContext);

    if (!open || !triggerRect) return null;

    // Simple top positioning strategy
    const style = {
        position: 'fixed',
        top: triggerRect.top - sideOffset, // Actually need height of tooltip to place correctly ABOVE (top - height - offset).
        // Since we don't measure tooltip height easily without render, let's default to bottom placement for stability 
        // OR use CSS transform translateY(-100%) to flip it up from top edge.
        left: triggerRect.left + (triggerRect.width / 2),
        // transform handled in CSS class if we want to center.
        zIndex: 50
    };

    return createPortal(
        <div
            ref={ref}
            className={cn("tooltip-content", className)}
            style={style}
            {...props}
        >
            {children}
            {/* Arrow could be added here manually if desired */}
            <div className="tooltip-arrow" />
        </div>,
        document.body
    );
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
