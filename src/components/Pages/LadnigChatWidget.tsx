import React, { useState } from "react";
import {
    Box,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const LadnigChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi 👋 How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [loader, setLoader] = useState(false);
    console.log("User input:", input);

    const handleSend = async () => {
        if (input.trim() === "") return;
        setMessages([...messages, { sender: "user", text: input }]);
        setLoader(true);
        setInput("");
        const response = await fetch('http://localhost:5000/api/freellm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        });
        const data = await response.json();
        if (response.ok) {
            console.log("AI response:", data.reply);
            setMessages(prevMessages => [...prevMessages, { sender: "bot", text: data.reply }]);
            setInput("");
            setLoader(false);
        } else {
            setLoader(false);
            setMessages(prevMessages => [...prevMessages, { sender: "bot", text: "Sorry, something went wrong. Please try again later." }]);
            return;
        }

    };

    const handleOnchange = (e) => {

        setInput(e.target.value);
        // setInput("");
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // prevent form submit or new line
            handleSend();
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
                    bgcolor: "#020617",
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
                        }}
                    >
                        <Typography fontWeight={600}>
                            AI Assistant {loader && <span>...</span>}
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
                            p: 1.5,
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
                                    bgcolor: "#020617",
                                    color: "#e5e7eb",
                                    borderRadius: 2,
                                    fontSize: 12,
                                    py: "0.5px",
                                },
                            }}
                        />
                        <IconButton
                            sx={{
                                bgcolor: "#38bdf8",
                                color: "#020617",
                                "&:hover": { bgcolor: "#38bdf8" },
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

export default LadnigChatWidget;
