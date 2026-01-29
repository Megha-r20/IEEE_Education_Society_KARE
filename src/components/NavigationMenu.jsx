import React, { useState, useContext, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './utils';
import './NavigationMenu.css';

const NavigationMenuContext = React.createContext({
    value: null,
    onValueChange: () => { },
    viewportRef: null,
    setViewportRect: () => { }
});

const NavigationMenu = React.forwardRef(({ className, children, viewport = true, ...props }, ref) => {
    const [value, setValue] = useState(null);
    const [viewportRect, setViewportRect] = useState(null);
    const viewportRef = useRef(null);

    const onValueChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <NavigationMenuContext.Provider value={{ value, onValueChange, viewportRef, setViewportRect }}>
            <nav
                ref={ref}
                className={cn("navigation-menu-root", className)}
                onMouseLeave={() => setValue(null)} // Close on leave
                {...props}
            >
                {children}
                {viewport && <NavigationMenuViewport ref={viewportRef} />}
            </nav>
        </NavigationMenuContext.Provider>
    );
});
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("navigation-menu-list", className)}
        {...props}
    />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("navigation-menu-item", className)} {...props} />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const navigationMenuTriggerStyle = () => "navigation-menu-trigger";

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { onValueChange, value } = useContext(NavigationMenuContext);
    const uniqueId = React.useId(); // Simple ID for matching content
    // Actually Radix uses value matching. We need matching IDs between trigger and content.
    // Simplifying: User usually wraps Trigger and Content in Item. 
    // We'll rely on the parent Item providing Context? No, manual imp keeps it simple.
    // Let's assume the user passes a value prop? 
    // Radix NavigationMenu is complex. Let's use a simple context in Item.

    // REFACTOR: Use Item context.
    return (
        <NavigationMenuItemContext.Consumer>
            {({ value: itemValue, onTriggerEnter, onTriggerClick }) => {
                const isOpen = value === itemValue;
                return (
                    <button
                        ref={ref}
                        className={cn("navigation-menu-trigger group", className)}
                        onMouseEnter={onTriggerEnter}
                        onClick={onTriggerClick}
                        data-state={isOpen ? 'open' : 'closed'}
                        {...props}
                    >
                        {children}{" "}
                        <ChevronDown
                            className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                        />
                    </button>
                )
            }}
        </NavigationMenuItemContext.Consumer>
    );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// Helper context for Item to coordinate Trigger and Content
const NavigationMenuItemContext = React.createContext({});

// Wrap Item to provide unique ID
const NavigationMenuItemWrapped = React.forwardRef(({ className, children, value: propValue, ...props }, ref) => {
    const uniqueId = React.useId();
    const itemValue = propValue || uniqueId;
    const { onValueChange, value: globalValue } = useContext(NavigationMenuContext);

    const onTriggerEnter = () => onValueChange(itemValue);
    const onTriggerClick = () => {
        if (globalValue === itemValue) onValueChange(null);
        else onValueChange(itemValue);
    }

    return (
        <NavigationMenuItemContext.Provider value={{ value: itemValue, onTriggerEnter, onTriggerClick }}>
            <li ref={ref} className={cn("navigation-menu-item relative", className)} {...props}>
                {children}
            </li>
        </NavigationMenuItemContext.Provider>
    );
});
NavigationMenuItemWrapped.displayName = "NavigationMenuItem";


const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => {
    const { value: globalValue } = useContext(NavigationMenuContext);
    const { value: itemValue } = useContext(NavigationMenuItemContext);

    const isOpen = globalValue === itemValue;

    if (!isOpen) return null;

    // In a real viewport imp, this would be portaled or calculated. 
    // For manual simple ver, absolute position it.
    return (
        <div
            ref={ref}
            className={cn("navigation-menu-content", className)}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        />
    );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef(({ className, ...props }, ref) => (
    <a
        ref={ref}
        className={cn("navigation-menu-link", className)}
        {...props}
    />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => {
    // Only visual container in this simple implementation
    return (
        <div className="absolute left-0 top-full flex justify-center w-full">
            <div
                ref={ref}
                className={cn(
                    "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md transition-all md:w-[var(--radix-navigation-menu-viewport-width)]",
                    className
                )}
                {...props}
            >
                {/* Logic to show correct content in viewport is hard manually without resizing. 
                     We simplified Content to be absolute in Item. 
                     For strictly mimicking Radix viewport, we'd need to portal Content here.
                     Let's use the simplified "absolute in item" approach for stability 
                     and disable this viewport rendering logic basically, 
                     OR we rely on Content rendering itself absolutely and ignores Viewport?
                     
                     Update: Better to let Content render absolutely relative to Item.
                     So Viewport component is mostly a placeholder in this manual version unless we do advanced layout.
                  */}
            </div>
        </div>
    );
});
NavigationMenuViewport.displayName = "NavigationMenuViewport";

const NavigationMenuIndicator = () => null; // Skipped for manual simplicity

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItemWrapped as NavigationMenuItem, // Export wrapped version
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
};
