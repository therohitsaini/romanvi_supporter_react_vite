import React, { use, useEffect, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Paper,
    TextField,
    Button,
    Divider,
    Chip
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const conversations = [
    { id: 1, name: "John Doe", message: "Pricing inquiry", time: "2 min ago" },
    { id: 2, name: "support@client.com", message: "Refund policy?", time: "10 min ago" },
    { id: 3, name: "Anonymous Visitor", message: "Hello there!", time: "1 hour ago" },
    { id: 1, name: "John Doe", message: "Pricing inquiry", time: "2 min ago" },
    { id: 2, name: "support@client.com", message: "Refund policy?", time: "10 min ago" },
    { id: 3, name: "Anonymous Visitor", message: "Hello there!", time: "1 hour ago" },
    { id: 1, name: "John Doe", message: "Pricing inquiry", time: "2 min ago" },
    { id: 2, name: "support@client.com", message: "Refund policy?", time: "10 min ago" },
    { id: 3, name: "Anonymous Visitor", message: "Hello there!", time: "1 hour ago" }
];

const defaultMessages = [
    { sender: "user", text: "Hello!", time: "2:45 PM" },
    { sender: "bot", text: "Hi! How can I help you?", time: "2:46 PM" },
    { sender: "user", text: "What’s your refund policy?", time: "2:47 PM" },
    { sender: "bot", text: "You can request a refund within 7 days.", time: "2:48 PM" }
];
interface ChatListItem {
    _id: string
    email: string
    lastMessage: string
    partnerId: string
    createdAt: string
    updatedAt: string
    __v: number
}
export const convertUTCtoIST = (utcTime: string) => {
    const date = new Date(utcTime)

    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      
    })
}


export default function ChatDashboard() {
    const [userId, setUserId] = useState(null);
    const [conversations, setConversations] = useState<ChatListItem[]>([]);
    const [messages, setMessages] = useState(defaultMessages);
    const [input, setInput] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("_user_Identy_v3")
        setUserId(id); // Simulate user ID
    }, []);
    const sendMessage = () => {
        if (!input) return;

        setMessages([...messages, { sender: "admin", text: input, time: "Now" }]);
        setInput("");
    };

    const getChatHistory = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/patner/admin/chat/list/dashboard/${userId}`
            );
            console.log("Full Response:", response);
            if (response.status === 200) {
                setConversations(response.data.data);
            } else {
                console.warn("API returned success false:", response.data);
            }

        } catch (error) {
            console.error("Error fetching chat history:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (userId) {
            getChatHistory();
        }
    }, [userId]);


    return (
        <Box sx={{ height: "90vh", display: "flex", background: "#f2f3f6", gap: 2, p: 2 }}>

            {/* LEFT PANEL */}
            <Paper sx={{ width: 290, bgcolor: "#1e293b", color: "#fff", p: 2 }}>
                <Typography variant="h6" mb={2}>Conversations</Typography>

                <List sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                    {conversations.map((chat) => {
                        console.log("Rendering chat item:", chat);
                        return (
                            <ListItem
                                key={chat._id}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    backgroundColor: "#334155",
                                    "&:hover": { bgcolor: "#536988" }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>{chat.email[0]}</Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={chat.email}
                                    secondary={
                                        <Typography variant="caption" color="gray">
                                            {chat.lastMessage} • {convertUTCtoIST(chat.updatedAt)}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>

            {/* CENTER CHAT WINDOW */}
            <Paper
                sx={{
                    flex: 1,   // 🔥 THIS MAKES CENTER FULL WIDTH
                    bgcolor: "#1e293b",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #334155" }}>
                    <Typography variant="h6">Chat Window</Typography>
                    <Chip label="Open" color="success" size="small" />
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                    {messages.map((msg, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                justifyContent:
                                    msg.sender === "user" ? "flex-start" : "flex-end",
                                mb: 2
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: msg.sender === "user" ? "#2563eb" : "#334155",
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    maxWidth: "60%"
                                }}
                            >
                                <Typography variant="body2">{msg.text}</Typography>
                                <Typography variant="caption" color="gray">
                                    {msg.time}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Divider />

                {/* Input */}
                <Box sx={{ p: 2, display: "flex", gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        sx={{ bgcolor: "#334155", borderRadius: 1 }}
                    />

                    <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
                        Send
                    </Button>
                </Box>
            </Paper>

            {/* RIGHT PANEL */}
            <Paper sx={{ width: 290, bgcolor: "#1e293b", color: "#fff", p: 2 }}>
                <Typography variant="h6" mb={2}>Visitor Info</Typography>

                <Typography>Email: user@email.com</Typography>
                <Typography mt={1}>Location: India</Typography>
                <Typography mt={1}>Device: Chrome (Windows)</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1">Recent Activity</Typography>

                <Typography variant="body2">Visited: /pricing</Typography>
                <Typography variant="body2">Viewed: /faq</Typography>
            </Paper>

        </Box>
    );
}
