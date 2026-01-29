import React from 'react';
import classNames from 'classnames';
import './Input.css';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={classNames('input-root', className)}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
