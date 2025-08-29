import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
  InputAdornment,
  Slider,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";




// ======== Constants ========
const propertyTypes = [
  { label: "All Types", value: "" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
];

const bedroomOptions = [
  { label: "Any", value: "" },
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "5+ BHK", value: "5" },
];

const defaultFilters = {
  propertyType: "",
  city: "",
  bedrooms: "",
  budgetRange: [0, 100000],
  budgetMin: "",
  budgetMax: "",
  rentRange: [0, 50000],
  rentMin: "",
  rentMax: "",
  amenities: [""],
  title: "",
  search: "",
};

// ======== Styled Components ========
const StyledPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: "rgba(255, 255, 255, 0.98)",
  // borderRadius: "20px",
  // padding: theme.spacing(4),
  // boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  // border: "3px solid #FFD700",
  // maxWidth: "1200px",
  // margin: "0 auto",
  // position: "relative",
  // "&::before": {
  //   content: '""',
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: "4px",
  //   background: "linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
  // },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: "160px",
  fontWeight: "700",
  textTransform: "uppercase",
  fontSize: "14px",
  letterSpacing: "0.5px",
  borderRadius: "12px 12px 0 0",
  border: "2px solid transparent",
  color: theme.palette.text.secondary,
  backgroundColor: "#f8f9fa",
  transition: "all 0.3s ease",
  "&.Mui-selected": {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "800",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
  },
  "&:hover:not(.Mui-selected)": {
    backgroundColor: "#e3f2fd",
    transform: "translateY(-1px)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    height: "56px",
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      backgroundColor: "#f0f7ff",
      border: "2px solid #e3f2fd",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      border: "2px solid #1976d2",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
    },
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    marginBottom: "15px",
    height: "50px",
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      backgroundColor: "#f0f7ff",
      border: "2px solid #e3f2fd",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      border: "2px solid #1976d2",
      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "16px",
    padding: theme.spacing(1.5),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "white",
  fontWeight: "800",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  height: "50px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(25, 118, 210, 0.4)",
  },
}));

const SectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "12px",
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  padding: theme.spacing(2),
  border: "2px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f0f7ff",
    border: "2px solid #e3f2fd",
  },
}));

const PriceInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
    padding: theme.spacing(1),
  },
}));

