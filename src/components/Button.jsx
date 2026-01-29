import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = React.forwardRef(({
    children,
    variant = 'default',
    size = 'default',
    className = '',
    onClick,
    to,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    // Map "primary" to "default" for backward compatibility
    const finalVariant = variant === 'primary' ? 'default' : variant;
    // Map "md" to "default" for backward compatibility
    const finalSize = size === 'md' ? 'default' : size;

    const combinedClassName = `btn btn-variant-${finalVariant} btn-size-${finalSize} ${className}`;

    if (to && !disabled) {
        return (
            <Link to={to} className={combinedClassName} ref={ref} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            ref={ref}
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
export { Button };
