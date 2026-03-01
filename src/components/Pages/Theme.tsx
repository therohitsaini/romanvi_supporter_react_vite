// theme.js
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3b82f6",
        },
        background: {
            default: "#0b1120",
            paper: "#111827",
        },
        divider: "rgba(255,255,255,0.08)",
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: "Inter, sans-serif",
    },
});
