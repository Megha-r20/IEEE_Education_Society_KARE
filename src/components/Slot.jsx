import React from 'react';

// Simple Slot implementation merging props
const Slot = React.forwardRef(({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
        return React.cloneElement(children, {
            ...props,
            ...children.props,
            ref: (node) => {
                // Handle both refs
                if (ref) {
                    if (typeof ref === 'function') ref(node);
                    else ref.current = node;
                }
                // Handle child ref if exists
                const childRef = children.ref;
                if (childRef) {
                    if (typeof childRef === 'function') childRef(node);
                    else childRef.current = node;
                }
            },
            className: [props.className, children.props.className].filter(Boolean).join(' '),
            style: { ...props.style, ...children.props.style }
        });
    }
    return null;
});
Slot.displayName = "Slot";

export { Slot };
