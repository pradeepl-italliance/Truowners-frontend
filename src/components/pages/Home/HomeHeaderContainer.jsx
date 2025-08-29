import React, { useEffect, useState } from "react";
import "./home.css";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import headerImage from "../../../assets/images/home/homeHeaderImage.gif";
import AppLaunchImg from "../../../assets/images/home/App-Launch-Soon .gif"
import AppLaunchMobImg from "../../../assets/images/home/App-Launch-Soon-Mob-View.gif"
import HassleFreeMobImg from "../../../assets/images/home/Hassel-free-mob.gif"
import search from "../../../assets/images/home/search.svg";
import useScreenSize from "../../helper/userScreenSize.jsx";
import PropertyTypeSelect from "../search-screen/propertyTypeSelect.jsx";
import { BudgetFilter } from "../search-screen/budgetFilter.jsx";
import { useRef } from "react";
import SearchBar from "../search-screen/searchBar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import PropertyFilters from "./PropertyFilters.jsx";
import PropertyFilter from "./PropertyFilter.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { API_CONFIG, buildApiUrl } from "../../../config/api.js";
import { validateApiResponse } from "../../../utils/errorHandler.js";
import PropertyCard from "./PropertyCard.jsx";
import { Button } from "@mui/material";
import AuthPromptModal from "./AuthPromptModal.jsx";
import Login from "../Auth/Login.jsx";
import Register from '../Auth/SignUp'
import PropertyDetailsModal from "./PropertyDetailsModal.jsx";
const HomeHeaderContainer = ({
    activeBtn = "all",
    activeTab,
    setActiveTab,
}) => {
    const width = useScreenSize();
    const navigate = useNavigate();
    //   const dispatch = useDispatch();
    const [searchedItems, setSearchedItems] = useState("");
    //   const locationData = useSelector((state) => state.locationDataReducer);
    let locationData = "Bangalore";

    const [sortBy, setSortBy] = useState('newest')
    const [searchTerm, setSearchTerm] = useState('')
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const { user, isAuthenticated, token } = useAuth()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [wishlist, setWishlist] = useState([])
    const [slide, setSlide] = useState(0);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showPropertyDetails, setShowPropertyDetails] = useState(false)

    const [filters, setFilters] = useState({
        propertyType: "",
        city: "",
        bedrooms: "",
        searchTerm: "",
        maxBudget: "",
    });





    useEffect(() => {

        console.log(filters);

        fetchProperties()
        if (isAuthenticated) {
            fetchWishlist()
        }
    }, [isAuthenticated, filters])

    useEffect(() => {
        if (isAuthenticated) {
            const propertyToView = localStorage.getItem('propertyToView')
            if (propertyToView) {
                localStorage.removeItem('propertyToView')
                window.open(`/property/${propertyToView}`, '_blank')
            }
        }
    }, [isAuthenticated, properties])

    useEffect(() => {
        applyFilters()
    }, [properties, searchTerm, sortBy])

    const fetchProperties = async () => {

        console.log(filters);

        setLoading(true);
        setError("");

        try {
            const headers = {
                "Content-Type": "application/json"
            };

            if (isAuthenticated && token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const params = new URLSearchParams();

            if (filters.propertyType) params.append("propertyType", filters.propertyType);
            if (filters.city) params.append("city", filters.city);
            if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
            if (filters.searchTerm) params.append("search", filters.searchTerm);
            if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);


            const response = await fetch(
                `${buildApiUrl(API_CONFIG.USER.PROPERTIES)}?${params.toString()}`,
                {
                    method: "GET",
                    headers,
                }
            );

            let data;

            try {
                data = await response.json();
                validateApiResponse(data);
            } catch (parseError) {
                throw new Error("Invalid response from server");
            }

            if (!response.ok) {
                throw new Error(data.error || handleApiError(null, response));
            }

            if (data.success) {
                setProperties(data.data.properties || []);
            } else {
                throw new Error(getErrorMessage(data));
            }
        } catch (err) {
            console.error("Fetch properties error:", err);
            setError(err.message || "Failed to load properties. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const fetchWishlist = async () => {
        if (!isAuthenticated || !token) return

        try {
            const response = await fetch(buildApiUrl(API_CONFIG.USER.WISHLIST), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    const ids = (data.data.wishlist || []).map(item => item.id)
                    setWishlist(ids)
                }
            }
        } catch (err) {
            console.warn('Failed to fetch wishlist:', err)
        }
    }

    const handleWishlistToggle = async (propertyId) => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true)
            return
        }

        try {
            const isInWishlist = wishlist.includes(propertyId)
            const method = isInWishlist ? 'DELETE' : 'POST'

            const response = await fetch(buildApiUrl(`${API_CONFIG.USER.WISHLIST}/${propertyId}`), {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    if (isInWishlist) {
                        setWishlist(prev => prev.filter(id => id !== propertyId))
                    } else {
                        setWishlist(prev => [...prev, propertyId])
                    }
                }
            }
        } catch (err) {
            console.error('Wishlist toggle error:', err)
        }
    }

    const handlePropertyClick = (property) => {
        setSelectedProperty(property)
        setShowPropertyDetails(true)
    }

    const handleLoginRequired = () => {
        setShowLogin(true)
    }

    const handleAuthSuccess = () => {
        setShowLogin(false)
        setShowRegister(false)
        setShowAuthPrompt(false)
    }

    const handleSwitchToRegister = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    const handleSwitchToLogin = () => {
        setShowRegister(false)
        setShowLogin(true)
    }

    const applyFilters = () => {
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const filtered = properties.filter(property => {
                const titleMatch = property.title?.toLowerCase().includes(searchLower);
                const descMatch = property.description?.toLowerCase().includes(searchLower);
                const locationMatch = getLocationString(property.location).toLowerCase().includes(searchLower);
                return titleMatch || descMatch || locationMatch;
            });
            setFilteredProperties(filtered);
        } else {
            setFilteredProperties(properties);
        }
    };

    const getLocationString = (location) => {
        if (typeof location === 'string') return location
        if (location && typeof location === 'object') {
            if (location.address) return location.address
            if (location.street) return location.street
            if (location.city && location.state) return `${location.city}, ${location.state}`
            return 'Location not specified'
        }
        return 'Location not specified'
    }

    const handleCloseModals = () => {
        setShowAuthPrompt(false)
        setShowLogin(false)
        setShowRegister(false)
        setShowPropertyDetails(false)
        setSelectedProperty(null)
    }

    if (loading) {
        return (
            <div className="homepage">
                <div className="container">
                    <div className="loading-state">
                        <div className="loading-spinner large"></div>
                        <p>Loading properties...</p>
                    </div>
                </div>
            </div>
        )
    }







    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

        fullscreenOnMobile: true,
        dotsClass: `slide_list_container d-flex justify-content-center pe-5`,
        beforeChange: (prev, next) => {
            setSlide(next);
        },
        // appendDots: (dots) => {
        //   return (
        //     <div className="dots_container">
        //       <ul>
        //         {dots?.map((item, index) => {
        //           return (
        //             <li className={`slide_list`} key={index}>
        //               {item.props.children}
        //             </li>
        //           );
        //         })}
        //       </ul>
        //     </div>
        //   );
        // },
        customPaging: function (i) {
            return (
                <a
                    className={`${slide === i ? `slide_active` : `slide_inactive`
                        } d-inline-block position-absolute`}
                ></a>
            );
        },
    };
    const homeImages = [
        { image: width < 576 ? HassleFreeMobImg : headerImage, imgWidth: "", imgHeight: "" },
        { image: width < 576 ? AppLaunchMobImg : AppLaunchImg, imgWidth: "", imgHeight: "" },
        // { image: width < 576 ? PostPropertyMobImg : PostPropertyImg, imgWidth: "", imgHeight: "" },
    ];
    const mobHomeImages = [
        { image: HassleFreeMobImg, imgWidth: "", imgHeight: "" },
        { image: AppLaunchMobImg, imgWidth: "", imgHeight: "" },
        // { image: PostPropertyMobImg, imgWidth: "", imgHeight: "" },
    ];
    return (
        <div>
            <Slider {...settings}>
                {homeImages?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div
                                className="position-relative row g-0 justify-content-center cursor_pointer"
                                style={{
                                    width: "100%",
                                }}
                            >
                                <img
                                    className={`home_header_image`}
                                    src={item.image}
                                    alt="property_img"
                                />
                            </div>
                        </div>
                    );
                })}
            </Slider>

            <div
                className={`home_filter_main_container card border-0 p-1 mt-3 mt-lg-0 bg-transparent`}
            >
                <div className={width < 576 ? "pb-2" : "card-body"}>





                    <div className="search-filter-container">
                        <PropertyFilter
                            initialFilters={{
                                propertyType: "",
                                city: "",
                                bedrooms: "",
                                search: "",
                                maxBudget: "",
                            }}
                            currentFilters={filters}
                            onSearch={(queryString, updatedFilters) => {
                                setFilters({
                                    ...filters,
                                    propertyType: updatedFilters.propertyType,
                                    city: updatedFilters.city,
                                    bedrooms: updatedFilters.bedrooms,
                                    searchTerm: updatedFilters.search,
                                    rentRange: updatedFilters.rentRange,
                                    maxBudget: updatedFilters.maxBudget,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="properties-section sec-top">
                <div className="properties-header">
                    <h2>Featured Properties</h2>
                    <p>Browse through our verified listings</p>
                </div>

                {filteredProperties.length === 0 ? (
                    <div className="empty-properties">
                        <div className="empty-icon">🏠</div>
                        <h3>No properties match your criteria</h3>
                        <p>Try adjusting your filters or search terms to see more results.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setFilters({
                                    propertyType: "",
                                    city: "",
                                    bedrooms: "",
                                    searchTerm: "",
                                    rentRange: [0, 50000],
                                    depositRange: [0, 100000],
                                })
                                setSearchTerm('')
                            }}
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="properties-grid">
                        {filteredProperties.slice(0, 6).map(property => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                isInWishlist={wishlist.includes(property.id)}
                                onWishlistToggle={() => handleWishlistToggle(property.id)}
                                onClick={() => handlePropertyClick(property)}
                                onLoginRequired={handleLoginRequired}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                )}
                <div className="home-showMore d-flex justify-content-center mb-4">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/properties?${new URLSearchParams(filters).toString()}`)}
                        sx={{
                            mt: 3,
                            fontWeight: 600,
                            borderRadius: "8px",
                            maxWidth: "10rem",
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        SHOW MORE
                    </Button>
                </div>
            </div>

            {/* Modals */}
            {showAuthPrompt && (
                <AuthPromptModal onClose={handleCloseModals} />
            )}

            {showLogin && (
                <Login
                    onClose={handleCloseModals}
                    onSwitchToSignUp={handleSwitchToRegister}
                />
            )}

            {showRegister && (
                <Register
                    onClose={handleCloseModals}
                    onSwitchToLogin={handleSwitchToLogin}
                />
            )}

            {showPropertyDetails && selectedProperty && (
                <PropertyDetailsModal
                    property={selectedProperty}
                    onClose={handleCloseModals}
                    isInWishlist={wishlist.includes(selectedProperty.id)}
                    onWishlistToggle={() => handleWishlistToggle(selectedProperty.id)}
                    isAuthenticated={isAuthenticated}
                    onAuthPrompt={() => setShowAuthPrompt(true)}
                />
            )}


        </div>
    );
};
export default HomeHeaderContainer;
export const customStyles = {
    menuList: (base) => ({
        ...base,
        "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#50BF97",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#50BF97",
        },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    control: (base, state) => ({
        ...base,
        fontSize: "16px",
        color: "#1D72DB",
        // match with the menu
        borderRadius: "5px",
        width: "700px",
        maxWidth: "15.8rem",

        borderColor: state.isFocused
            ? state.selectProps.error
                ? "red"
                : "#FFFFFF"
            : state.selectProps.error
                ? "red"
                : "#FFFFFF",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            // Overwrittes the different states of border
            // borderColor: state.isFocused ? "#1D72DB" : "#F4F8FB",
        },
    }),
    placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: "#BCC7CE",
        fontSize: "16px",
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#1D72DB", // Custom colour
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#1D72DB" : null,
        color: state.isSelected ? "#fff" : "#000",
        borderRadius: state.isSelected ? "5px" : null,
        marginLeft: "4%",
        marginRight: "4%",
        width: "92%",
        // fontFamily: "Nunito",
        "&:hover": {
            backgroundColor: state.isFocused ? "#EDF4F9" : "#EDF4F9",
            color: state.isFocused ? "#000" : "#000",
            borderRadius: state.isFocused ? "3px" : null,
        },
    }),
};

const locationTypeStyles = {
    menuList: (base) => ({
        ...base,

        "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#50BF97",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#50BF97",
        },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    control: (base, state) => ({
        ...base,
        fontSize: "16px",
        color: "#1D72DB",
        // match with the menu
        borderRadius: "5px",
        width: "700px",
        maxWidth: "15rem",

        borderColor: state.isFocused
            ? state.selectProps.error
                ? "red"
                : "#FFFFFF"
            : state.selectProps.error
                ? "red"
                : "#FFFFFF",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            // Overwrittes the different states of border
            // borderColor: state.isFocused ? "#1D72DB" : "#F4F8FB",
        },
    }),

    option: (provided, state) => ({
        ...provided,
        //   width: "20rem",
        fontSize: "14px",
        color: "#000000",
        fontWeight: 400,
        backgroundColor: "",
        paddingLeft: "25px",
        // backgroundColor: state.isSelected ? "#ACBBC5" : null,
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#BCC7CE",
            fontSize: "16px",
            fontWeight: "500",
            opacity: "0.9",
        };
    },
    dropdownIndicator: (base) => ({
        ...base,
        display: "none", // Custom colour
    }),

    multiValue: (provided) => ({
        ...provided,
        //   color: "#08699B",
        marginLeft: "25px",
        backgroundColor: "#EDF4F9",
        borderRadius: "5px",
    }),
};

export const customBudgetStyles = {
    menuList: (base) => ({
        ...base,

        "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#50BF97",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#50BF97",
        },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    control: (base, state) => ({
        ...base,
        fontSize: "16px",
        color: "#1D72DB",
        // match with the menu
        borderRadius: "5px",
        width: "400px",
        maxWidth: "10rem",

        borderColor: state.isFocused
            ? state.selectProps.error
                ? "red"
                : "#FFFFFF"
            : state.selectProps.error
                ? "red"
                : "#FFFFFF",
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
            // Overwrittes the different states of border
            // borderColor: state.isFocused ? "#1D72DB" : "#F4F8FB",
        },
    }),
    placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: "#BCC7CE",
        fontSize: "16px",
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#1D72DB", // Custom colour
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#1D72DB" : null,
        color: state.isSelected ? "#fff" : "#000",
        borderRadius: state.isSelected ? "5px" : null,
        marginLeft: "4%",
        marginRight: "4%",
        width: "92%",
        // fontFamily: "Nunito",
        "&:hover": {
            backgroundColor: state.isFocused ? "#EDF4F9" : "#EDF4F9",
            color: state.isFocused ? "#000" : "#000",
            borderRadius: state.isFocused ? "3px" : null,
        },
    }),
};
