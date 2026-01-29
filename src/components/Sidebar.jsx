import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { PanelLeft } from 'lucide-react';
import { cn } from './utils';
import { useIsMobile } from './use-mobile';
import { Button } from './Button';
import { Input } from './Input';
import { Separator } from './Separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './Sheet';
import { Skeleton } from './Skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import './Sidebar.css';

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
}

function SidebarProvider({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}) {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);
    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = useCallback((value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
            setOpenProp(openState);
        } else {
            _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [setOpenProp, open]);

    const toggleSidebar = useCallback(() => {
        return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = useMemo(() => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
    }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider>
                <div
                    data-slot="sidebar-wrapper" // Targeted in CSS
                    style={{
                        "--sidebar-width": SIDEBAR_WIDTH,
                        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                        ...style
                    }}
                    className={cn("sidebar-wrapper group/sidebar-wrapper", className)}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    );
}

function Sidebar({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
}) {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
        return (
            <div
                data-slot="sidebar"
                className={cn("sidebar-base", className)}
                {...props}
            >
                {children}
            </div>
        );
    }

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="sidebar-mobile-content"
                    style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
                    side={side}
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
                    </SheetHeader>
                    <div className="sidebar-mobile-inner">{children}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className="sidebar-desktop-root group peer"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
            data-slot="sidebar"
        >
            {/* Sidebar Gap - handles layout spacing */}
            <div data-slot="sidebar-gap" className="sidebar-gap" />

            {/* Sidebar Container - fixed, actual visible sidebar */}
            <div
                data-slot="sidebar-container"
                className={cn("sidebar-container", className)}
                {...props}
            >
                <div
                    data-slot="sidebar-inner"
                    className="sidebar-inner"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function SidebarTrigger({ className, onClick, ...props }) {
    const { toggleSidebar } = useSidebar();
    return (
        <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn("sidebar-trigger", className)}
            onClick={(event) => {
                if (onClick) onClick(event);
                toggleSidebar();
            }}
            {...props}
        >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}

function SidebarRail({ className, ...props }) {
    const { toggleSidebar } = useSidebar();
    return (
        <button
            data-slot="sidebar-rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            className={cn("sidebar-rail", className)}
            {...props}
        />
    )
}

function SidebarInset({ className, ...props }) {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn("sidebar-inset", className)}
            {...props}
        />
    )
}

function SidebarInput({ className, ...props }) {
    return (
        <Input
            data-slot="sidebar-input"
            className={cn("sidebar-input", className)}
            {...props}
        />
    )
}

function SidebarHeader({ className, ...props }) {
    return <div data-slot="sidebar-header" className={cn("sidebar-header", className)} {...props} />
}

function SidebarFooter({ className, ...props }) {
    return <div data-slot="sidebar-footer" className={cn("sidebar-footer", className)} {...props} />
}

function SidebarSeparator({ className, ...props }) {
    return <Separator data-slot="sidebar-separator" className={cn("sidebar-separator", className)} {...props} />
}

function SidebarContent({ className, ...props }) {
    return <div data-slot="sidebar-content" className={cn("sidebar-content", className)} {...props} />
}

function SidebarGroup({ className, ...props }) {
    return <div data-slot="sidebar-group" className={cn("sidebar-group", className)} {...props} />
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
    // Handling asChild simply
    const Comp = asChild ? React.Fragment : 'div';
    // If wrapping, we might lose class if Fragment, but user usually passes Element child.
    // If asChild, we assume child props should merge.
    // For manual simplicity:
    if (asChild) {
        const child = React.Children.only(props.children);
        return React.cloneElement(child, {
            className: cn("sidebar-group-label", className, child.props.className),
            "data-slot": "sidebar-group-label"
        });
    }

    return <div data-slot="sidebar-group-label" className={cn("sidebar-group-label", className)} {...props} />
}

function SidebarGroupAction({ className, asChild = false, ...props }) {
    if (asChild) {
        const child = React.Children.only(props.children);
        return React.cloneElement(child, {
            className: cn("sidebar-group-action", className, child.props.className),
            "data-slot": "sidebar-group-action"
        })
    }
    return <button data-slot="sidebar-group-action" className={cn("sidebar-group-action", className)} {...props} />
}

function SidebarGroupContent({ className, ...props }) {
    return <div data-slot="sidebar-group-content" className={cn("sidebar-group-content", className)} {...props} />
}

function SidebarMenu({ className, ...props }) {
    return <ul data-slot="sidebar-menu" className={cn("sidebar-menu", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }) {
    return <li data-slot="sidebar-menu-item" className={cn("sidebar-menu-item group/menu-item", className)} {...props} />
}

function SidebarMenuButton({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    children,
    ...props
}) {
    const { isMobile, state } = useSidebar();

    // Construct className manually instead of CVA
    const btnClass = cn(
        "sidebar-menu-button",
        `sidebar-menu-button-${variant}`,
        `sidebar-menu-button-${size}`,
        className
    );

    let content;
    if (asChild) {
        const child = React.Children.only(children);
        content = React.cloneElement(child, {
            className: cn(btnClass, child.props.className),
            "data-active": isActive,
            "data-size": size,
            ...props
        });
    } else {
        content = (
            <button
                data-active={isActive}
                data-size={size}
                className={btnClass}
                {...props}
            >
                {children}
            </button>
        );
    }

    if (!tooltip) return content;

    // Simple tooltip handling
    return (
        <Tooltip>
            <TooltipTrigger>{content}</TooltipTrigger>
            <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile}>
                {typeof tooltip === 'string' ? tooltip : tooltip.children}
            </TooltipContent>
        </Tooltip>
    );
}

function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }) {
    const cls = cn("sidebar-menu-action", showOnHover && "show-on-hover", className);
    if (asChild) {
        const child = React.Children.only(props.children);
        return React.cloneElement(child, { className: cn(cls, child.props.className) });
    }
    return <button className={cls} {...props} />;
}

function SidebarMenuBadge({ className, ...props }) {
    return <div data-slot="sidebar-menu-badge" className={cn("sidebar-menu-badge", className)} {...props} />
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
    const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
    return (
        <div data-slot="sidebar-menu-skeleton" className={cn("sidebar-menu-skeleton", className)} {...props}>
            {showIcon && <Skeleton className="h-4 w-4 rounded-md" />}
            <Skeleton className="h-4 flex-1" style={{ width }} />
        </div>
    )
}

function SidebarMenuSub({ className, ...props }) {
    return <ul data-slot="sidebar-menu-sub" className={cn("sidebar-menu-sub", className)} {...props} />
}

function SidebarMenuSubItem({ className, ...props }) {
    return <li data-slot="sidebar-menu-sub-item" className={cn("sidebar-menu-sub-item", className)} {...props} />
}

function SidebarMenuSubButton({ asChild = false, size = "md", isActive, className, children, ...props }) {
    const cls = cn(
        "sidebar-menu-sub-button",
        `sidebar-menu-sub-button-${size}`,
        isActive && "active",
        className
    );
    if (asChild) {
        const child = React.Children.only(children);
        return React.cloneElement(child, { className: cn(cls, child.props.className), "data-active": isActive, ...props });
    }
    return <a className={cls} data-active={isActive} {...props}>{children}</a>;
}

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
};
