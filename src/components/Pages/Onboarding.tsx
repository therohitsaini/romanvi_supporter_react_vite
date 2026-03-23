import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Company Info", "Business Details", "Complete Setup"];

const Onboarding = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const userId = localStorage.getItem("_user_Identy_v3");
    const [formData, setFormData] = useState({
        companyName: "",
        website: "",
        businessType: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/onbording/onbording-data`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...formData, userId }),
                    }
                );

                const data = await response.json();
                console.log("Company Created:", data);
                if (response.ok) {
                    navigate("/dashboard", { replace: true });
                } else {
                    alert(data.message || "Failed to create company. Please try again.");
                }

            } catch (error) {
                console.error("Error creating company:", error);
            }

        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f9fafb",
                backgroundImage: "url('https://img.freepik.com/free-photo/ultraviolet-make-up-portrait-girl-painted-fluorescent-powder-halloween-concept_613910-17594.jpg?t=st=1770567936~exp=1770571536~hmac=39771c49915d8d059d1b55aa08df0bb66383a52f0f90ca2080f77f9b4c32eff9&w=1480')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                py: 8,
                
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        Setup Your Chat Widget
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label} sx={{ "& .MuiStepLabel-root": { color: "#9ca3af" } }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <TextField
                            fullWidth
                            size="small"
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            margin="normal"
                        />
                    )}

                    {activeStep === 1 && (
                        <>
                            <TextField
                                fullWidth
                                size="small"

                                label="Website URL"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                margin="normal"
                            />

                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Business Type"
                                name="businessType"
                                value={formData.businessType}
                                onChange={handleChange}
                                margin="normal"
                            >
                                <MenuItem value="ecommerce">E-commerce</MenuItem>
                                <MenuItem value="saas">SaaS</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>
                        </>
                    )}

                    {activeStep === 2 && (
                        <Typography>
                            Click finish to complete setup and access your dashboard.
                        </Typography>
                    )}

                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>

                        <Button variant="contained" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Onboarding;
