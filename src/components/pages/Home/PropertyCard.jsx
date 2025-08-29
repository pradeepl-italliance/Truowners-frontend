// src/components/cards/PropertyCard/PropertyCard.jsx
import React from 'react';
import './PropertyCard.css';
import bed from '../../../assets/images/Bed.png';
import bath from '../../../assets/images/Bath.png';
import areaImg from '../../../assets/images/area.png';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import Favorite from '@mui/icons-material/Favorite';
import { useWishlist } from '../../../context/Wishlist';
import watermark from '../../../assets/images/water1.png';
import fallbackImg from '../../../assets/images/Errorimg.png';

const WishlistButton = styled(IconButton)(({ theme, isWishlisted }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: isWishlisted ? '#d32f2f' : '#666',
  zIndex: 1,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: '#d32f2f',
    transform: 'scale(1.1)',
  },
}));

const PropertyCard = ({
  property,
  isAuthenticated,
  onLoginRequired,
  onViewDetails,
  onWishlistToggle,
}) => {
  const { isIn, toggle } = useWishlist();

  // Add comprehensive validation for property
  if (!property) {
    console.error('PropertyCard: No property data provided');
    return (
      <div className="property-card property-card--error">
        <div className="property-card__content">
          <p>Property data unavailable</p>
        </div>
      </div>
    );
  }

  const getLocationString = (location) => {
    try {
      if (typeof location === 'string' && location.trim()) return location;
      if (location && typeof location === 'object') {
        if (location.address) return location.address;
        if (location.street) return location.street;
        if (location.city && location.state) return `${location.city}, ${location.state}`;
        if (location.city) return location.city;
      }
      return 'Location not specified';
    } catch (error) {
      console.warn('Error parsing location:', error);
      return 'Location not specified';
    }
  };

  const formatCurrency = (amount) => {
    const num = parseInt(amount, 10) || 0;
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
    return `₹${num.toLocaleString()}`;
  };

  const formatNumber = (value) => {
    const num = parseInt(value, 10) || 0;
    return num === 0 ? 'N/A' : String(num);
  };

  const getSafeImages = (images) => {
    if (!Array.isArray(images)) return [];
    return images.filter(
      (img) =>
        img &&
        typeof img === 'string' &&
        img.trim() &&
        !img.toLowerCase().includes('car') &&
        !img.toLowerCase().includes('vehicle') &&
        !img.toLowerCase().includes('auto')
    );
  };

  // Enhanced property ID validation
  const getPropertyId = () => {
    if (!property.id && !property._id) {
      console.error('PropertyCard: Property missing ID', property);
      return null;
    }

    // Handle both id and _id (common in MongoDB)
    let id = property.id || property._id;

    // If ID is an object (like MongoDB ObjectId), convert to string
    if (typeof id === 'object' && id !== null) {
      if (id.toString && typeof id.toString === 'function') {
        id = id.toString();
      } else if (id.$oid) {
        id = id.$oid; // Handle MongoDB extended JSON format
      } else {
        console.error('PropertyCard: Invalid property ID format', id);
        return null;
      }
    }

    return String(id);
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation();

    const propertyId = getPropertyId();
    if (!propertyId) {
      console.error('PropertyCard: Cannot view details - invalid property ID');
      alert('Error: Property ID is invalid');
      return;
    }

    console.log('PropertyCard: Viewing details for property ID:', propertyId);

    if (!isAuthenticated) {
      try {
        localStorage.setItem('redirectAfterLogin', `/property/${propertyId}`);
      } catch (error) {
        console.warn('Could not save redirect URL to localStorage:', error);
      }
      if (onLoginRequired) {
        onLoginRequired();
      } else {
        alert('Please login to view details');
      }
      return;
    }

    if (onViewDetails) {
      try {
        onViewDetails(propertyId);
      } catch (error) {
        console.error('Error in onViewDetails callback:', error);
        alert('Error loading property details');
      }
    } else {
      try {
        window.location.href = `/property/${propertyId}`;
      } catch (error) {
        console.error('Error navigating to property:', error);
        alert('Error navigating to property details');
      }
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    const propertyId = getPropertyId();
    if (!propertyId) {
      console.error('PropertyCard: Cannot toggle wishlist - invalid property ID');
      return;
    }

    if (!isAuthenticated) {
      if (onLoginRequired) {
        onLoginRequired();
      } else {
        alert('Please login to add to wishlist');
      }
      return;
    }

    try {
      const currentState = isIn(propertyId);
      const nextState = !currentState;

      // Toggle in context
      toggle(propertyId);

      // Notify parent component
      if (onWishlistToggle) {
        onWishlistToggle(nextState);
      }

      console.log(`Property ${propertyId} ${nextState ? 'added to' : 'removed from'} wishlist`);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Error updating wishlist');
    }
  };

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none';
    const placeholder = e.currentTarget.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  };

  // Get property data with validation
  const propertyId = getPropertyId();
  const safeImages = getSafeImages(property?.images);
  const wishlisted = propertyId ? isIn(propertyId) : false;
  const bedrooms = formatNumber(property?.bedrooms);
  const bathrooms = formatNumber(property?.bathrooms);
  const area = formatNumber(property?.area);

  return (
    <div className="property-card" onClick={handleViewDetailsClick}>
      <div className="property-card__media-container">
        <div className="property-card__badge">{property?.propertyType || 'Property'}</div>

        <WishlistButton
          onClick={handleWishlistClick}
          size="small"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={
            !isAuthenticated
              ? "Login to add to wishlist"
              : wishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
          }
          isWishlisted={wishlisted && isAuthenticated}
          disabled={!propertyId} // Disable if no valid ID
        >
          {wishlisted && isAuthenticated ? (
            <Favorite sx={{ color: '#d32f2f' }} />
          ) : (
            <FavoriteOutlined />
          )}
        </WishlistButton>

        {/* {safeImages.length > 0 ? (
          <>
            <img
              className="property-card__image"
              src={safeImages[0]}
              alt={property?.title || 'Property'}
              onError={handleImageError}
            />
            <div className="property-card__image-placeholder" style={{ display: 'none' }}>
              <span>No Image Available</span>
            </div>
          </>
        ) : (
          <div className="property-card__image-placeholder">
            <span>No Image Available</span>
          </div>
        )}   */}

        {safeImages.length > 0 ? (
  <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
    <img
      className="property-card__image"
      src={safeImages[0]}
      alt={property?.title || 'Property'}
      onError={(e) => {
        e.currentTarget.onerror = null; // prevent infinite loop
        e.currentTarget.src = fallbackImg; // show fallback when error
      }}
    />
    {/* ✅ Watermark Overlay */}
    <img
      src={watermark}
      alt="Watermark"
      className="property-overlay"
    />
  </div>
) : (
  <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
    <img
      className="property-card__image"
      src={fallbackImg}
      alt="Fallback"
    />
    {/* ✅ Watermark Overlay */}
    <img
      src={watermark}
      alt="Watermark"
      className="property-overlay"
    />
  </div>
)}

      </div>

      <div className="property-card__content">
        <div className="property-card__pricing">
          <span className="property-card__price">{formatCurrency(property?.rent)}</span>
        </div>

        <h3 className="property-card__title">{property?.title || 'Untitled Property'}</h3>

        <div className="property-card__location">
          <span>{getLocationString(property?.location)}</span>
        </div>

        <div className="property-card__specs">
          <div className="property-card__spec">
            <img src={bed} alt="bedrooms" />
            <span>{bedrooms}</span>
          </div>
          <div className="property-card__spec">
            <img src={bath} alt="bathroom" />
            <span>{bathrooms}</span>
          </div>
          <div className="property-card__spec">
            <img src={areaImg} alt="area" />
            <span>{area}</span>
          </div>
        </div>

        {Array.isArray(property?.amenities) && property.amenities.length > 0 && (
          <div className="property-card__amenities">
            <strong>Amenities:</strong> {property.amenities.slice(0, 3).join(', ')}
            {property.amenities.length > 3 && ` +${property.amenities.length - 3} more`}
          </div>
        )}

        <div className="property-card__actions">
          <button
            className={`property-card__action-btn ${isAuthenticated ? 'authenticated' : 'unauthenticated'} rounded-2`}
            onClick={handleViewDetailsClick}
            type="button"
            disabled={!propertyId} // Disable if no valid ID
          >
            {!propertyId
              ? 'Property Unavailable'
              : isAuthenticated
                ? 'View Details'
                : 'Login to View Details'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;