import React, { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './Drawer.css';

const DrawerContext = React.createContext(null);

const Drawer = ({
    shouldScaleBackground,
    children,
    open: controlledOpen,
    onOpenChange,
    direction = 'bottom',
    ...props
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

    // Simple effect to handle body lock? 
    // Usually complex drawers handle body scroll locking.
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <DrawerContext.Provider value={{ open, setOpen, direction }}>
            {children}
        </DrawerContext.Provider>
    );
};
Drawer.displayName = "Drawer";

const DrawerTrigger = ({ asChild, children, onClick, ...props }) => {
    const { setOpen } = useContext(DrawerContext);

    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { onClick: handleClick, ...props });
    }

    return (
        <button type="button" onClick={handleClick} {...props}>
            {children}
        </button>
    );
};
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerPortal = ({ children }) => {
    const { open } = useContext(DrawerContext);
    if (!open) return null;
    return createPortal(children, document.body);
};
DrawerPortal.displayName = "DrawerPortal";

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => {
    const { setOpen } = useContext(DrawerContext);
    return (
        <div
            ref={ref}
            className={classNames('drawer-overlay', className)}
            onClick={() => setOpen(false)}
            {...props}
        />
    );
});
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { direction } = useContext(DrawerContext);

    // We handle simple slide animations via CSS based on direction
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <div
                ref={ref}
                className={classNames('drawer-content', `drawer-${direction}`, className)}
                {...props}
            >
                {/* Handle bar for bottom drawer */}
                {direction === 'bottom' && (
                    <div className="drawer-handle-bar" />
                )}
                {children}
            </div>
        </DrawerPortal>
    );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }) => (
    <div className={classNames('drawer-header', className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }) => (
    <div className={classNames('drawer-footer', className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2 ref={ref} className={classNames('drawer-title', className)} {...props} />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={classNames('drawer-description', className)} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

const DrawerClose = React.forwardRef(({ asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useContext(DrawerContext);

    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(false);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ref, onClick: handleClick, ...props });
    }

    return (
        <button ref={ref} type="button" onClick={handleClick} {...props}>
            {children}
        </button>
    );
});
DrawerClose.displayName = "DrawerClose";

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
