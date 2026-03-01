import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Paper,
    createTheme,
    ThemeProvider
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function PdfFileSelector() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const userId = localStorage.getItem("_user_Identy_v3");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
            setError("Only PDF files are allowed.");
            setFile(null);
            return;
        }

        setError("");
        setSuccess("");
        setFile(selectedFile);
    };
    console.log("Selected file:", file);

    const handleruploadDocs = async () => {
        if (!userId) {
            setError("User not authenticated. Please log in.");
            return;
        }
        if (!file) {
            setError("Please select a PDF file.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("pdf", file);

            const response = await axios.post(
               `http://localhost:5000/api/faq/upload/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setSuccess(response.data.message);
            setError("");
            setFile(null);

        } catch (err) {
            setError(err.response?.data?.message || "Upload failed");
            setSuccess("");
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ height: "100vh", p: 10 }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 4,
                        width: 400,
                        backgroundColor: "#121212",
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Upload PDF File
                    </Typography>

                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Select PDF
                        <input
                            type="file"
                            hidden
                            accept="application/pdf"
                            onChange={handleFileChange}
                            onClick={(e) => (e.target.value = null)}
                        />
                    </Button>

                    {file && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">
                                📄 {file.name}
                            </Typography>
                            <Typography variant="caption">
                                Size: {(file.size / 1024).toFixed(2)} KB
                            </Typography>
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleruploadDocs}
                    >
                        Upload
                    </Button>

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}

                    {success && (
                        <Typography color="success.main" sx={{ mt: 2 }}>
                            {success}
                        </Typography>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    );
}