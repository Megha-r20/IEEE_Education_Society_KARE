import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = React.forwardRef(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" className="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(({ className = '', ...props }, ref) => (
    <ol ref={ref} className={`breadcrumb-list ${className}`} {...props} />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(({ className = '', ...props }, ref) => (
    <li ref={ref} className={`breadcrumb-item ${className}`} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(({ asChild, className = '', children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            ref,
            className: `breadcrumb-link ${className} ${children.props.className || ''}`,
            ...props,
        });
    }
    return (
        <a ref={ref} className={`breadcrumb-link ${className}`} {...props}>
            {children}
        </a>
    );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef(({ className = '', ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={`breadcrumb-page ${className}`} {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className = '', ...props }) => (
    <li role="presentation" aria-hidden="true" className={`breadcrumb-separator ${className}`} {...props}>
        {children ?? <ChevronRight className="breadcrumb-separator-icon" />}
    </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className = '', ...props }) => (
    <span role="presentation" aria-hidden="true" className={`breadcrumb-ellipsis ${className}`} {...props}>
        <MoreHorizontal className="breadcrumb-ellipsis-icon" />
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
