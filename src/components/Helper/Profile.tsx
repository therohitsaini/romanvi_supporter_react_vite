import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    ListItemIcon
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ adminData }: { adminData: any }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem("__Access_Token_v2");
        localStorage.removeItem("_user_Identy_v3");
        navigate("/login");
    }
    const handleProfile = () => {
        navigate("/dashboard/profile");
        handleClose();
    }

    return (
        <>
            {/* AVATAR BUTTON */}
            <IconButton onClick={handleClick}>
                <Avatar
                    sx={{ width: 36, height: 36 }}
                    src="https://i.pravatar.cc/150"
                />
            </IconButton>

            {/* MENU */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1.5,
                        minWidth: 220,
                        bgcolor: "#111827",
                        color: "#fff",
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >

                {/* USER INFO */}
                <Box px={2} py={1.5}>
                    <Typography fontWeight={600}>{adminData?.data?.name}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        {adminData?.data?.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: "#374151" }} />

                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <PersonIcon sx={{ color: "#9CA3AF" }} />
                    </ListItemIcon>
                    Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsIcon sx={{ color: "#9CA3AF" }} />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <Divider sx={{ borderColor: "#374151" }} />

                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        color: "#EF4444",
                        "&:hover": {
                            bgcolor: "rgba(239,68,68,0.1)"
                        }
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: "#EF4444" }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}