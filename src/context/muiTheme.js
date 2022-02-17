import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1025,
      lg: 2000,
      xl: 2100,
    },
  },
  typography: {
    fontFamily: "Spartan",
  },
  palette: {
    background: {
      paper: "white",
      default: "#F8F8FB",
    },
    purple: {
      main: "#7C5DFA",
    },
    purpleBig: {
      main: "#7C5DFA",
    },
    purpleBigEdit: {
      main: "#7C5DFA",
    },
    red: {
      main: "rgb(236,87,87)",
    },
    gray: {
      main: "#DFE3FA",
    },
    grayForm: {
      main: "#DFE3FA",
    },
    charcoal: {
      main: "#1e2139",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPurple: {
          color: "white",
          borderRadius: "34px",
          fontSize: ".91rem",
          textTransform: "none",
          padding: "1rem 0.75rem",
          fontWeight: 700,
          minWidth: "100px",
          "&:hover": {
            backgroundColor: "#9277FF",
          },
        },
        containedGray: {
          color: "#888eb0",
          borderRadius: "34px",
          fontSize: ".75rem",
          textTransform: "none",
          padding: "1rem 0.5rem",
          fontWeight: 700,
          minWidth: "80px",
          "&:hover": {
            backgroundColor: "rgba(223,227,250, 0.6)",
          },
        },
        containedGrayForm: {
          color: "#888eb0",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: "34px",
          boxShadow: "none",
          padding: "1rem 1.5rem",
          "&:hover": {
            backgroundColor: "rgba(223,227,250, 0.6)",
          },
        },
        containedCharcoal: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          color: "#888EB0",
          borderRadius: "34px",
          boxShadow: "none",
          padding: "1rem 1.5rem",
          display: { xs: "none", sm: "inline" },
          "&:hover": {
            backgroundColor: "#373B53",
          },
        },
        containedPurpleBig: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          color: "white",
          borderRadius: "34px",
          boxShadow: "none",
          padding: "1rem 1.5rem",
          marginLeft: "12px",
          marginRight: { xs: "10px", sm: 0 },
          "&:hover": {
            backgroundColor: "#9277FF",
          },
        },
        containedRed: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: ".75rem",
          color: "#ffffff",
          borderRadius: "34px",
          boxShadow: "none",
          padding: "1rem 1.5rem",
          marginLeft: "10px",
          letterSpacing: "-.25px",
          "&:hover": {
            backgroundColor: "rgba(236,87,87, 0.8)",
          },
        },
        containedPurpleBigEdit: {
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          color: "white",
          bgcolor: "#7C5DFA",
          borderRadius: "34px",
          boxShadow: "none",
          padding: "1rem 1.5rem",
          marginLeft: "12px",
          "&:hover": {
            backgroundColor: "#9277FF",
          },
        },
      },
    },
  },
});

export default theme;
