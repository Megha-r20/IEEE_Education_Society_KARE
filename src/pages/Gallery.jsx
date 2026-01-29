import React, { useState } from 'react';
import { Camera, Image, ImageOff } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    // const [selectedImage, setSelectedImage] = useState(null); // Modal state not needed for placeholders

    const galleryImages = [
        {
            title: 'HYPER LAUNCH Hackathon',
            category: 'Events'
        },
        {
            title: 'Winners Celebration',
            category: 'Achievements'
        },
        {
            title: 'Workshop Presentation',
            category: 'Workshops'
        },
        {
            title: 'Team Coordination Meeting',
            category: 'Team'
        },
        {
            title: 'Collaborative Innovation',
            category: 'Events'
        },
        {
            title: 'Tech Conference',
            category: 'Conferences'
        },
        {
            title: 'Education Technology Session',
            category: 'Workshops'
        },
        {
            title: 'Trophy Presentation',
            category: 'Achievements'
        },
        {
            title: 'Innovation Showcase',
            category: 'Events'
        }
    ];

    return (
        <div className="gallery-page-container">
            <div className="gallery-wrapper">
                {/* Header */}
                <div className="gallery-header">
                    <div className="icon-wrapper-center mb-6">
                        <div className="icon-circle-large-gallery">
                            <Camera size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="page-title text-white mb-4">Gallery</h1>
                    <p className="page-subtitle text-light-orange">Capturing Moments of Innovation & Excellence</p>
                </div>

                {/* Polaroid Style Section */}
                <section className="gallery-section">
                    <h2 className="section-title-medium text-white mb-8 text-center">Featured Highlights</h2>
                    <div className="polaroid-grid">
                        {galleryImages.slice(0, 6).map((image, index) => (
                            <div
                                key={index}
                                className="polaroid-card"
                            >
                                <div className="polaroid-image-wrapper">
                                    {/* Placeholder */}
                                    <div className="gallery-placeholder">
                                        <ImageOff size={48} className="text-dim-50 mb-2" />
                                        <p className="text-dim-50 text-sm">Images yet to be added</p>
                                    </div>
                                    <div className="category-badge">
                                        {image.category}
                                    </div>
                                </div>
                                <p className="polaroid-caption">{image.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Grid Style Section */}
                <section className="gallery-section">
                    <h2 className="section-title-medium text-white mb-8 text-center">Event Moments</h2>
                    <div className="masonry-grid">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className="grid-image-card"
                            >
                                {/* Placeholder */}
                                <div className="gallery-placeholder">
                                    <ImageOff size={32} className="text-dim-50 mb-2" />
                                    <p className="text-dim-50 text-xs">Images yet to be added</p>
                                </div>

                                {/* Removed overlay as there is no image to hover over */}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Event Categories */}
                <section className="gallery-section">
                    <h2 className="section-title-medium text-white mb-8 text-center">By Category</h2>
                    <div className="categories-grid">
                        {['Events', 'Workshops', 'Achievements', 'Team'].map((category) => (
                            <div
                                key={category}
                                className="category-card group"
                            >
                                <p className="category-name group-hover-white">
                                    {category}
                                </p>
                                <p className="category-count group-hover-white-80">
                                    {galleryImages.filter(img => img.category === category).length} Albums
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Closing Section */}
                <section className="cta-section">
                    <h2 className="section-title text-white mb-4">Want to be featured?</h2>
                    <p className="text-light-orange text-lg mb-6">
                        Join our events and be part of the IEEE EdSoc community. Your journey could be featured here next!
                    </p>
                    <button className="btn-primary-gallery">
                        Join Our Next Event
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Gallery;
