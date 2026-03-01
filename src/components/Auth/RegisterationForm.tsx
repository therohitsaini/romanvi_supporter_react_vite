import { Box, Button, Checkbox, Divider, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
// import { auth } from "../../../FirebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";


function RegisterationForm() {

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const userName = useRef<HTMLInputElement>(null);
    const [loader, setLoader] = useState<boolean>(false);

    const signup = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        try {
            setLoader(true);
            const userInfo = {
              
                email: email.current?.value,
                password: password.current?.value
            }
            console.log("User info to be sent:", userInfo);
            const url = `http://localhost:5000/api/user/register-info`
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
                alert("data created in DB")

            }
        }

        catch (error) {
            console.error("Error during sign-up:", error);

        } finally {
            setLoader(false);
        }
    };


    return (
        <div className="main-container   flex items-center justify-center bg-gray-100 h-screen  px-20 py-10 max-sm:px-5">
            <Box sx={{

                height: "100%",
                width: "100%",
                display: "flex",
                // borderRadius: "10px",
            }}>
                <div className="h-full w-[100%] max-sm:hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1732654544060-29a79e7d4775?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Login Image"
                        className="h-full w-full object-cover rounded-l-[10px]" />
                </div>
                <div className="h-full w-[100%] bg-gray-500/10 rounded-r-[10px] max-sm:rounded-[10px] px-30 py-10 flex flex-col justify-center max-sm:px-5 max-sm:py-5">
                    <h1 className="text-3xl font-bold  ">Sign <span className="text-purple-600">up</span> </h1>
                    <p> Welcome back! Please enter your details.</p>
                    <form className="mt-10 flex flex-col gap-4">

                        <TextField
                            label="Email"
                            variant="outlined"
                            className="w-full"
                            size="small"
                            inputRef={email}
                        >
                        </TextField>
                        <TextField
                            label="Password"
                            variant="outlined"
                            className="w-full"
                            size="small"
                            inputRef={password}
                            sx={{
                                ' & .MuiFormLabel-root ': {

                                }
                            }}
                        >
                        </TextField>

                        {/* <input type="email" placeholder="Email" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <input type="password" placeholder="Password" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        <button type="submit" className="bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-300">Login</button> */}
                    </form>
                    <div className="flex w-full flex justify-between items-center mt-2">
                        <div>
                            <Checkbox sx={{ ml: -1 }} />
                            <span>Remider me </span>
                        </div>

                        <a className="text-blue-600 text-sm underline" href="#"></a>
                    </div>
                    <Button variant="contained"
                        onClick={(e) => signup(e)}
                        disabled={loader}
                        sx={{
                            backgroundColor: "black",
                            marginTop: "10px",
                            textTransform: "none",

                        }}>

                        {loader ? <CircularProgress size={24} color="inherit" /> : "Sign up"}
                    </Button>
                    <Divider sx={{ marginY: "20px" }}>OR</Divider>
                    <Button variant="outlined"
                        sx={{
                            borderColor: "gray",
                            color: "black",
                            textTransform: "none",
                        }}>
                        <img
                            src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png"
                            alt="Google Logo"
                            className="h-5 w-5 mr-2"
                        />
                        Sign up with Google
                    </Button>
                    <Link to={"/register/n"} className=" w-full flex justify-center mt-4 underline">if already have an account?</Link>

                </div>
            </Box>
        </div>
    );
}

export default RegisterationForm;
