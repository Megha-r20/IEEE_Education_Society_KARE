import React from 'react';
import { cn } from './utils';
import './Switch.css';

const Switch = React.forwardRef(({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

    // Controlled vs Uncontrolled
    const isControlled = checked !== undefined;
    const stateChecked = isControlled ? checked : isChecked;

    const toggle = () => {
        if (disabled) return;
        const newState = !stateChecked;
        if (!isControlled) setIsChecked(newState);
        if (onCheckedChange) onCheckedChange(newState);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={stateChecked}
            data-state={stateChecked ? 'checked' : 'unchecked'}
            disabled={disabled}
            className={cn("switch-root", className)}
            onClick={toggle}
            ref={ref}
            {...props}
        >
            <span
                data-state={stateChecked ? 'checked' : 'unchecked'}
                className="switch-thumb"
            />
        </button>
    );
});
Switch.displayName = "Switch";

export { Switch };
