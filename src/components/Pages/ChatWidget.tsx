import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    TextField,
    Fab,
    CircularProgress
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../config/api";

const ChatWidget = () => {
    const { widgetId, userInfo } = useParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();
    const userEmail = searchParams.get("user");
    const domain = searchParams.get("domain");
    const [loader, setLoader] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi 👋 How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    type WidgetSettings = {
        primaryColor?: string;
        botName?: string;
        sendButtonColor?: string;
        sendButtonTextColor?: string;
    };

    const [settings, setSettings] = useState<WidgetSettings>({});
    const [open, setOpen] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);
  


    useEffect(() => {
        const fetchWidgetSettings = async () => {
            try {
                const res = await api.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/widget/fetch/widget-settings/${widgetId}/${domain}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                setSettings(res.data?.data || {});
                setIsAllowed(true);
                console.log("widget settings", res.data?.data);
            } catch (error) {
                if (
                    typeof error === "object" &&
                    error !== null &&
                    "response" in error &&
                    typeof (error as any).response === "object" &&
                    (error as any).response.status === 403
                ) {
                    setIsAllowed(false);
                }
                console.error("Error fetching widget settings:", error);
            }
        };

        if (widgetId) {
            fetchWidgetSettings();
        }
    }, [widgetId, domain]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }

    const handleSend = async () => {
        try {
            if (!input.trim()) return;
            const newMessages = [...messages, { sender: "user", text: input }];
            setMessages(newMessages);
            setInput("");
            setLoader(true);
            const payload = {
                question: input,
                user: userEmail || userInfo || "Unknown User",
            };
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/faq/ask/${widgetId}`,
                payload
            );
            setLoader(false);
            if (response?.data?.reply?.response) {
                setMessages([
                    ...newMessages,
                    { sender: "bot", text: response.data.reply.response }
                ]);
            }

        } catch (error) {
            console.error("Error sending message:", error);
            setLoader(false);
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!isAllowed) {
        return null; // or a message like "You are not allowed to view this widget."
    }

    return (
        <>
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
                        height: 470,
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
                        {/* Show only latest message (without map) */}
                        {
                            messages.map((msg, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: "70%",
                                            p: 1.2,
                                            borderRadius: 2,
                                            fontSize: 13,
                                            bgcolor: msg.sender === "user" ? "#0f172a" : "#7f82899e",
                                            color: msg.sender === "user" ? "#e5e7eb" : "#f6f3f3",
                                            wordBreak: "break-word",
                                            "& ul": { paddingLeft: 2, margin: 0 },
                                            "& p": { margin: "4px 0" },
                                        }}
                                    >
                                        {msg.sender === "user" ? (
                                            msg.text
                                        ) : (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.text}
                                            </ReactMarkdown>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    {
                        loader && <Box sx={{
                            // border: "2px solid red",
                            fontStyle: "italic",
                            fontSize: 10,
                            color: "#efeff0",
                            p: 0.5,
                        }}>
                            <CircularProgress size={10} />
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