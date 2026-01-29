import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from './utils';
import './Toaster.css';

// Simple event bus for toast triggers without Context requirement for usage
const listeners = new Set();
let toastCount = 0;

const toast = (message, options = {}) => {
    const id = ++toastCount;
    const event = { id, message, ...options, type: 'default' };
    listeners.forEach((l) => l(event));
    return id;
};

toast.success = (message, options) => toast(message, { ...options, type: 'success' });
toast.error = (message, options) => toast(message, { ...options, type: 'error' });
toast.info = (message, options) => toast(message, { ...options, type: 'info' });
toast.warning = (message, options) => toast(message, { ...options, type: 'warning' });
toast.dismiss = (id) => {
    // We would need a dismiss mechanism. For simple manual imp, we might skip specialized dismiss by ID handling from outside 
    // unless we strictly track state in the component. 
    // Just broadcasting a dismiss event.
    listeners.forEach((l) => l({ type: 'dismiss', id }));
};

const Toaster = ({ position = 'bottom-right', ...props }) => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (event) => {
            if (event.type === 'dismiss') {
                setToasts((prev) => prev.filter((t) => t.id !== event.id));
                return;
            }

            const newToast = event;
            setToasts((prev) => [...prev, newToast]);

            // Auto dismiss
            if (newToast.duration !== Infinity) {
                setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
                }, newToast.duration || 4000);
            }
        };

        listeners.add(handleToast);
        return () => listeners.delete(handleToast);
    }, []);

    // Sort/Positioning logic could go here.
    // bottom-right: newest at bottom? or top? usually newest at bottom of stack, or stack grows up.
    // Let's stack them.

    return createPortal(
        <div className={cn("toaster-viewport", `toaster-${position}`)} {...props}>
            {toasts.map((t) => (
                <div key={t.id} className={cn("toast", `toast-${t.type}`)}>
                    <div className="toast-content">
                        {t.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {t.type === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        <div className="toast-message">{t.message}</div>
                        {t.description && <div className="toast-description">{t.description}</div>}
                    </div>
                    <button onClick={() => toast.dismiss(t.id)} className="toast-close">
                        <X className="h-4 w-4" />
                    </button>
                    {t.action && (
                        <button className="toast-action" onClick={t.action.onClick}>
                            {t.action.label}
                        </button>
                    )}
                </div>
            ))}
        </div>,
        document.body
    );
};

export { Toaster, toast };
