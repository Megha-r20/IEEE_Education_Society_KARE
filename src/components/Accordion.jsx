import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames';
import './Accordion.css';

const Accordion = ({ type = 'single', collapsible, className, children, ...props }) => {
    // Basic state management for single/multiple accordion
    const [openItem, setOpenItem] = useState(null);

    return (
        <div className={`accordion-root ${className || ''}`} {...props}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    openItem,
                    setOpenItem,
                    type,
                    collapsible
                });
            })}
        </div>
    );
};
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef(({ className, value, openItem, setOpenItem, type, collapsible, children, ...props }, ref) => {
    const isOpen = openItem === value;

    const handleToggle = () => {
        if (isOpen) {
            if (collapsible) setOpenItem(null);
        } else {
            setOpenItem(value);
        }
    };

    return (
        <div
            ref={ref}
            className={classNames('accordion-item', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { isOpen, onToggle: handleToggle });
            })}
        </div>
    );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, isOpen, onToggle, ...props }, ref) => (
    <h3 className="accordion-header">
        <button
            ref={ref}
            type="button"
            onClick={onToggle}
            className={classNames('accordion-trigger', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            {children}
            <ChevronDown className="accordion-icon" aria-hidden />
        </button>
    </h3>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, isOpen, ...props }, ref) => {
    // Simple height animation stub - for now just conditionally render or use CSS
    // Using CSS transitions requires max-height trick or JS height calculation.
    // We already have CSS for data-state open/closed animation in Accordion.css 
    // but it relies on @radix/accordion css vars usually. 
    // Let's update css to use grid or max-height.
    return (
        <div
            ref={ref}
            className={classNames('accordion-content', className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        >
            <div className="accordion-content-inner">{children}</div>
        </div>
    );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
