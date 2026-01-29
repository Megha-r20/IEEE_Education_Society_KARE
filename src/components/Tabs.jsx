import React, { useState, useContext } from 'react';
import { cn } from './utils';
import './Tabs.css';

const TabsContext = React.createContext(null);

const Tabs = React.forwardRef(({ className, defaultValue, value: controlledValue, onValueChange, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const onValueChangeHandler = (newValue) => {
        if (controlledValue === undefined) {
            setUncontrolledValue(newValue);
        }
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <TabsContext.Provider value={{ value, onValueChange: onValueChangeHandler }}>
            <div
                ref={ref}
                data-slot="tabs"
                className={cn("tabs-root", className)}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="tabs-list"
        role="tablist"
        className={cn("tabs-list", className)}
        {...props}
    >
        {children}
    </div>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, value, children, disabled, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isActive = context.value === value;

    return (
        <button
            ref={ref}
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? "active" : "inactive"}
            data-slot="tabs-trigger"
            disabled={disabled}
            className={cn("tabs-trigger", className)}
            onClick={() => !disabled && context.onValueChange(value)}
            {...props}
        >
            {children}
        </button>
    );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isActive = context.value === value;

    if (!isActive) return null;

    return (
        <div
            ref={ref}
            role="tabpanel"
            data-state={isActive ? "active" : "inactive"}
            data-slot="tabs-content"
            className={cn("tabs-content", className)}
            {...props}
        >
            {children}
        </div>
    );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
