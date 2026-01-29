import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from './utils';
import './Sheet.css';

const SheetContext = React.createContext({
    open: false,
    setOpen: () => { }
});

const Sheet = ({ children, open: controlledOpen, onOpenChange, ...props }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

    // Controlled vs Uncontrolled logic
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback((newValue) => {
        if (!isControlled) {
            setUncontrolledOpen(newValue);
        }
        if (onOpenChange) {
            onOpenChange(newValue);
        }
    }, [isControlled, onOpenChange]);

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    );
};
Sheet.displayName = "Sheet";

const SheetTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
    const { setOpen } = useContext(SheetContext);

    // Ignoring asChild logic for manual implementation simplicity, usually implies cloning element.
    // We'll wrap in a button if not a button, or just attach onClick if we could.
    // Safest manual imp conforms to button.

    return (
        <div
            className={cn("sheet-trigger-wrapper", className)}
            onClick={() => setOpen(true)}
            {...props}
            ref={ref}
        >
            {children}
        </div>
    );
});
SheetTrigger.displayName = "SheetTrigger";

const SheetClose = React.forwardRef(({ className, children, ...props }, ref) => {
    const { setOpen } = useContext(SheetContext);

    return (
        <button
            type="button"
            className={cn("sheet-close", className)}
            onClick={() => setOpen(false)}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    );
});
SheetClose.displayName = "SheetClose";

const SheetPortal = ({ children }) => {
    // Portal logic handled in Content for manual simplicity
    return children;
};
SheetPortal.displayName = "SheetPortal";

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => {
    const { open, setOpen } = useContext(SheetContext);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className={cn("sheet-overlay", className)}
            onClick={() => setOpen(false)}
            data-state="open"
            {...props}
        />
    );
});
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => {
    const { open, setOpen } = useContext(SheetContext);

    if (!open) return null;

    return createPortal(
        <>
            <SheetOverlay />
            <div
                ref={ref}
                data-state="open"
                data-side={side}
                className={cn(
                    "sheet-content",
                    `sheet-side-${side}`,
                    className
                )}
                {...props}
            >
                {children}
                <button
                    className="sheet-close-icon"
                    onClick={() => setOpen(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </>,
        document.body
    );
});
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => (
    <div className={cn("sheet-header", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }) => (
    <div className={cn("sheet-footer", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("sheet-title", className)} {...props} />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("sheet-description", className)} {...props} />
));
SheetDescription.displayName = "SheetDescription";

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetPortal,
    SheetOverlay
};
