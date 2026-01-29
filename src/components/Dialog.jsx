import React, { useState, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import classNames from 'classnames';
import './Dialog.css';

const DialogContext = React.createContext(null);

const Dialog = ({ children, open: controlledOpen, onOpenChange, defaultOpen = false }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
};
Dialog.displayName = "Dialog";

const DialogTrigger = React.forwardRef(({ asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useContext(DialogContext);

    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(true);
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
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({ children }) => {
    const { open } = useContext(DialogContext);
    if (!open) return null;
    return createPortal(children, document.body);
};
DialogPortal.displayName = "DialogPortal";

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => {
    const { setOpen } = useContext(DialogContext);
    return (
        <div
            ref={ref}
            className={classNames('dialog-overlay', className)}
            onClick={() => setOpen(false)}
            {...props}
        />
    );
});
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <DialogPortal>
            <DialogOverlay />
            <div
                ref={ref}
                className={classNames('dialog-content', className)}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                {...props}
            >
                {children}
                <DialogClose className="dialog-close-button">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </div>
        </DialogPortal>
    );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
    <div className={classNames('dialog-header', className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
    <div className={classNames('dialog-footer', className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2 ref={ref} className={classNames('dialog-title', className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={classNames('dialog-description', className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const DialogClose = React.forwardRef(({ asChild, className, children, onClick, ...props }, ref) => {
    const { setOpen } = useContext(DialogContext);

    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(false);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ref, onClick: handleClick, ...props });
    }

    return (
        <button ref={ref} type="button" className={className} onClick={handleClick} {...props}>
            {children}
        </button>
    );
});
DialogClose.displayName = "DialogClose";

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogOverlay,
    DialogPortal,
};
