import React from 'react';
import { Check } from 'lucide-react';
import './Checkbox.css';

const Checkbox = React.forwardRef(({ className = '', checked, onCheckedChange, disabled, ...props }, ref) => {
    // Simple controlled/uncontrolled handling can be added if needed, 
    // but usually these are controlled. We'll support controlled for now 
    // or a simple onClick toggle if onChange is provided.

    const handleClick = (e) => {
        if (disabled) return;
        if (onCheckedChange) {
            onCheckedChange(!checked);
        }
    };

    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            disabled={disabled}
            ref={ref}
            className={`checkbox-root ${className}`}
            onClick={handleClick}
            {...props}
        >
            <span className="checkbox-indicator">
                {checked && <Check className="checkbox-icon" />}
            </span>
        </button>
    );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
