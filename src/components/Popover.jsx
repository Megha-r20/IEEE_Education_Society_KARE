import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from './utils';
import './Popover.css';

const PopoverContext = React.createContext({
    open: false,
    setOpen: () => { },
    triggerRef: null,
    anchorRef: null,
    setTriggerRect: () => { }
});

const Popover = ({ children, open: controlledOpen, onOpenChange, ...props }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);
    const triggerRef = useRef(null);
    const anchorRef = useRef(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = useCallback((newValue) => {
        if (onOpenChange) onOpenChange(newValue);
        else setUncontrolledOpen(newValue);
    }, [onOpenChange]);

    // Click outside listener
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!open) return;
            // Simple Close on global click if open
            // We rely on stopPropagation in Content and Trigger to prevent immediate re-close/re-open logic conflicts if needed
            // But for "outside", strictly checking refs would be better if we weren't using portal in a simple way.
            // Let's assume content & trigger stop propagation of their clicks reaching window.
            setOpen(false);
        };

        if (open) {
            setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [open, setOpen]);

    return (
        <PopoverContext.Provider value={{ open, setOpen, triggerRef, anchorRef, triggerRect, setTriggerRect }}>
            {children}
        </PopoverContext.Provider>
    );
};
Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef(({ className, children, onClick, ...props }, ref) => {
    const { setOpen, open, setTriggerRect, triggerRef } = useContext(PopoverContext);

    const handleClick = (e) => {
        e.stopPropagation();
        const node = e.currentTarget;
        setTriggerRect(node.getBoundingClientRect());

        if (onClick) onClick(e);
        setOpen(!open);
    };

    return (
        <button
            ref={(node) => {
                triggerRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            data-state={open ? 'open' : 'closed'}
            className={cn("popover-trigger", className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverAnchor = React.forwardRef(({ ...props }, ref) => {
    const { anchorRef } = useContext(PopoverContext);
    return <div ref={(node) => { anchorRef.current = node; if (ref) ref.current = node; }} {...props} />;
});
PopoverAnchor.displayName = "PopoverAnchor";

const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => {
    const { open, triggerRect } = useContext(PopoverContext);

    if (!open || !triggerRect) return null;

    // Simple positioning logic
    let left = triggerRect.left;
    const top = triggerRect.bottom + sideOffset;

    if (align === 'center') {
        left = triggerRect.left + (triggerRect.width / 2);
    } else if (align === 'end') {
        left = triggerRect.right;
        // Logic for 'end' usually means right edge aligns with trigger right edge, requiring width knowledge of content.
        // We'll trust CSS transforms for exact alignment if possible, or simplified 'start' default.
    }

    const posStyle = {
        position: 'fixed',
        top: top,
        left: left,
        transform: align === 'center' ? 'translateX(-50%)' : 'none',
        zIndex: 50,
        ...style
    };

    return createPortal(
        <div
            ref={ref}
            data-state={open ? 'open' : 'closed'}
            data-side="bottom" // Hardcoded default for this manual loop
            className={cn(
                "popover-content",
                className
            )}
            style={posStyle}
            onClick={(e) => e.stopPropagation()}
            {...props}
        />,
        document.body
    );
});
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
