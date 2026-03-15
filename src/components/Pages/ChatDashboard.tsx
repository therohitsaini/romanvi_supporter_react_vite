import React, { use, useEffect, useRef, useState } from "react";
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
import type { ChatListItem } from "../Helper/TsInterfce";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



const defaultMessages = [
    { sender: "user", text: "Hello!", time: "2:45 PM" },
    { sender: "bot", text: "Hi! How can I help you?", time: "2:46 PM" },
    { sender: "user", text: "What’s your refund policy?", time: "2:47 PM" },
    { sender: "bot", text: "You can request a refund within 7 days.", time: "2:48 PM" }
];

export const convertUTCtoIST = (utcTime: string) => {
    const date = new Date(utcTime)

    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",

    })
}


export default function ChatDashboard() {
    const [userId, setUserId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<ChatListItem[]>([]);
    const [messages, setMessages] = useState(defaultMessages);
    const [input, setInput] = useState("");
    const [selectedChat, setSelectedChat] = useState<ChatListItem | null>(null);
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);


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
            console.error("Error fetching chat history:");
        }
    };

    useEffect(() => {
        if (userId) {
            getChatHistory();
        }
    }, [userId]);

    const getMessagesForChat = async (partnerId: string) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/patner/admin/chat/messages/dashboard/${partnerId}`
            );
            if (response.status === 200) {
                setChatHistory(response.data.data);
            } else {
                console.warn("API returned success false:", response.data);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    }


    const handleChatItemClick = (chat: ChatListItem) => {
        console.log("Chat item clicked:", chat);
        setSelectedChat(chat);
    }
    useEffect(() => {
        if (selectedChat?._id) {
            getMessagesForChat(selectedChat._id);
        }
    }, [selectedChat]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);
    console.log("Chat History:", chatHistory);


    return (
        <Box sx={{ height: "90vh", display: "flex", background: "#f2f3f6", gap: 2, p: 2 }}>
            <Paper sx={{ width: 290, bgcolor: "#1e293b", color: "#fff", p: 2 }}>
                <Typography variant="h6" mb={2}>Conversations</Typography>
                {conversations.length === 0 ? (
                    <Typography variant="body2" color="gray">
                        No conversations available.
                    </Typography>
                ) : null}
                <List sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                    {conversations.map((chat) => {
                        return (

                            <ListItem
                                onClick={() => handleChatItemClick(chat)}
                                key={chat._id}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    backgroundColor: "#334155",
                                    "&:hover": { bgcolor: "#536988" }
                                }}
                            >
                                <ListItemAvatar sx={{ color: "#94bafb" }}>
                                    <Avatar>{chat.email[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.email}
                                    secondary={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "gray",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px"
                                            }}
                                        >
                                            <span
                                                style={{
                                                    flex: 1,
                                                    minWidth: 0,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}
                                            >
                                                {chat.lastMessage}
                                            </span>

                                            <span style={{ whiteSpace: "nowrap" }}>
                                                {convertUTCtoIST(chat.updatedAt)}
                                            </span>
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
                    flex: 1,
                    bgcolor: "#1e293b",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ListItemAvatar sx={{ color: "#94bafb" }}>
                            <Avatar>{selectedChat ? selectedChat.email[0] : ""}</Avatar>
                        </ListItemAvatar>
                        <Typography variant="subtitle1">
                            {selectedChat ? selectedChat.email : "Select a chat"}
                            {selectedChat && (
                                <Typography variant="caption" color="gray" ml={1}>
                                    {convertUTCtoIST(selectedChat.updatedAt)}
                                </Typography>
                            )}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ fontSize: "16px" }}>Chat Window</Typography>
                        {selectedChat && <Chip label="Open" color="success" size="small" />}
                    </div>

                    {/* <Chip label="Open" color="success" size="small" /> */}
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                    {chatHistory.map((msg, i) => (
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
                                <Typography variant="body2">  {msg.sender === "user" ? (
                                    msg.message
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.message}
                                    </ReactMarkdown>
                                )}</Typography>
                                <Typography variant="caption" color="gray">
                                    {msg.sender === "user" ? "Visitor" : "bot"} • {convertUTCtoIST(msg.createdAt)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <div ref={bottomRef}></div>
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

                <Typography>Email: {selectedChat ? selectedChat.email : "N/A"}</Typography>
                <Typography mt={1}>Device: Chrome (Windows)</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1">Recent Activity</Typography>

                <Typography variant="body2">Visited: /pricing</Typography>
                <Typography variant="body2">Viewed: /faq</Typography>
            </Paper>

        </Box>
    );
}
