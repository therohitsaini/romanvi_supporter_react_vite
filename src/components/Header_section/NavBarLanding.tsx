import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import logo from "../../assets/75f6e2ad-e01b-4b35-9b62-ad4b52465047.png";

import { useScrollTrigger } from "@mui/material";
import { Link } from "react-router-dom";

function NavBarLanding() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10, // kitna scroll pe color aaye
    })

   

    return (
        <AppBar
            position="sticky"
            elevation={trigger ? 4 : 0}
            sx={{
                backgroundColor: trigger ? "#ffffff" : "transparent",
                transition: "all 0.3s ease",
                color: "#161515fc",
                opacity
                    : trigger ? 1 : 1,
                zIndex: (theme) => theme.zIndex.appBar + 1,
            }}
        >
            <Toolbar className=" mx-auto w-full flex justify-between">
                <div className="flex items-center gap-2">
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', objectPosition: 'cover', height: 70, width: 100 }}
                        component="img"
                        alt="Logo"
                        src={logo}
                    />
                </div>


                <div className={`
                    hidden md:flex items-center gap-10
                    px-10 py-3
                    rounded-md
                ${trigger ? "bg-transparent" : "bg-white/20"}
                ${trigger ? "backdrop-none" : "backdrop-blur-md"}
                border border-white/20
                ${trigger ? "shadow-none" : "shadow-lg shadow-black/5"}
                `}>
                    <a
                        href="#features"
                        className={`font-medium transition ${trigger ? "text-black hover:text-black" : "text-white hover:text-white"
                            }`}

                    >
                        Features
                    </a>

                    <a
                        href="#pricing"
                        className={`font-medium transition ${trigger ? "text-black hover:text-black" : "text-white hover:text-white"
                            }`}
                    >
                        Pricing
                    </a>

                    <a
                        href="#docs"
                        className={`font-medium transition ${trigger ? "text-black hover:text-black" : "text-white hover:text-white"
                            }`}
                    >
                        Docs
                    </a>

                    <a
                        href="#contact"
                        className={`font-medium transition ${trigger ? "text-black hover:text-black" : "text-white hover:text-white"
                            }`}
                    >
                        Contact
                    </a>
                </div>



                <div className="hidden md:flex items-center gap-3">

                    <Button
                        variant="contained"
                        component={Link}
                        to="/login"
                        sx={{
                            textTransform: "none",
                            px: 3,
                            transition: "background-color 0.4s ease",
                            backgroundColor: trigger ? "#040404" : "#f3f2f7",
                            color: trigger ? "#FFFFFF" : "#111827",
                        }}

                    >
                        Get Started
                    </Button>
                </div>

                <div className="md:hidden">
                    <IconButton onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Features</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Pricing</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Docs</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Button
                                component={Link}
                                to="/login"
                                fullWidth
                                variant="contained"
                                className="!bg-indigo-600"
                            >
                                Get Started
                            </Button>
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar >
    );
}
export default NavBarLanding;
