import React, { useState, useRef, useMemo, useContext } from 'react';
import { Minus } from 'lucide-react';
import { cn } from './utils';
import './InputOTP.css';

const OTPInputContext = React.createContext(null);

const InputOTP = React.forwardRef(({
    className,
    containerClassName,
    maxLength = 6,
    value = "",
    onChange,
    children,
    ...props
}, ref) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    // Standardize value to string
    const stringValue = value ? String(value) : "";

    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length <= maxLength) {
            if (onChange) onChange(val);
        }
    };

    const handleClick = () => {
        inputRef.current?.focus();
    };

    const slots = useMemo(() => {
        const slotsArr = [];
        for (let i = 0; i < maxLength; i++) {
            const isActiveSlot = isFocused && (i === stringValue.length || (i === maxLength - 1 && stringValue.length === maxLength));
            slotsArr.push({
                char: stringValue[i] || '',
                isActive: isActiveSlot,
                hasFakeCaret: isActiveSlot
            });
        }
        return slotsArr;
    }, [stringValue, maxLength, isFocused]);

    return (
        <OTPInputContext.Provider value={{ slots }}>
            <div
                className={cn("input-otp-root", containerClassName)}
                onClick={handleClick}
            >
                <input
                    ref={(node) => {
                        inputRef.current = node;
                        if (typeof ref === 'function') ref(node);
                        else if (ref) ref.current = node;
                    }}
                    value={stringValue}
                    onChange={handleChange}
                    maxLength={maxLength}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn("input-otp-hidden-field", className)}
                    autoComplete="one-time-code"
                    {...props}
                />
                <div className="flex items-center gap-2">
                    {children}
                </div>
            </div>
        </OTPInputContext.Provider>
    );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("flex items-center gap-1", className)}
            {...props}
        />
    );
});
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
    const context = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};

    return (
        <div
            ref={ref}
            data-active={isActive}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                isActive && "z-10 ring-2 ring-ring ring-offset-background",
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <Minus className="h-4 w-4" />
    </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
