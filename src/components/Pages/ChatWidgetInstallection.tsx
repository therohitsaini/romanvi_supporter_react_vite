import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";

export default function InstallWidget() {
    const [userId, setUserId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem("_user_Identy_v3");
        if (id) setUserId(id);
    }, []);

    const script = `<script src="${import.meta.env.VITE_API_BASE_URL}" data-widget-id="${userId}"></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#0b0b0c",
                p: 4,
                color: "#fff",
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Install Chat Widget
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                Copy the code below and paste it before the closing{" "}
                {"</body>"} tag on your website.
            </Typography>

            {/* Script Box */}
            <Card
                sx={{
                    bgcolor: "#111",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <CardContent>
                    <Typography
                        sx={{
                            fontFamily: "monospace",
                            fontSize: "14px",
                            wordBreak: "break-all",
                            color: "#22c55e",
                        }}
                    >
                        {script}
                    </Typography>
                </CardContent>
            </Card>

            {/* Copy Button */}
            <Button
                variant="contained"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
                sx={{
                    mt: 2,
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                        bgcolor: "#e5e7eb",
                    },
                }}
            >
                Copy Code
            </Button>

            {/* Copied Alert */}
            {copied && (
                <Alert sx={{ mt: 2 }} severity="success">
                    Code copied successfully!
                </Alert>
            )}

            {/* Steps */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Steps to Install
                </Typography>

                <Alert severity="warning" sx={{width:"300px"}}>
                    1. Copy the script above <br />
                    2. Paste it before {"</body>"} in your website <br />
                    3. Save and reload your site <br />
                    4. Chat widget will appear 
                </Alert>
            </Box>

            {/* Warning */}
            <Alert severity="info" sx={{ mt: 3 }}>
                Make sure your domain is added in allowed domains settings, otherwise
                widget will not load.
            </Alert>
        </Box>
    );
}