import React, { useState } from 'react';
import './Avatar.css';

const AvatarContext = React.createContext({
    status: 'pending', // pending | success | error
    onImageLoadingStatusChange: () => { },
});

const Avatar = React.forwardRef(({ className = '', children, ...props }, ref) => {
    const [status, setStatus] = useState('pending');

    return (
        <AvatarContext.Provider value={{ status, onImageLoadingStatusChange: setStatus }}>
            <div
                ref={ref}
                className={`avatar-root ${className}`}
                {...props}
            >
                {children}
            </div>
        </AvatarContext.Provider>
    );
});
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className = '', src, onLoadingStatusChange, ...props }, ref) => {
    const { onImageLoadingStatusChange, status } = React.useContext(AvatarContext);

    const handleLoad = () => {
        onImageLoadingStatusChange('success');
    };

    const handleError = () => {
        onImageLoadingStatusChange('error');
    };

    // If source changes, reset status
    React.useEffect(() => {
        if (!src) {
            onImageLoadingStatusChange('error');
        } else {
            // Reset to pending when src changes, but standard img loading handles most
            const img = new Image();
            img.src = src;
            img.onload = handleLoad;
            img.onerror = handleError;
        }
    }, [src]);

    if (status === 'error') return null;

    return (
        <img
            ref={ref}
            src={src}
            className={`avatar-image ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
        />
    );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className = '', children, ...props }, ref) => {
    const { status } = React.useContext(AvatarContext);

    if (status === 'success') return null;

    return (
        <span
            ref={ref}
            className={`avatar-fallback ${className}`}
            {...props}
        >
            {children}
        </span>
    );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
