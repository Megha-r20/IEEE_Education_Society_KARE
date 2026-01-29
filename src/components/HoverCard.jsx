import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './HoverCard.css';

const HoverCardContext = React.createContext(null);

const HoverCard = ({
    children,
    open: controlledOpen,
    onOpenChange,
    openDelay = 700,
    closeDelay = 300,
    ...props
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);
    const triggerRef = useRef(null);

    // Timer refs
    const openTimerRef = useRef(null);
    const closeTimerRef = useRef(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = useCallback((newValue) => {
        if (onOpenChange) onOpenChange(newValue);
        else setUncontrolledOpen(newValue);
    }, [onOpenChange]);

    const handleOpen = useCallback(() => {
        clearTimeout(closeTimerRef.current);
        openTimerRef.current = setTimeout(() => {
            if (triggerRef.current) {
                setTriggerRect(triggerRef.current.getBoundingClientRect());
            }
            setOpen(true);
        }, openDelay);
    }, [openDelay, setOpen]);

    const handleClose = useCallback(() => {
        clearTimeout(openTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
            setOpen(false);
        }, closeDelay);
    }, [closeDelay, setOpen]);

    return (
        <HoverCardContext.Provider value={{
            open,
            handleOpen,
            handleClose,
            triggerRef,
            triggerRect
        }}>
            <div className="hover-card-root" {...props}>
                {children}
            </div>
        </HoverCardContext.Provider>
    );
};
HoverCard.displayName = "HoverCard";

const HoverCardTrigger = React.forwardRef(({ asChild, children, ...props }, ref) => {
    const { handleOpen, handleClose, triggerRef } = useContext(HoverCardContext);

    const combinedRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    };

    const eventProps = {
        onMouseEnter: handleOpen,
        onMouseLeave: handleClose,
        onFocus: handleOpen,
        onBlur: handleClose,
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref: combinedRef,
            ...eventProps,
            ...props
        });
    }

    return (
        <a
            ref={combinedRef}
            className="hover-card-trigger"
            {...eventProps}
            {...props}
        >
            {children}
        </a>
    );
});
HoverCardTrigger.displayName = "HoverCardTrigger";

const HoverCardPortal = ({ children }) => {
    const { open } = useContext(HoverCardContext);
    if (!open) return null;
    return createPortal(children, document.body);
};

const HoverCardContent = React.forwardRef(({ className, align = 'center', sideOffset = 4, style, ...props }, ref) => {
    const { triggerRect, handleOpen, handleClose } = useContext(HoverCardContext);

    if (!triggerRect) return null;

    // Simple positioning logic
    const top = triggerRect.bottom + sideOffset;
    let left = triggerRect.left;

    // Align center logic (simplified)
    if (align === 'center') {
        left = triggerRect.left + (triggerRect.width / 2) - 128; // Assuming generic width or centered transform
        // Note: CSS transform translate(-50%) is better for centering if width unknown
    }

    const posStyle = {
        position: 'fixed',
        top: top,
        left: align === 'center' ? triggerRect.left + (triggerRect.width / 2) : triggerRect.left,
        transform: align === 'center' ? 'translateX(-50%)' : 'none',
        zIndex: 50,
        ...style
    };

    return (
        <HoverCardPortal>
            <div
                ref={ref}
                className={classNames('hover-card-content', className)}
                style={posStyle}
                onMouseEnter={handleOpen} // Keep open when hovering content
                onMouseLeave={handleClose}
                {...props}
            />
        </HoverCardPortal>
    );
});
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
