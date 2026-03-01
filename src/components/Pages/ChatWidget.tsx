import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Fab
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatWidget = () => {
    const { widgetId } = useParams();
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi 👋 How can I help you today?" },
    ]);
    console.log("messages", messages)
    const [input, setInput] = useState("");

    const [settings, setSettings] = useState([]);
    const [open, setOpen] = useState(true);
    console.log("Widget ID:", settings, widgetId);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/widget/fetch/widget-settings/${widgetId}`)
            .then((res) => setSettings(res.data?.data))
            .catch((err) => console.log(err));
    }, [widgetId]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // prevent form submit or new line
            // handleSend();
        }
    };

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleSend = () => {
        try {
            if (!input.trim()) return;
            const newMessages = [...messages, { sender: "user", text: input }];
            setMessages(newMessages);
            setInput("");
            setLoader(true);
            const payload = {
                question: input,

            };
            const response = axios.post(`http://localhost:5000/api/faq/ask/${widgetId}`, payload)
            console.log("Response from server:", response)
            // if (response?.data && response?.data?.reply) {
            setLoader(false);
            setMessages([...newMessages, { sender: "bot", text: response.data?.reply.response }]);
            // }

        } catch (error) {
            console.error("Error sending message:", error);
            setLoader(false);
        }

    };


    return (
        <>
            {/* Floating Button */}
            <Fab
                onClick={() => setOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    bgcolor: "#334dc1",
                    color: "#38bdf8",
                    boxShadow: "0 0 20px #38bdf8",
                    "&:hover": { bgcolor: "#020617" },
                }}
            >
                <ChatIcon />
            </Fab>

            {/* Chat Window */}
            {open && (
                <Paper
                    elevation={10}
                    sx={{
                        position: "fixed",
                        bottom: 90,
                        right: 20,
                        width: 380,
                        height: 420,
                        bgcolor: "#020617",
                        color: "#e5e7eb",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",

                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #1e293b",
                            backgroundColor: settings.primaryColor,
                        }}
                    >
                        <Typography fontWeight={600}>
                            {settings.botName} {loader && <span>...</span>}
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
                                messages.map((msg, index) => (
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

                    {
                        loader && <Box sx={{
                            // border: "2px solid red",
                            fontStyle: "italic",
                            fontSize: 10,
                            color: "#94a3b8",
                            p: 0.5,
                        }}>
                            Typing......
                        </Box>
                    }
                    <Box
                        sx={{
                            p: 1,
                            display: "flex",
                            gap: 1,
                            borderTop: "1px solid #1e293b",
                        }}
                    >
                        <TextField
                            placeholder="Type a message..."
                            fullWidth
                            size="small"
                            value={input}
                            onChange={(e) => handleOnchange(e)}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                sx: {
                                    bgcolor: settings?.primaryColor,
                                    color: "#e5e7eb",
                                    // borderRadius: 2,
                                    fontSize: 12,
                                    height: "45px",
                                    // py: "0.5px",
                                },
                            }}
                        />
                        <IconButton
                            sx={{
                                bgcolor: settings?.sendButtonColor,
                                color: settings?.sendButtonTextColor,
                                "&:hover": { bgcolor: "#38bdf8" },
                                // height: "30px",
                            }}
                            onClick={handleSend}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;