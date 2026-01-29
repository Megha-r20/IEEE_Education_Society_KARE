import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from './utils';
import './Menubar.css';

// Context for the entire Menubar
const MenubarContext = React.createContext({
    value: null,
    onValueChange: () => { },
});

// Context for individual MenubarMenu
const MenubarMenuContext = React.createContext({
    value: null,
    triggerId: null,
    contentId: null,
    triggerRect: null,
    setTriggerRect: () => { }
});

const Menubar = React.forwardRef(({ className, value, onValueChange, defaultValue, children, ...props }, ref) => {
    const [stateValue, setStateValue] = useState(defaultValue || null);
    const currentValue = value !== undefined ? value : stateValue;

    const validOnValueChange = useCallback((newValue) => {
        if (onValueChange) onValueChange(newValue);
        setStateValue(newValue);
    }, [onValueChange]);

    return (
        <MenubarContext.Provider value={{ value: currentValue, onValueChange: validOnValueChange }}>
            <div
                ref={ref}
                className={cn("menubar-root", className)}
                {...props}
            >
                {children}
            </div>
        </MenubarContext.Provider>
    );
});
Menubar.displayName = "Menubar";

const MenubarMenu = ({ value, children, ...props }) => {
    const { onValueChange } = useContext(MenubarContext);
    const uniqueId = React.useId();
    const menuValue = value || uniqueId;
    const [triggerRect, setTriggerRect] = useState(null);

    return (
        <MenubarMenuContext.Provider value={{ value: menuValue, triggerRect, setTriggerRect }}>
            {children}
        </MenubarMenuContext.Provider>
    );
};
MenubarMenu.displayName = "MenubarMenu";

const MenubarTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { value, onValueChange } = useContext(MenubarContext);
    const { value: menuValue, setTriggerRect } = useContext(MenubarMenuContext);
    const triggerRef = useRef(null);

    const isOpen = value === menuValue;

    const handleClick = () => {
        if (isOpen) {
            onValueChange(null);
        } else {
            if (triggerRef.current) {
                setTriggerRect(triggerRef.current.getBoundingClientRect());
            }
            onValueChange(menuValue);
        }
    };

    const handleMouseEnter = () => {
        if (value && value !== menuValue) {
            // Another menu is open, switch to this one
            if (triggerRef.current) {
                setTriggerRect(triggerRef.current.getBoundingClientRect());
            }
            onValueChange(menuValue);
        }
    };

    return (
        <button
            ref={(node) => {
                triggerRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            type="button"
            role="menuitem"
            className={cn("menubar-trigger", isOpen && "menubar-trigger-open", className)}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {children}
        </button>
    );
});
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarPortal = ({ children }) => {
    // Portals usually at root, here we can simplify and just render children or portal
    // We already use manual portals in content.
    return children;
};

const MenubarContent = React.forwardRef(({ className, align = 'start', sideOffset = 8, ...props }, ref) => {
    const { value } = useContext(MenubarContext);
    const { value: menuValue, triggerRect } = useContext(MenubarMenuContext);

    const isOpen = value === menuValue;

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isOpen) {
                // Logic to close? relying on Menubar overlay or simple global listener 
                // For now, simpler implementation:
                // This global listener might conflict if we don't check targets.
            }
        };
        if (isOpen) window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isOpen]);

    if (!isOpen || !triggerRect) return null;

    const style = {
        position: 'fixed',
        left: triggerRect.left,
        top: triggerRect.bottom + sideOffset,
        zIndex: 50,
    };

    return createPortal(
        <div
            ref={ref}
            className={cn("menubar-content", className)}
            style={style}
            {...props}
        >
            {/* Overlay to catch clicks outside? Or rely on global listener in Menubar? 
                 Common pattern: Transparent backdrop 
             */}
            <div className="fixed inset-0 z-[-1]" onClick={(e) => {
                // Close menu
                // We need access to onValueChange, but this component is inside portal? 
                // Context should propagate if we used a Portal component that preserves context 
                // Standard createPortal does NOT preserve context in older React, but React 18+ does tree propagation.
                // Assuming React 18+ for vite project.
            }} />
            {props.children}
        </div>,
        document.body
    );
});
MenubarContent.displayName = "MenubarContent";

// Items reused mainly from DropdownMenu styles
const MenubarItem = React.forwardRef(({ className, inset, children, ...props }, ref) => {
    const { onValueChange } = useContext(MenubarContext);
    return (
        <div
            ref={ref}
            className={cn("menubar-item", inset && "pl-8", className)}
            onClick={(e) => {
                if (props.onClick) props.onClick(e);
                onValueChange(null);
            }}
            {...props}
        >
            {children}
        </div>
    );
});
MenubarItem.displayName = "MenubarItem";

const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, onCheckedChange, ...props }, ref) => {
    const { onValueChange } = useContext(MenubarContext);
    return (
        <div
            ref={ref}
            className={cn("menubar-item pl-8", className)}
            onClick={(e) => {
                e.stopPropagation(); // Keep open usually for checkbox in menubar? Or close?
                if (onCheckedChange) onCheckedChange(!checked);
                onValueChange(null); // Usually closes
            }}
            {...props}
        >
            <span className="menubar-item-indicator">
                {checked && <Check className="w-4 h-4" />}
            </span>
            {children}
        </div>
    );
});
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

const MenubarRadioItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
    const { onValueChange } = useContext(MenubarContext);
    return (
        <div
            ref={ref}
            className={cn("menubar-item pl-8", className)}
            onClick={(e) => {
                if (props.onClick) props.onClick(e);
                onValueChange(null);
            }}
            {...props}
        >
            <span className="menubar-item-indicator">
                <Circle className="w-2 h-2 fill-current" />
            </span>
            {children}
        </div>
    );
});
MenubarRadioItem.displayName = "MenubarRadioItem";

const MenubarLabel = ({ className, inset, ...props }) => (
    <div className={cn("menubar-label", inset && "pl-8", className)} {...props} />
);

const MenubarSeparator = ({ className, ...props }) => (
    <div className={cn("menubar-separator", className)} {...props} />
);

const MenubarShortcut = ({ className, ...props }) => (
    <span className={cn("menubar-shortcut", className)} {...props} />
);

const MenubarGroup = ({ className, ...props }) => (
    <div className={cn("menubar-group", className)} {...props} />
);

const MenubarRadioGroup = ({ className, ...props }) => (
    <div className={cn("menubar-radio-group", className)} {...props} />
);

// Simplified Submenu
const MenubarSub = ({ children }) => <div>{children}</div>;
const MenubarSubTrigger = ({ className, children, ...props }) => (
    <div className={cn("menubar-item justify-between", className)} {...props}>
        {children} <ChevronRight className="ml-auto w-4 h-4" />
    </div>
);
const MenubarSubContent = () => null; // Not implemented

export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarCheckboxItem,
    MenubarRadioItem,
    MenubarLabel,
    MenubarSeparator,
    MenubarShortcut,
    MenubarGroup,
    MenubarPortal,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarRadioGroup,
};
