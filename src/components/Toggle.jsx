import React, { createContext, useContext, useState } from 'react';
import { cn } from './utils';
import './Toggle.css'; // Shared CSS

// Toggle Component (Standalone)
const Toggle = React.forwardRef(({ className, pressed, onPressedChange, defaultPressed = false, variant = "default", size = "default", disabled, children, ...props }, ref) => {
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
    const isControlled = pressed !== undefined;
    const isPressed = isControlled ? pressed : uncontrolledPressed;

    const handleClick = () => {
        if (disabled) return;
        const newState = !isPressed;
        if (!isControlled) setUncontrolledPressed(newState);
        if (onPressedChange) onPressedChange(newState);
    };

    return (
        <button
            ref={ref}
            type="button"
            data-state={isPressed ? 'on' : 'off'}
            disabled={disabled}
            className={cn("toggle-root", `toggle-${variant}`, `toggle-${size}`, className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});
Toggle.displayName = "Toggle";

// ToggleGroup Component
const ToggleGroupContext = createContext({
    value: undefined,
    onValueChange: () => { },
    type: 'single', // 'single' | 'multiple'
    variant: 'default',
    size: 'default'
});

const ToggleGroup = React.forwardRef(({ className, type = "single", value, defaultValue, onValueChange, variant = "default", size = "default", children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || (type === "multiple" ? [] : undefined));
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const handleItemClick = (itemValue) => {
        let newValue;
        if (type === "single") {
            // If clicking selected, allow deselect? Radix default depends on configuration. 
            // Often toggle group allows deselect if not enforced. Assuming robust toggle behavior:
            newValue = currentValue === itemValue ? undefined : itemValue;
        } else {
            const arrayVal = Array.isArray(currentValue) ? currentValue : [];
            if (arrayVal.includes(itemValue)) {
                newValue = arrayVal.filter(v => v !== itemValue);
            } else {
                newValue = [...arrayVal, itemValue];
            }
        }

        if (!isControlled) setUncontrolledValue(newValue);
        if (onValueChange) onValueChange(newValue);
    };

    return (
        <ToggleGroupContext.Provider value={{ value: currentValue, onValueChange: handleItemClick, type, variant, size }}>
            <div
                ref={ref}
                role="group"
                className={cn("toggle-group", className)}
                {...props}
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
});
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef(({ className, value, children, variant, size, ...props }, ref) => {
    const context = useContext(ToggleGroupContext);
    const contextVariant = context.variant || variant || "default";
    const contextSize = context.size || size || "default";

    let isPressed = false;
    if (context.type === "single") {
        isPressed = context.value === value;
    } else {
        isPressed = Array.isArray(context.value) && context.value.includes(value);
    }

    return (
        <button
            ref={ref}
            type="button"
            data-state={isPressed ? 'on' : 'off'}
            className={cn(
                "toggle-root",
                `toggle-${contextVariant}`,
                `toggle-${contextSize}`,
                "toggle-group-item", // Specific group styling override
                className
            )}
            onClick={() => context.onValueChange(value)}
            {...props}
        >
            {children}
        </button>
    );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem };
