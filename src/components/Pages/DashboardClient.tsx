import { Suspense, useEffect, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Chat as ChatIcon,
    BarChart as BarChartIcon,
    Settings as SettingsIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { fetchAdminData } from "../../reduxToolKit/slice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Helper/Loader";

const drawerWidth = 240;
const collapsedWidth = 80;

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    console.log(admin, "admin data in dashboard");
    useEffect(() => {        // Close the mobile drawer when navigating to a new route
        const id = localStorage.getItem("_user_Identy_v3")
        setUserId(id);
    }, []);

    const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentDrawerWidth = isCollapsed
        ? collapsedWidth
        : drawerWidth;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchAdminData(userId));
        }
    }, [userId]);

    const menuItems = [
        { text: "Overview", path: "/dashboard", icon: <DashboardIcon sx={{ fontSize: 16 }} />, label: "overview" },
        { text: "Conversations", path: "/dashboard/chats", icon: <BarChartIcon sx={{ fontSize: 16 }} /> },
        { text: "Upload FQA", path: "/dashboard/upload-fqa", icon: <HelpOutlineIcon sx={{ fontSize: 16 }} /> },
        { text: "Widget Settings", path: "/dashboard/widget", icon: <ChatIcon sx={{ fontSize: 16 }} /> },
        { text: "Settings", path: "/dashboard/settings", icon: <SettingsIcon sx={{ fontSize: 16 }} /> },
    ];



    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#0c0c0c",
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    ml: { sm: `${currentDrawerWidth}px` },
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                    {/* LEFT SIDE */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap>
                            Dashboard
                        </Typography>
                    </Box>

                    {/* RIGHT SIDE PROFILE */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                        <IconButton onClick={handleProfileClick}>
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                src="https://i.pravatar.cc/150"
                            />
                        </IconButton>
                        <Divider  />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { sm: currentDrawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            backgroundColor: "#111827",
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#6342421f",
                            height: "100%",
                            color: "#fff",
                        }}
                    >
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: isCollapsed ? "center" : "space-between",
                                px: 2,
                            }}
                        >
                            {!isCollapsed && (
                                <Typography variant="h6" fontWeight="bold">
                                    Rmanvi.com
                                </Typography>
                            )}

                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                sx={{ color: "#fff" }}
                            >
                                {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Toolbar>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                        <List sx={{ px: 1 }}>
                            {
                                menuItems.map((item) => {
                                    const isActive =
                                        location.pathname === item.path ||
                                        location.pathname.startsWith(item.path + "/");

                                    return (
                                        <ListItem key={item.text} disablePadding>
                                            <Tooltip
                                                title={isCollapsed ? item.text : ""}
                                                placement="right"
                                                arrow
                                            >
                                                <ListItemButton
                                                    component={NavLink}
                                                    to={item.path}
                                                    end={item.path === "/dashboard"}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? " rgb(185 192 192 / 31%)" : "transparent",
                                                        borderRadius: "8px",
                                                    })}
                                                    sx={{
                                                        justifyContent: isCollapsed ? "center" : "flex-start",
                                                        px: 2,
                                                        transition: "all 0.3s ease",
                                                        "&:hover": { backgroundColor: "#1f2937" },
                                                    }}
                                                >

                                                    <ListItemIcon
                                                        sx={{
                                                            color: "#fff",
                                                            minWidth: 0,
                                                            mr: isCollapsed ? 0 : 2,
                                                            justifyContent: "center",

                                                        }}
                                                    >
                                                        {item.icon}
                                                    </ListItemIcon>

                                                    {!isCollapsed && (
                                                        <ListItemText
                                                            primaryTypographyProps={{
                                                                fontSize: "14px",
                                                            }}
                                                            primary={item.text} />
                                                    )}
                                                </ListItemButton>
                                            </Tooltip>
                                        </ListItem>
                                    );
                                })}
                        </List>

                    </Box>
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            width: currentDrawerWidth,
                            transition: "width 0.3s ease",
                            boxSizing: "border-box",
                            backgroundColor: "#111827",
                            borderRight: "1px solid rgba(255,255,255,0.05)",
                            overflowX: "hidden",
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#6342421f",
                            height: "100%",
                            color: "#fff",
                        }}
                    >
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: isCollapsed ? "center" : "space-between",
                                px: 2,
                            }}
                        >
                            {!isCollapsed && (
                                <Typography variant="h6" fontWeight="bold">
                                    Rmanvi.com
                                </Typography>
                            )}

                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                sx={{ color: "#fff" }}
                            >
                                {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </Toolbar>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

                        <List sx={{ px: 1 }}>
                            {
                                menuItems.map((item) => {
                                    const isActive =
                                        location.pathname === item.path ||
                                        location.pathname.startsWith(item.path + "/");

                                    return (
                                        <ListItem key={item.text} disablePadding>
                                            <Tooltip
                                                title={isCollapsed ? item.text : ""}
                                                placement="right"
                                                arrow
                                            >
                                                <ListItemButton
                                                    component={NavLink}
                                                    to={item.path}
                                                    end={item.path === "/dashboard"}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? " rgb(185 192 192 / 31%)" : "transparent",
                                                        borderRadius: "8px",
                                                    })}
                                                    sx={{
                                                        justifyContent: isCollapsed ? "center" : "flex-start",
                                                        px: 2,
                                                        transition: "all 0.3s ease",
                                                        "&:hover": { backgroundColor: "#1f2937" },
                                                    }}
                                                >

                                                    <ListItemIcon
                                                        sx={{
                                                            color: "#fff",
                                                            minWidth: 0,
                                                            mr: isCollapsed ? 0 : 2,
                                                            justifyContent: "center",

                                                        }}
                                                    >
                                                        {item.icon}
                                                    </ListItemIcon>

                                                    {!isCollapsed && (
                                                        <ListItemText
                                                            primaryTypographyProps={{
                                                                fontSize: "14px",
                                                            }}
                                                            primary={item.text} />
                                                    )}
                                                </ListItemButton>
                                            </Tooltip>
                                        </ListItem>
                                    );
                                })}
                        </List>

                    </Box>
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    backgroundColor: "#f8fafc",
                    minHeight: "100vh",
                    transition: "all 0.3s ease",
                    padding: 0
                }}
            >
                <Toolbar />
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </Box>
        </Box>
    );
}
