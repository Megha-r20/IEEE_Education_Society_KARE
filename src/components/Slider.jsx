import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import { cn } from './utils';
import './Slider.css';

const Slider = forwardRef(({
    className,
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    defaultValue = [min],
    onValueChange,
    orientation = "horizontal",
    disabled = false,
    ...props
}, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const values = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    // Ensure values is an array
    const valArray = Array.isArray(values) ? values : [values];

    const trackRef = useRef(null);
    const thumbRefs = useRef([]);

    const handleValueChange = (newValues) => {
        if (controlledValue === undefined) {
            setUncontrolledValue(newValues);
        }
        if (onValueChange) {
            onValueChange(newValues);
        }
    };

    const getValueFromPointer = (e) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const isHorizontal = orientation === 'horizontal';

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const trackLength = isHorizontal ? rect.width : rect.height;
        const trackStart = isHorizontal ? rect.left : rect.bottom; // Bottom is start for vertical usually? Or top? Radix vertical: bottom is 0?
        // Radix vertical: usually bottom-up.

        let percent;
        if (isHorizontal) {
            percent = (clientX - rect.left) / trackLength;
        } else {
            // For vertical, usually dragging up increases value.
            // clientY increases downwards.
            // So (rect.bottom - clientY) / height
            percent = (rect.bottom - clientY) / trackLength;
        }

        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;

        const rawValue = min + percent * (max - min);
        // Round to step
        const steppedValue = Math.round((rawValue - min) / step) * step + min;
        // Clamp
        return Math.min(Math.max(steppedValue, min), max);
    };

    // Which thumb to update? The closest one.
    const updateClosestThumb = (newValue) => {
        let closestIndex = 0;
        let minDiff = Infinity;

        valArray.forEach((v, i) => {
            const diff = Math.abs(v - newValue);
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        });

        const newValues = [...valArray];
        newValues[closestIndex] = newValue;
        // Sort values to prevent crossover? Radix slider allows crossover usually, or sorts them.
        // Let's sort them for standard behavior if standard behavior implies sorted ranges.
        // Actually Radix Primitive allows thumbs to cross unless configured otherwise.
        // We will keep simple array for now.
        handleValueChange(newValues);
    };

    const handlePointerDown = (e) => {
        if (disabled) return;
        const newValue = getValueFromPointer(e);
        updateClosestThumb(newValue);

        // Capture pointer/mouse for dragging
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
        const newValue = getValueFromPointer(e);
        updateClosestThumb(newValue);
    };

    return (
        <div
            ref={ref}
            data-slot="slider"
            data-orientation={orientation}
            data-disabled={disabled}
            className={cn("slider-root", orientation === 'horizontal' ? 'slider-horizontal' : 'slider-vertical', className)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            {...props}
        >
            <div
                data-slot="slider-track"
                className="slider-track"
                ref={trackRef}
            >
                <div
                    data-slot="slider-range"
                    className="slider-range"
                    style={{
                        left: valArray.length > 1 ? `${((Math.min(...valArray) - min) / (max - min)) * 100}%` : '0%',
                        width: valArray.length > 1
                            ? `${((Math.max(...valArray) - Math.min(...valArray)) / (max - min)) * 100}%`
                            : `${((valArray[0] - min) / (max - min)) * 100}%`
                    }}
                />
            </div>
            {valArray.map((val, i) => (
                <div
                    key={i}
                    data-slot="slider-thumb"
                    className="slider-thumb"
                    style={{
                        left: `${((val - min) / (max - min)) * 100}%`
                        // For vertical we'd need bottom prop. This is simplified for horizontal mainly.
                        // Vertical support needs conditional style.
                    }}
                />
            ))}
        </div>
    );
});
Slider.displayName = "Slider";

export { Slider };
