import React from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from './utils';
import './Resizable.css';

const ResizablePanelGroup = ({ className, direction = "horizontal", ...props }) => {
    return (
        <div
            data-panel-group-direction={direction}
            className={cn(
                "resizable-panel-group",
                direction === "vertical" ? "flex-col" : "flex-row",
                className
            )}
            {...props}
        />
    );
};

const ResizablePanel = ({ className, defaultSize, minSize, maxSize, ...props }) => {
    // In a full implementation, defaultSize would convert to flex-basis or percentage.
    // Here we just use flex-1 to distribute space, or allow style overrides if provided via style prop or className.
    return (
        <div
            className={cn("resizable-panel", className)}
            style={{ flex: defaultSize ? defaultSize : 1 }} // rudimentary support for sizing
            {...props}
        />
    );
};

const ResizableHandle = ({ withHandle, className, ...props }) => {
    return (
        <div
            className={cn(
                "resizable-handle",
                className
            )}
            {...props}
        >
            {withHandle && (
                <div className="resizable-handle-icon-wrapper">
                    <GripVertical className="h-2.5 w-2.5" />
                </div>
            )}
        </div>
    );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
