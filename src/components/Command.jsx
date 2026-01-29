import React, { useState, useContext, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames';
import './Command.css';

// Manual CMDK replacement
// We need a context to share the search value
const CommandContext = React.createContext({
    search: '',
    setSearch: () => { }
});

const Command = React.forwardRef(({ className, children, ...props }, ref) => {
    const [search, setSearch] = useState('');

    return (
        <CommandContext.Provider value={{ search, setSearch }}>
            <div
                ref={ref}
                className={classNames('command-root', className)}
                {...props}
            >
                {children}
            </div>
        </CommandContext.Provider>
    );
});
Command.displayName = "Command";

// Dialog wrapper - we'll make a simple fixed overlay since we don't have a Dialog component yet
// If Dialog exists later, we can swap this.
const CommandDialog = ({ children, open, onOpenChange, ...props }) => {
    if (!open) return null;

    return (
        <div className="command-dialog-overlay" onClick={() => onOpenChange && onOpenChange(false)}>
            <div className="command-dialog-content" onClick={e => e.stopPropagation()}>
                <Command className="command-dialog-inner">
                    {children}
                </Command>
            </div>
        </div>
    );
};
CommandDialog.displayName = "CommandDialog";

const CommandInput = React.forwardRef(({ className, wrapperClassName, ...props }, ref) => {
    const { search, setSearch } = useContext(CommandContext);

    return (
        <div className={classNames('command-input-wrapper', wrapperClassName)}>
            <Search className="command-input-icon" />
            <input
                ref={ref}
                className={classNames('command-input', className)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                {...props}
            />
        </div>
    );
});
CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={classNames('command-list', className)}
            {...props}
        >
            {children}
        </div>
    );
});
CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef(({ className, ...props }, ref) => {
    // In a real cmdk, this shows only if no items match.
    // For this manual implementation, detecting "empty" is hard without traversing children.
    // We'll leave it as a render-always or maybe try to CSS hide if siblings exist?
    // Hard to do "empty detection" in pure React without robust structure.
    // We'll just render it. Consumer usually conditionally renders it or cmdk handles it.
    // We'll render it but it might show up alongside items if logic isn't perfect.
    // Actually, usually you just put it in the list.
    return (
        <div
            ref={ref}
            className={classNames('command-empty', className)}
            {...props}
        />
    );
});
CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = React.forwardRef(({ className, heading, children, ...props }, ref) => {
    // If we want filtering, we need to inspect children items.
    // But children might be extensive.
    // For a simple version: we just render. 
    // If we want true filtering: we'd need to filter children based on 'value' prop vs 'search' context.

    // Let's rely on CommandItem to hide itself.
    // However, if all items are hidden, the group should arguably hide too.
    // That's complex for manual. We'll stick to Item hiding.
    return (
        <div
            ref={ref}
            className={classNames('command-group', className)}
            {...props}
        >
            {heading && <div className="command-group-heading">{heading}</div>}
            {children}
        </div>
    );
});
CommandGroup.displayName = "CommandGroup";

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={classNames('command-separator', className)}
        {...props}
    />
));
CommandSeparator.displayName = "CommandSeparator";

const CommandItem = React.forwardRef(({ className, children, onSelect, value, ...props }, ref) => {
    const { search } = useContext(CommandContext);

    // Simple filter logic
    const textValue = value || (typeof children === 'string' ? children : '');
    const matches = !search || textValue.toLowerCase().includes(search.toLowerCase());

    if (!matches) return null;

    return (
        <div
            ref={ref}
            className={classNames('command-item', className)}
            onClick={onSelect}
            role="option"
            {...props}
        >
            {children}
        </div>
    );
});
CommandItem.displayName = "CommandItem";

const CommandShortcut = ({ className, ...props }) => (
    <span
        className={classNames('command-shortcut', className)}
        {...props}
    />
);
CommandShortcut.displayName = "CommandShortcut";

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
