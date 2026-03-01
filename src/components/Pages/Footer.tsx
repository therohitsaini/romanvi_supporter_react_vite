import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: "1px solid #e5e7eb",
                py: 2,
                mt: "auto",
                backgroundColor: "#fff",
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    {/* Left Side */}
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} ChatWidget SaaS. All rights reserved.
                    </Typography>

                    {/* Center Links */}
                    <Stack direction="row" spacing={3}>
                        <Link href="#" underline="hover" color="text.secondary">
                            Privacy
                        </Link>
                        <Link href="#" underline="hover" color="text.secondary">
                            Terms
                        </Link>
                        <Link href="#" underline="hover" color="text.secondary">
                            Documentation
                        </Link>
                    </Stack>

                    {/* Right Side */}
                    <Typography variant="body2" color="text.secondary">
                        v1.0.0
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
