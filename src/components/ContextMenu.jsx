import React, { useState, useEffect, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Check, Circle } from 'lucide-react';
import classNames from 'classnames';
import './ContextMenu.css';

const ContextMenuContext = React.createContext(null);

const ContextMenu = ({ children }) => {
    // Shared state for the menu
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Close on click outside
    useEffect(() => {
        const handleClick = () => setOpen(false);
        if (open) {
            window.addEventListener('click', handleClick);
            window.addEventListener('contextmenu', handleClick); // Close on other right clicks
        }
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('contextmenu', handleClick);
        };
    }, [open]);

    return (
        <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
            {children}
        </ContextMenuContext.Provider>
    );
};
ContextMenu.displayName = "ContextMenu";

const ContextMenuTrigger = ({ children, className, ...props }) => {
    const { setOpen, setPosition } = useContext(ContextMenuContext);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setOpen(true);
        setPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className={className}
            onContextMenu={handleContextMenu}
            {...props}
        >
            {children}
        </div>
    );
};
ContextMenuTrigger.displayName = "ContextMenuTrigger";

const ContextMenuPortal = ({ children }) => {
    const { open } = useContext(ContextMenuContext);
    if (!open) return null;
    return createPortal(children, document.body);
};
ContextMenuPortal.displayName = "ContextMenuPortal";

const ContextMenuContent = ({ className, ...props }) => {
    const { position } = useContext(ContextMenuContext);
    const style = {
        top: position.y,
        left: position.x,
        position: 'fixed',
        zIndex: 50
    };

    return (
        <ContextMenuPortal>
            <div
                className={classNames('context-menu-content', className)}
                style={style}
                onClick={(e) => e.stopPropagation()}
                {...props}
            />
        </ContextMenuPortal>
    );
};
ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuGroup = ({ className, ...props }) => (
    <div className={classNames('context-menu-group', className)} {...props} />
);
ContextMenuGroup.displayName = "ContextMenuGroup";

const ContextMenuItem = ({ className, inset, variant, onClick, disabled, ...props }) => {
    const { setOpen } = useContext(ContextMenuContext);

    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) onClick(e);
        setOpen(false);
    };

    return (
        <div
            className={classNames(
                'context-menu-item',
                inset && 'pl-8',
                variant === 'destructive' && 'text-red-500',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            onClick={handleClick}
            {...props}
        />
    );
};
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuCheckboxItem = ({ className, children, checked, onCheckedChange, ...props }) => {
    const { setOpen } = useContext(ContextMenuContext);
    const handleClick = (e) => {
        if (onCheckedChange) onCheckedChange(!checked);
        setOpen(false);
    };

    return (
        <div
            className={classNames('context-menu-item', className)}
            onClick={handleClick}
            {...props}
        >
            <span className="context-menu-item-indicator">
                {checked && <Check className="w-4 h-4" />}
            </span>
            {children}
        </div>
    );
};
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioItem = ({ className, children, value, ...props }) => {
    // Simplified usually handled by group state
    return (
        <div
            className={classNames('context-menu-item', className)}
            {...props}
        >
            <span className="context-menu-item-indicator">
                <Circle className="w-2 h-2 fill-current" />
            </span>
            {children}
        </div>
    );
};
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuLabel = ({ className, inset, ...props }) => (
    <div className={classNames('context-menu-label', inset && 'pl-8', className)} {...props} />
);

const ContextMenuSeparator = ({ className, ...props }) => (
    <div className={classNames('context-menu-separator', className)} {...props} />
);

const ContextMenuShortcut = ({ className, ...props }) => (
    <span className={classNames('context-menu-shortcut', className)} {...props} />
);

// Submenus are complex manually. Just rendering children for now.
const ContextMenuSub = ({ children }) => <div>{children}</div>;
const ContextMenuSubTrigger = ({ children, className, inset, ...props }) => (
    <div className={classNames('context-menu-item justify-between', inset && 'pl-8', className)} {...props}>
        {children} <ChevronRight className="w-4 h-4 ml-auto" />
    </div>
);
const ContextMenuSubContent = ({ className, ...props }) => (
    <div className={classNames('context-menu-content ml-2', className)} {...props} />
);
const ContextMenuRadioGroup = ({ children }) => <div>{children}</div>;


export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuGroup,
    ContextMenuPortal,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuRadioGroup,
};
