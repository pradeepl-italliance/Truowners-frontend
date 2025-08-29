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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";




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
  maxBudget: "",
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
    flexWrap: "wrap", // allow wrapping if needed
    [theme.breakpoints.down(568)]: {
      flexDirection: "column", // stack vertically
      alignItems: "center",   // make them full width
    },
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
  [theme.breakpoints.down(568)]: {
    minWidth: "100%", // full width tabs when stacked
    borderRadius: "8px", // adjust radius if needed
  },
   "@media (max-width:568px)": {
    minWidth: "250px",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    width: "100%",
    height: "56px",
    "& fieldset": {
      border: "1px light grey",
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

const FilterSection = styled(Grid)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: '10ox'
}))

// ======== Component ========
export default function PropertyFilter({ initialFilters = {}, currentFilters = {}, onSearch }) {
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
    console.log(name, value);

    setFilters((prev) => ({ ...prev, [name]: value }));

    console.log(filters);

  };

  const handleTabChange = (event, newValue) => {
    setStatusTab(newValue);
  };

  const handleSearchClick = () => {
    const params = new URLSearchParams();

    if (statusTab === 1) params.append("status", "rent");
    if (statusTab === 2) params.append("status", "sale");
    if (filters.propertyType) params.append("propertyType", filters.propertyType);
    if (filters.city) params.append("city", filters.city);
    if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);
    if (filters.search) params.append("search", filters.search);
    if (filters.search) params.append("maxBudget", filters.search);

    lastSearchRef.current = filters.search;

    console.log(filters.propertyType);

    onSearch(params.toString(), filters);
  };

  return (
    <div>
      <StyledTabs sx={{ mb: 0 }} value={statusTab} onChange={handleTabChange} centered>
        <StyledTab label="ALL STATUS" />
        <StyledTab label="FOR RENT" />
        <StyledTab label="FOR SALE" />
      </StyledTabs>
      {/* First Row - Basic Filters */}
      <Grid container full width spacing={3} sx={{ mt: 0, p: 4, justifyContent: "center", alignItems: "end" }} backgroundColor={"white"} borderRadius={"10px"} boxShadow={'0 4px 20px rgba(0,0,0,0.1)'}>
        <Grid width={"100%"} maxWidth={"280px"} item xs={12} sm={6} md={3}>
          <SectionLabel>
            <HomeIcon sx={{ fontSize: 16 }} />
            LOOKING FOR
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
        <Grid width={"100%"} maxWidth={"280px"} item xs={12} sm={6} md={3}>
          <SectionLabel>
            <BedIcon sx={{ fontSize: 16 }} />
            PROPERTY SIZE
          </SectionLabel>
          <StyledTextField
            select
            fullWidth
            value={filters.bedrooms}
            onChange={(e) => handleChange("bedrooms", e.target.value)}
            SelectProps={{
              displayEmpty: true,
              renderValue: (value) => (value ? (`${value} BHK`) : <span style={{ color: "#9e9e9e" }}>BEDROOMS</span>),
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
          <SectionLabel>
            <BedIcon sx={{ fontSize: 16 }} />
            YOUR BUDGET
          </SectionLabel>
          <StyledTextField
            fullWidth
            value={filters.maxBudget}
            onChange={(e) => handleChange("maxBudget", e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            placeholder={"MAX PRICE"}
          >
            {bedroomOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledTextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSearchClick}
            sx={{ px: 5 }}
          >
            Search
          </StyledButton>
        </Grid>
      </Grid>
    </div>
  );
}