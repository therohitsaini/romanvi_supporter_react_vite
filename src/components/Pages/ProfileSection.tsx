import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData } from "../../reduxToolKit/slice/adminSlice";
import type { AppDispatch } from "../../reduxToolKit/store/Store";
;

export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const adminData = useSelector((state) => state.admin.admin);
    const [form, setForm] = useState({
        username: "",
        email: "",
        contact: "",
        company: "",
        domain: ""
    });
    useEffect(() => {
        const userId: string | null = localStorage.getItem("_user_Identy_v3");

        if (userId) {
            dispatch(fetchAdminData(userId));
        }
    }, [dispatch]);
    useEffect(() => {
        if (adminData) {
            setForm({
                username: adminData.data.name || "",
                email: adminData.data.email || "",
                contact: adminData.data.contact || "",
                company: adminData.data.company || "",
                domain: adminData.data.domain || ""
            });
        }
    }, [adminData])
    console.log(adminData, "Admin data in Profile");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ p: 4, bgcolor: "#0b0b0c", minHeight: "90vh" }}>
            <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
                Profile Settings
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        bgcolor: "#1f212578",
                        color: "#fff",
                        borderRadius: 3,
                        height: "300px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        width: "250px",
                    }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Avatar
                                sx={{
                                    width: 90,
                                    height: 90,
                                    margin: "auto",
                                    mb: 2
                                }}
                            />
                            <Typography variant="h6">{form.username}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                {form.email}
                            </Typography>

                            <Button
                                variant="outlined"
                                sx={{
                                    mt: 2,
                                    color: "#fff",
                                    borderColor: "#374151",
                                    textTransform: "none"
                                }}
                            >
                                Upload Photo
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* RIGHT FORM */}
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        bgcolor: "#1f212578",
                        color: "#fff",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.08)"
                    }}>
                        <CardContent>

                            {/* PERSONAL INFO */}
                            <Typography variant="h6" mb={2}>
                                Personal Information
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Username"
                                        name="username"
                                        fullWidth
                                        size="small"

                                        value={form.username}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: "#fff", backgroundColor: "#3a3b3d" } }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        fullWidth
                                        size="small"
                                        value={form.email}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: "#fff" } }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Contact Number"
                                        name="contact"
                                        fullWidth
                                        size="small"
                                        value={form.contact}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: "#fff" } }}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3, borderColor: "#374151" }} />

                            {/* COMPANY INFO */}
                            <Typography variant="h6" mb={2}>
                                Company Information
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Company Name"
                                        name="company"
                                        fullWidth
                                        size="small"
                                        value={form.company}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: "#fff" } }}
                                    />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3, borderColor: "#374151" }} />

                            {/* DOMAIN */}
                            <Typography variant="h6" mb={2}>
                                Domain Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Domain Name"
                                        name="domain"
                                        fullWidth
                                        size="small"
                                        placeholder="example.com"
                                        value={form.domain}
                                        onChange={handleChange}
                                        InputProps={{ style: { color: "#fff" } }}
                                    />
                                </Grid>
                            </Grid>

                            {/* SAVE BUTTON */}
                            <Box textAlign="right" mt={4}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#fff",
                                        color: "#000",
                                        fontWeight: 600,
                                        px: 4,
                                        "&:hover": {
                                            bgcolor: "#e5e7eb"
                                        }
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}