import { Box, Button, Checkbox, CircularProgress, Divider, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { auth } from "../../../FirebaseConfig";
// import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const loginHandler = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        try {
            setLoading(true);
            const userInfo = {

                email: email.current?.value,
                password: password.current?.value
            }
            // 👇 Firebase login
            // await signInWithEmailAndPassword(auth, emailValue, passwordValue);

            // const user = auth.currentUser;
            // if (user) {
            try {
                const url = `http://localhost:5000/api/user/login-info`
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                });
                const data = await response.json();
                console.log("Response from server:", data);
                if (response.ok) {
                    console.log("Response from server:", data);
                    localStorage.setItem("__Access_Token_v2", data.token);
                    localStorage.setItem("_user_Identy_v3", data.data._id);
                    toast.success(data.message || "Login successful!");
                    if (data.isOnboarded === false) {
                        navigate("/onboarding");
                    } else {
                        navigate("/dashboard");
                    }

                } else {
                    toast.error(data.message || "Login failed!");
                }
                console.log("Response from server:", data);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
            // const accessToken = await getIdToken(user);
            // localStorage.setItem("_access-token-v1z", accessToken);

            // }

        } catch (error) {
            console.error("Error during login:", error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container flex items-center justify-center  h-screen px-20 py-10 max-sm:px-5 bg-black">
            <ToastContainer />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                }}
            >
                <div className="h-full w-[100%] max-sm:hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1732654544060-29a79e7d4775?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Login Icon"
                        className="h-full w-full object-cover rounded-l-[10px]"
                    />
                </div>

                <div className="h-full w-[100%]  rounded-r-[10px] px-30 py-10 flex flex-col justify-center max-sm:rounded-[10px] max-sm:px-5 max-sm:py-0 bg-white">
                    <h1 className="text-3xl font-bold">
                        Sign <span className="text-purple-600">in</span>
                    </h1>
                    <p>Welcome back! Please enter your details.</p>

                    <form className="mt-10 flex flex-col gap-4">
                        <TextField
                            label="Email or Username"
                            variant="outlined"
                            className="w-full"
                            size="small"
                            inputRef={email}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            className="w-full"
                            size="small"
                            type="password"
                            inputRef={password}
                        />
                    </form>

                    <div className="flex w-full justify-between items-center mt-2">
                        <div>
                            <Checkbox sx={{ ml: -1 }} />
                            <span>Remember me</span>
                        </div>
                        <a className="text-blue-600 text-sm underline" href="#">
                            Forget password
                        </a>
                    </div>

                    <Button
                        variant="contained"
                        onClick={loginHandler}
                        disabled={loading}
                        sx={{
                            backgroundColor: "black",
                            marginTop: "10px",
                            textTransform: "none",
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    </Button>

                    <Divider sx={{ marginY: "20px" }}>OR</Divider>

                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "gray",
                            color: "black",
                            textTransform: "none",
                        }}
                    >
                        <img
                            src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png"
                            alt="Google Logo"
                            className="h-5 w-5 mr-2"
                        />
                        Sign in with Google
                    </Button>

                    <Link
                        to={"/register/n"}
                        className="w-full flex justify-center mt-4 underline"
                    >
                        Don’t have an account?
                    </Link>
                </div>
            </Box>
        </div>
    );
}

export default Login;
