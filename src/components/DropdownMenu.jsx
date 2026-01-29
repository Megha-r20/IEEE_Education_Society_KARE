import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Check, Circle } from 'lucide-react';
import classNames from 'classnames';
import './DropdownMenu.css';

const DropdownMenuContext = React.createContext(null);

const DropdownMenu = ({ children, open: controlledOpen, onOpenChange, ...props }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);
    const triggerRef = useRef(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

    const handleOpenChange = useCallback((newOpen) => {
        if (newOpen && triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
        setOpen(newOpen);
    }, [setOpen]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (open) {
                // Logic to check if click is inside content or trigger is handled by their event bubbling stopping specific events or checking node containment
                // Simple approach: Close if click happened global (and wasn't stopped).
                // But we need to NOT close if clicking the trigger.
                // We will rely on bubbling. 
                // Actually, best way: 
                // Trigger click -> toggles (stops prop).
                // Content click -> stops prop usually? or items close it.
                // Outside -> closes.
                setOpen(false);
            }
        };

        if (open) {
            // Defer to avoid immediate close from the trigger click itself
            setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [open, setOpen]);

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen: handleOpenChange, triggerRef, triggerRect }}>
            <div className="dropdown-menu-root" {...props}>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
};
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = React.forwardRef(({ asChild, children, onClick, ...props }, ref) => {
    const { setOpen, open, triggerRef } = useContext(DropdownMenuContext);

    // Merge ref
    const combinedRef = (node) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent global close listener from seeing this
        if (onClick) onClick(e);
        setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ref: combinedRef, onClick: handleClick, 'data-state': open ? 'open' : 'closed', ...props });
    }

    return (
        <button ref={combinedRef} type="button" onClick={handleClick} data-state={open ? 'open' : 'closed'} {...props}>
            {children}
        </button>
    );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuPortal = ({ children }) => {
    const { open } = useContext(DropdownMenuContext);
    if (!open) return null;
    return createPortal(children, document.body);
};
DropdownMenuPortal.displayName = "DropdownMenuPortal";

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, style, ...props }, ref) => {
    const { triggerRect } = useContext(DropdownMenuContext);

    // Simple positioning logic
    // Default to bottom-left aligned
    const posStyle = triggerRect ? {
        position: 'fixed',
        top: triggerRect.bottom + sideOffset,
        left: triggerRect.left,
        minWidth: '8rem',
        zIndex: 50,
        ...style
    } : style;

    return (
        <DropdownMenuPortal>
            <div
                ref={ref}
                className={classNames('dropdown-menu-content', className)}
                style={posStyle}
                onClick={(e) => e.stopPropagation()}
                {...props}
            />
        </DropdownMenuPortal>
    );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(({ className, inset, variant, onClick, disabled, ...props }, ref) => {
    const { setOpen } = useContext(DropdownMenuContext);
    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) onClick(e);
        setOpen(false);
    };

    return (
        <div
            ref={ref}
            className={classNames(
                'dropdown-menu-item',
                inset && 'pl-8',
                variant === 'destructive' && 'text-red-500',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={handleClick}
            {...props}
        />
    );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = ({ className, inset, ...props }) => (
    <div className={classNames('dropdown-menu-label', inset && 'pl-8', className)} {...props} />
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = ({ className, ...props }) => (
    <div className={classNames('dropdown-menu-separator', className)} {...props} />
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, onCheckedChange, ...props }, ref) => {
    const { setOpen } = useContext(DropdownMenuContext);
    const handleClick = (e) => {
        e.stopPropagation(); // Keep open usually? Or close? Radix keeps open usually for checkbox?
        // Actually usually standard interaction is simple toggle. 
        if (onCheckedChange) onCheckedChange(!checked);
        // setOpen(false); // Optional: close on check? Usually no for multiselect.
    };

    return (
        <div
            ref={ref}
            className={classNames('dropdown-menu-item pl-8', className)}
            onClick={handleClick}
            {...props}
        >
            <span className="dropdown-menu-item-indicator">
                {checked && <Check className="w-4 h-4" />}
            </span>
            {children}
        </div>
    );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={classNames('dropdown-menu-item pl-8', className)}
            {...props}
        >
            <span className="dropdown-menu-item-indicator">
                <Circle className="w-2 h-2 fill-current" />
            </span>
            {children}
        </div>
    );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuGroup = ({ className, ...props }) => (
    <div className={classNames('dropdown-menu-group', className)} {...props} />
);

const DropdownMenuShortcut = ({ className, ...props }) => (
    <span className={classNames('dropdown-menu-shortcut', className)} {...props} />
);

const DropdownMenuSub = ({ children }) => <div>{children}</div>; // Placeholder
const DropdownMenuSubTrigger = ({ children }) => <div className="dropdown-menu-item">{children} <ChevronRight className="ml-auto w-4 h-4" /></div>;
const DropdownMenuSubContent = () => null;
const DropdownMenuRadioGroup = ({ children }) => <div>{children}</div>;

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
};
