import React, { useState } from 'react';
import classNames from 'classnames';
import './Collapsible.css';

const CollapsibleContext = React.createContext(null);

const Collapsible = React.forwardRef(({
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
    disabled = false,
    className,
    children,
    ...props
}, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = (newValue) => {
        if (onOpenChange) {
            onOpenChange(newValue);
        }
        if (!isControlled) {
            setUncontrolledOpen(newValue);
        }
    };

    return (
        <CollapsibleContext.Provider value={{ open, setOpen, disabled }}>
            <div
                ref={ref}
                data-state={open ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
                className={classNames('collapsible-root', className)}
                {...props}
            >
                {children}
            </div>
        </CollapsibleContext.Provider>
    );
});
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = React.forwardRef(({ asChild, className, children, ...props }, ref) => {
    const { open, setOpen, disabled } = React.useContext(CollapsibleContext);

    const handleClick = (e) => {
        if (props.onClick) props.onClick(e);
        if (disabled) return;
        setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref,
            onClick: handleClick,
            'data-state': open ? 'open' : 'closed',
            'data-disabled': disabled ? '' : undefined,
            className: classNames(className, children.props.className),
            ...props
        });
    }

    return (
        <button
            ref={ref}
            type="button"
            onClick={handleClick}
            data-state={open ? 'open' : 'closed'}
            data-disabled={disabled ? '' : undefined}
            className={classNames('collapsible-trigger', className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open } = React.useContext(CollapsibleContext);

    return (
        <div
            ref={ref}
            data-state={open ? 'open' : 'closed'}
            className={classNames('collapsible-content', className)}
            {...props}
        >
            <div className="collapsible-content-inner">
                {children}
            </div>
        </div>
    );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
