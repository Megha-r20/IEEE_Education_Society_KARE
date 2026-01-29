import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from './utils';
import './Select.css';

const SelectContext = React.createContext({
    value: undefined,
    onValueChange: () => { },
    open: false,
    setOpen: () => { },
    triggerRect: null,
    setTriggerRect: () => { }
});

const Select = ({ children, value: controlledValue, onValueChange, defaultValue, open: controlledOpen, onOpenChange, ...props }) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState(null);

    const isControlledValue = controlledValue !== undefined;
    const value = isControlledValue ? controlledValue : uncontrolledValue;

    const isControlledOpen = controlledOpen !== undefined;
    const open = isControlledOpen ? controlledOpen : uncontrolledOpen;

    const handleValueChange = (newValue) => {
        if (!isControlledValue) setUncontrolledValue(newValue);
        if (onValueChange) onValueChange(newValue);
        // Close on selection usually
        handleOpenChange(false);
    };

    const handleOpenChange = (newOpen) => {
        if (!isControlledOpen) setUncontrolledOpen(newOpen);
        if (onOpenChange) onOpenChange(newOpen);
    };

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (open) {
                // Simple check: if not clicking in a select-content layer (which stops prop) or trigger, close.
                // We rely on content stopPropagation.
                handleOpenChange(false);
            }
        };
        if (open) {
            setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [open]);

    return (
        <SelectContext.Provider value={{
            value,
            onValueChange: handleValueChange,
            open,
            setOpen: handleOpenChange,
            triggerRect,
            setTriggerRect
        }}>
            {children}
        </SelectContext.Provider>
    );
};
Select.displayName = "Select";

const SelectGroup = React.forwardRef(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("select-group", className)} {...props}>
        {children}
    </div>
));
SelectGroup.displayName = "SelectGroup";

const SelectValue = React.forwardRef(({ className, placeholder, children, ...props }, ref) => {
    const { value } = useContext(SelectContext);
    // Rough implementation: we can't easily show the *text* of the selected item if only value is stored strings.
    // Real SelectValue finds the child Item matching value and renders its children.
    // For manual simple ver: we might just render value if no children? 
    // Or we expect user to pass a mapping? 
    // Radix does fancy crawling.
    // Compromise: if value is present, render value. Ideally we want the label.
    // For now, render value or placeholder.

    return (
        <span ref={ref} className={cn("select-value", className)} {...props}>
            {children || value || placeholder}
        </span>
    );
});
SelectValue.displayName = "SelectValue";

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen, setTriggerRect } = useContext(SelectContext);
    const triggerRef = useRef(null);

    const handleClick = (e) => {
        e.stopPropagation();
        if (triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
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
            className={cn("select-trigger", className)}
            onClick={handleClick}
            data-state={open ? 'open' : 'closed'}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => {
    const { open, triggerRect } = useContext(SelectContext);

    if (!open || !triggerRect) return null;

    const style = {
        position: 'fixed',
        left: triggerRect.left,
        top: triggerRect.bottom + 4,
        minWidth: triggerRect.width,
        zIndex: 50,
    };

    return createPortal(
        <div
            ref={ref}
            className={cn("select-content", className)}
            style={style}
            onClick={(e) => e.stopPropagation()}
            data-state={open ? 'open' : 'closed'}
            {...props}
        >
            <div className="select-viewport">
                {children}
            </div>
        </div>,
        document.body
    );
});
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("select-label", className)} {...props} />
));
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useContext(SelectContext);
    const isSelected = selectedValue === value;

    return (
        <div
            ref={ref}
            className={cn("select-item", isSelected && "selected", className)}
            onClick={() => onValueChange(value)}
            data-state={isSelected ? 'checked' : 'unchecked'}
            {...props}
        >
            <span className="select-item-indicator">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            <span className="select-item-text">{children}</span>
        </div>
    );
});
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("select-separator", className)} {...props} />
));
SelectSeparator.displayName = "SelectSeparator";

const SelectScrollUpButton = () => null; // Skipped
const SelectScrollDownButton = () => null; // Skipped

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
