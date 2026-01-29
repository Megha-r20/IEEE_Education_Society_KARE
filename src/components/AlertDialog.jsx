import React from 'react';
import classNames from 'classnames';
import './AlertDialog.css';
import '../components/Button.css';

// Context to manage open state if using trigger, but often AlertDialog is controlled.
// We'll implementation a simplified version that usually assumes controlled usage or simple trigger.
// For full Radix replacement we need a Portal and State. 
// We will use a Portal if possible, otherwise render in place with fixed position (Z-index handles it).

import { createPortal } from 'react-dom';

const AlertDialogContext = React.createContext(null);

const AlertDialog = ({ children, open: controlledOpen, onOpenChange }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

    return (
        <AlertDialogContext.Provider value={{ open, setOpen }}>
            {children}
        </AlertDialogContext.Provider>
    );
};

const AlertDialogTrigger = ({ asChild, children, ...props }) => {
    const { setOpen } = React.useContext(AlertDialogContext);

    const handleClick = (e) => {
        if (props.onClick) props.onClick(e);
        setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { onClick: handleClick });
    }

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

const AlertDialogPortal = ({ children }) => {
    const { open } = React.useContext(AlertDialogContext);
    if (!open) return null;
    return createPortal(children, document.body);
};

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => {
    // We handle click to close on overlay usually? AlertDialog usually requires action.
    // So no click to close by default.
    return (
        <div ref={ref} className={classNames('alert-dialog-overlay', className)} {...props} />
    );
});

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <div
            ref={ref}
            className={classNames('alert-dialog-content', className)}
            role="alertdialog"
            {...props}
        />
    </AlertDialogPortal>
));

const AlertDialogHeader = ({ className, ...props }) => (
    <div className={classNames('alert-dialog-header', className)} {...props} />
);

const AlertDialogFooter = ({ className, ...props }) => (
    <div className={classNames('alert-dialog-footer', className)} {...props} />
);

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2 ref={ref} className={classNames('alert-dialog-title', className)} {...props} />
));

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={classNames('alert-dialog-description', className)} {...props} />
));

const AlertDialogAction = React.forwardRef(({ className, onClick, ...props }, ref) => {
    // Action usually closes the dialog too if it's the confirmation
    const { setOpen } = React.useContext(AlertDialogContext);
    const handleClick = (e) => {
        if (onClick) onClick(e);
        // User might not want to close immediately if async, but usually yes.
        // We'll presume user handles close if async, but close by default for simple action.
        // Shadcn action usually doesn't auto-close? Verify? usually it does.
        // We'll leave it to user logic or simple close.
        if (!e.defaultPrevented) setOpen(false);
    };
    return (
        <button ref={ref} className={classNames('btn btn-variant-default', className)} onClick={handleClick} {...props} />
    );
});

const AlertDialogCancel = React.forwardRef(({ className, onClick, ...props }, ref) => {
    const { setOpen } = React.useContext(AlertDialogContext);
    const handleClick = (e) => {
        if (onClick) onClick(e);
        setOpen(false);
    };
    return (
        <button ref={ref} className={classNames('btn btn-variant-outline', className)} onClick={handleClick} {...props} />
    );
});

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
