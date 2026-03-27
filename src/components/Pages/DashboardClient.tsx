import { Suspense, useEffect, useState } from "react";
import {
    AppBar,
    Badge,
    Box,
    CircularProgress,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
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
import { Outlet, NavLink } from "react-router-dom";
import { fetchAdminData } from "../../reduxToolKit/slice/adminSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook/hook";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileMenu from "../Helper/Profile";
import type { RootState } from "../../reduxToolKit/store/Store";
const drawerWidth = 240;
const collapsedWidth = 80;

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [userId, setUserId] = useState<(null) | string>(null);
    const dispatch = useAppDispatch();
    const adminData = useSelector((state: RootState) => state.admin.admin);
    useEffect(() => {        // Close the mobile drawer when navigating to a new route
        const id = localStorage.getItem("_user_Identy_v3")
        setUserId(String(id));
    }, []);

    console.log(adminData, "Admin data in Dashboard");

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
        { text: "Install Widget", path: "/dashboard/install-widget", icon: <SettingsIcon sx={{ fontSize: 16 }} /> },
    ];


    return (
        <Box sx={{ display: "flex", backgroundColor: "black" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "rgba(51, 50, 50, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(15px)",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(84, 81, 81, 0.259)",
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    ml: { sm: `${currentDrawerWidth}px` },
                    transition: "all 0.3s ease",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>


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


                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton>
                            <Badge
                                badgeContent={100}
                                color="error"
                                max={99}
                            >
                                <NotificationsIcon sx={{ color: "#fff" }} />
                            </Badge>
                        </IconButton>
                        {/* profile menu  */}
                        <ProfileMenu adminData={adminData} />
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

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    backgroundColor: "none",
                    minHeight: "100%",
                    transition: "all 0.3s ease",
                    padding: 0

                }}
            >
                <Toolbar />
                <Suspense fallback={<CircularProgress enableTrackSlot size="3rem" />}>
                    <Outlet />
                </Suspense>

            </Box>
        </Box>
    );
}
