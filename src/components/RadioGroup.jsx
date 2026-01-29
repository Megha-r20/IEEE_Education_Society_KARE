import React, { useState, useContext, useCallback } from 'react';
import { Circle } from 'lucide-react';
import { cn } from './utils';
import './RadioGroup.css';

const RadioGroupContext = React.createContext({
    value: undefined,
    onValueChange: () => { },
});

const RadioGroup = React.forwardRef(({ className, value: controlledValue, defaultValue, onValueChange, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = useCallback((newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
        if (onValueChange) {
            onValueChange(newValue);
        }
    }, [isControlled, onValueChange]);

    return (
        <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div
                role="radiogroup"
                ref={ref}
                className={cn("radio-group-root", className)}
                {...props}
            />
        </RadioGroupContext.Provider>
    );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef(({ className, value, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useContext(RadioGroupContext);
    const isChecked = selectedValue === value;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isChecked}
            data-state={isChecked ? "checked" : "unchecked"}
            disabled={disabled}
            ref={ref}
            className={cn("radio-group-item", className)}
            onClick={() => !disabled && onValueChange(value)}
            {...props}
        >
            <span className="radio-group-indicator">
                {isChecked && <Circle className="h-2.5 w-2.5 fill-current text-current" />}
            </span>
        </button>
    );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
