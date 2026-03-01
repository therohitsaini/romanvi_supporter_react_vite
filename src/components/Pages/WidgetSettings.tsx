import React, { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Paper,
    Button,
    FormControl,
    InputLabel,
    Select,
    Slider,
    IconButton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


const WidgetCustomizer = () => {

    const [settings, setSettings] = useState({
        primaryColor: "#0e0f0e",
        textAreaBgColor: "#020617",
        sendButtonColor: "#38bdf8",
        fontFamily: "Arial",
        borderRadius: 0,
        position: "right",
        welcomeMessage: "Hi! How can I help you?",
        botName: "AI Assistant"
    });

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };
    const handleSubmit = async () => {
        const clientId = localStorage.getItem("_user_Identy_v3");
        try {
            const token = "your_auth_token_here";
            const response = await axios.post(
                `http://localhost:5000/api/widget/widget-settings/${clientId}`,
                settings,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Saved:", response.data);
            alert("Settings Saved Successfully ✅");

        } catch (error) {
            console.error(error);
            alert("Error saving settings ❌");
        }
    }

    return (
        <Grid sx={{ display: "flex", gap: 10, padding: 5 }} spacing={4}>

            {/* LEFT SIDE SETTINGS */}
            <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom >
                    Widget Settings
                </Typography>

                <TextField
                    label="Welcome Message"
                    fullWidth
                    sx={{
                        "& .MuiInputBase-input": {
                            fontSize: "14px",
                        }
                    }}
                    size="small"
                    margin="normal"
                    value={settings.welcomeMessage}
                    onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                />

                <TextField
                    size="small"
                    label="Primary Color"
                    type="color"
                    fullWidth
                    margin="normal"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange("primaryColor", e.target.value)}
                />
                
                <TextField
                    size="small"
                    label="Text Area background color"
                    type="color"
                    fullWidth
                    margin="normal"
                    value={settings.textAreaBgColor}
                    onChange={(e) => handleChange("textAreaBgColor", e.target.value)}
                />
                
                <TextField
                    size="small"
                    label="Send Button Color"
                    type="color"
                    fullWidth
                    margin="normal"
                    value={settings.sendButtonColor}
                    onChange={(e) => handleChange("sendButtonColor", e.target.value)}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Font Family</InputLabel>
                    <Select
                        size="small"
                        value={settings.fontFamily}
                        label="Font Family"
                        onChange={(e) => handleChange("fontFamily", e.target.value)}
                    >
                        <MenuItem value="Arial">Arial</MenuItem>
                        <MenuItem value="Poppins">Poppins</MenuItem>
                        <MenuItem value="Roboto">Roboto</MenuItem>
                        <MenuItem value="Montserrat">Montserrat</MenuItem>
                    </Select>
                </FormControl>

                <Typography gutterBottom>Border Radius</Typography>
                <Slider
                    sx={{ color: "black" }}
                    value={settings.borderRadius}
                    min={0}
                    max={30}
                    onChange={(e, val) => handleChange("borderRadius", val)}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Position</InputLabel>
                    <Select
                        size="small"
                        value={settings.position}
                        label="Position"
                        onChange={(e) => handleChange("position", e.target.value)}
                    >
                        <MenuItem value="left">Left</MenuItem>
                        <MenuItem value="right">Right</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 2, textTransform: "none" }}
                    style={{ backgroundColor: settings.primaryColor }}
                >
                    Save Settings
                </Button>
            </Grid>

            <Grid xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                    Live Preview
                </Typography>

                <Box
                    sx={{
                        height: 520,
                        // border: "3px solid rgba(232, 0, 0, 0.1)",
                        // background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: settings.position === "left" ? "flex-start" : "flex-end",
                        p: 3,
                        // boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
                        width: "700px",

                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            right: 20,
                            width: "100%",
                            height: "100%",
                            bgcolor: "#d6d7da",
                            color: "#e5e7eb",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: settings.borderRadius,

                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: settings.primaryColor,
                                borderBottom: "1px solid #e0e3e8",
                                borderTopLeftRadius: settings.borderRadius,
                                borderTopRightRadius: settings.borderRadius,
                            }}
                        >
                            <Typography fontWeight={600}>
                                {settings.botName}
                            </Typography>
                            <IconButton onClick={() => setOpen(false)}>
                                <CloseIcon sx={{ color: "#94a3b8" }} />
                            </IconButton>
                        </Box>

                        {/* Messages */}
                        <Box
                            sx={{
                                flex: 1,
                                p: 2,
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    // overflowY: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                {
                                    [].map((msg, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                // overflow: "hidden",
                                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    maxWidth: "70%",
                                                    p: 1.2,
                                                    borderRadius: 2,
                                                    fontSize: 13,
                                                    bgcolor: msg.sender === "user" ? "#0f172a" : "#38bdf8",
                                                    color: msg.sender === "user" ? "#e5e7eb" : "#020617",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {msg.text}
                                            </Box>

                                        </Box>
                                    ))}
                            </Box>


                        </Box>


                        <Box
                            sx={{
                                p: 1,
                                display: "flex",
                                gap: 1,
                                borderTop: "1px solid #1e293b",
                                backgroundColor: settings.textAreaBgColor,
                            }}
                        >
                            <TextField
                                placeholder="Type a message..."
                                fullWidth
                                size="small"
                                // value={input}
                                // onChange={(e) => handleOnchange(e)}
                                // onKeyDown={handleKeyDown}
                                InputProps={{
                                    sx: {
                                        // bgcolor: "#020617",
                                        color: "#e5e7eb",
                                        border: "none",
                                        borderRadius: 2,
                                        fontSize: 12,
                                        height: "100%",
                                        py: "2px",
                                        // height: "35px",
                                    },
                                }}
                            />
                            <IconButton
                                sx={{
                                    bgcolor: settings.sendButtonColor,
                                    color: "#020617",
                                    "&:hover": { bgcolor: "#38bdf8" },
                                }}
                            // onClick={handleSend}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Box>
            </Grid>

        </Grid>
    );
};

export default WidgetCustomizer;
