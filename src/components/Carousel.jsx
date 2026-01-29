import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Carousel.css';
import Button from './Button';

// Manual Carousel - Native CSS Scroll Snap
// Embla is great but we can't install it. 
// We will use scroll-snap-type for horizontal scrolling.

const CarouselContext = React.createContext(null);

const Carousel = React.forwardRef(({
    children,
    className = '',
    orientation = 'horizontal',
    ...props
}, ref) => {
    const scrollRef = useRef(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollPrev(scrollLeft > 0);
        // Use a small buffer (1px) for float calculation errors
        setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            return () => el.removeEventListener('scroll', checkScroll);
        }
    }, []);

    const scrollPrev = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    return (
        <CarouselContext.Provider value={{ scrollRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
            <div ref={ref} className={`carousel-root ${className}`} {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className = '', ...props }, ref) => {
    const { scrollRef } = React.useContext(CarouselContext);
    return (
        <div
            ref={scrollRef}
            className={`carousel-viewport snap-x snap-mandatory overflow-x-auto hide-scrollbar flex ${className}`}
            style={{ scrollBehavior: 'smooth' }}
            {...props}
        />
    );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className = '', ...props }, ref) => (
    <div
        ref={ref}
        className={`carousel-item snap-start ${className}`}
        {...props}
    />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className = '', variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = React.useContext(CarouselContext);
    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={`carousel-button carousel-prev carousel-prev-horizontal ${className}`}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeft style={{ width: '1.2rem', height: '1.2rem' }} />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
});

const CarouselNext = React.forwardRef(({ className = '', variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollNext, canScrollNext } = React.useContext(CarouselContext);
    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={`carousel-button carousel-next carousel-next-horizontal ${className}`}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRight style={{ width: '1.2rem', height: '1.2rem' }} />
            <span className="sr-only">Next slide</span>
        </Button>
    );
});

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
};