// ======== Component ========
export default function FilterSidebar({ initialFilters = {}, currentFilters = {}, onSearch }) {

  const [statusTab, setStatusTab] = useState(0);
  const [showMoreFilters, setShowMoreFilters] = useState();
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    ...initialFilters,
  }));

  const lastSearchRef = useRef("");
  const isInitialMount = useRef(true);

  // Update local state when currentFilters change (only if different)
  useEffect(() => {
    if (!isInitialMount.current) {
      const hasChanges = Object.keys(currentFilters).some(key => {
        const currentValue = currentFilters[key];
        const localValue = filters[key];

        // Handle array comparison for ranges
        if (Array.isArray(currentValue) && Array.isArray(localValue)) {
          return currentValue[0] !== localValue[0] || currentValue[1] !== localValue[1];
        }

        return currentValue !== localValue;
      });

      if (hasChanges) {
        setFilters(prev => ({
          ...prev,
          ...currentFilters,
          // Update the min/max values for sliders
          budgetMin: currentFilters.budgetRange ? currentFilters.budgetRange[0].toString() : "",
          budgetMax: currentFilters.budgetRange ? currentFilters.budgetRange[1].toString() : "",
          rentMin: currentFilters.rentRange ? currentFilters.rentRange[0].toString() : "",
          rentMax: currentFilters.rentRange ? currentFilters.rentRange[1].toString() : "",
        }));
      }
    } else {
      isInitialMount.current = false;
    }
  }, [currentFilters]);

  // Debounced search for text field
  useEffect(() => {
    if (isInitialMount.current) return;

    const delay = setTimeout(() => {
      if (filters.search.trim() && filters.search !== lastSearchRef.current) {
        handleSearchClick();
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [filters.search]);

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event, newValue) => {
    setStatusTab(newValue);
  };

  const handleSliderChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      [`${name.replace("Range", "Min")}`]: value[0].toString(),
      [`${name.replace("Range", "Max")}`]: value[1].toString(),
    }));
  };

  const handleMinMaxChange = (type, field, value) => {
    const numValue = parseInt(value) || 0;
    setFilters((prev) => {
      const newRange = [...prev[`${type}Range`]];
      if (field === "min") {
        newRange[0] = numValue;
      } else {
        newRange[1] = numValue;
      }
      return {
        ...prev,
        [`${type}${field.charAt(0).toUpperCase() + field.slice(1)}`]: value,
        [`${type}Range`]: newRange,
      };
    });
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();

    if (statusTab === 1) params.append("status", "rent");
    if (filters.propertyType) params.append("propertyType", filters.propertyType);
    if (filters.city) params.append("city", filters.city);
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
    if (filters.search) params.append("search", filters.search);
    if (filters.amenities) params.append("amenities", filters.amenities);
    if (filters.title) params.append("title", filters.title);
    if (filters.budgetRange[0] > 0) params.append("minBudget", filters.budgetRange[0]);
    if (filters.budgetRange[1] < 100000) params.append("maxBudget", filters.budgetRange[1]);
    if (filters.rentRange[0] > 0) params.append("minRent", filters.rentRange[0]);
    if (filters.rentRange[1] < 50000) params.append("maxRent", filters.rentRange[1]);

    lastSearchRef.current = filters.search;

    onSearch(params.toString(), filters);
  };


  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setStatusTab(0);
    onSearch("", defaultFilters);
  };

  const handleChangeAmenities = (event) => {
    const { name, checked } = event.target;

    setFilters((prev) => {
      const currentAmenities = Array.isArray(prev.amenities)
        ? prev.amenities
        : [];

        console.log(currentAmenities, "filters");

      let updatedAmenities = checked
        ? [...currentAmenities, name]
        : currentAmenities.filter((item) => item !== name);

        console.log(updatedAmenities, "filters");
        

      return {
        ...prev,
        amenities: updatedAmenities,
      };
    });
  };

  console.log(filters, "filters");
  

  return (
    <div>
      {/* Search Row */}
      <Box sx={{ mb: 4 }}>

        <Grid item xs={12} md={9}>
          <SearchTextField
            fullWidth
            placeholder="Search properties by title, description, location..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999", fontSize: 24 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={2}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={handleSearchClick}
              startIcon={<SearchIcon />}
            >
              Search
            </StyledButton>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              className="px-4"
              variant="outlined"
              fullWidth
              onClick={handleClearFilters}
              sx={{
                height: "50px",
                fontWeight: "700",
                borderRadius: "12px",
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Tabs */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <StyledTabs value={statusTab} onChange={handleTabChange} centered>
          <StyledTab label="ALL STATUS" />
          <StyledTab label="FOR RENT" />
        </StyledTabs>
      </Box>

      {/* First Row - Basic Filters */}
      <Grid item xs={12} sm={6} md={3}>
        <SectionLabel>
          <HomeIcon sx={{ fontSize: 16 }} />
          PROPERTY TYPE
        </SectionLabel>
        <StyledTextField
          select
          fullWidth
          value={filters.propertyType}
          onChange={(e) => handleChange("propertyType", e.target.value)}
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => (value) || <span style={{ color: "#9e9e9e" }}>PROPERTY TYPE</span>,
          }}
        >
          {propertyTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SectionLabel>
          <LocationOnIcon sx={{ fontSize: 16 }} />
          LOCATION
        </SectionLabel>
        <StyledTextField
          fullWidth
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: "#999", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          placeholder="ALL CITIES"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SectionLabel>
          <BedIcon sx={{ fontSize: 16 }} />
          BEDROOMS
        </SectionLabel>
        <StyledTextField
          select
          fullWidth
          value={filters.bedrooms}
          onChange={(e) => handleChange("bedrooms", e.target.value)}
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => (value ? `${value} BHK` : <span style={{ color: "#9e9e9e" }}>BEDROOMS</span>),
          }}
        >
          {bedroomOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          color="primary"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          sx={{
            py: 1,
            fontWeight: 600,
            borderRadius: '8px'
          }}
        >
          More Filters
        </Button>
      </Grid>

      {/* Second Row - Budget and Rent Sliders */}
      {showMoreFilters === true ?
        <>
          {/* <Grid container spacing={4} justifyContent="center" display={"flex"}> */}
          <Grid item xs={12} md={5} maxWidth={"350px"}>
            <SectionLabel>
              <AttachMoneyIcon sx={{ fontSize: 16 }} />
              BUDGET RANGE
            </SectionLabel>
            <SliderContainer>
              <Box sx={{ mb: 2 }}>
                <Slider
                  value={filters.budgetRange}
                  onChange={(e, value) => handleSliderChange("budgetRange", value)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000}
                  step={1000}
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  sx={{
                    color: "#1976d2",
                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                    },
                  }}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <PriceInput
                    fullWidth
                    size="small"
                    label="Min Budget"
                    value={filters.budgetMin}
                    onChange={(e) => handleMinMaxChange("budget", "min", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <PriceInput
                    fullWidth
                    size="small"
                    label="Max Budget"
                    value={filters.budgetMax}
                    onChange={(e) => handleMinMaxChange("budget", "max", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </SliderContainer>
          </Grid>

          <Grid item xs={12} md={5} maxWidth={"350px"}>
            <SectionLabel>
              <AttachMoneyIcon sx={{ fontSize: 16 }} />
              RENT RANGE
            </SectionLabel>
            <SliderContainer>
              <Box sx={{ mb: 2 }}>
                <Slider
                  value={filters.rentRange}
                  onChange={(e, value) => handleSliderChange("rentRange", value)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50000}
                  step={500}
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  sx={{
                    color: "#1976d2",
                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                    },
                  }}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <PriceInput
                    fullWidth
                    size="small"
                    label="Min Rent"
                    value={filters.rentMin}
                    onChange={(e) => handleMinMaxChange("rent", "min", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <PriceInput
                    fullWidth
                    size="small"
                    label="Max Rent"
                    value={filters.rentMax}
                    onChange={(e) => handleMinMaxChange("rent", "max", e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

            </SliderContainer>
            <Grid>
              <SectionLabel>
                Amenities
              </SectionLabel>
              <FormGroup>
                {amenitiesList.map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        checked={filters.amenities.includes(amenity)}
                        onChange={handleChangeAmenities}
                        name={amenity}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </>
        : <></>}
    </div>
  );
}

const amenitiesList = [
  'WiFi', 'Parking', 'Gym', 'Swimming Pool', 'Security', 'Elevator',
  'Balcony', 'Garden', 'Furnished', 'Air Conditioning', 'Heating',
  'Laundry', 'Pet Friendly', 'Near Metro', 'Shopping Mall', 'Hospital'
];