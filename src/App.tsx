import { Fragment, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/Helper/Loader";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "./reduxToolKit/store/Store";
import { verifyToken } from "./reduxToolKit/slice/authSlice";
import ProtectedRoute from "./components/ProtectRoutes/AdminProtectRoute";

import { socket } from "./components/Socket/socket";
import { setConnected } from "./reduxToolKit/slice/socketSlice";


const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const RegisterationForm = lazy(() => import("./components/Auth/RegisterationForm"));
const Onboarding = lazy(() => import("./components/Pages/Onboarding"));
const Dashboard = lazy(() => import("./components/Pages/DashboardClient"));
const ChatWidgetSetting = lazy(() => import("./components/Pages/WidgetSettings"));
const OverviewCards = lazy(() => import("./components/Pages/Overview"));
const ChatWidget = lazy(() => import("./components/Pages/ChatWidget"));
const UploadFqa = lazy(() => import("./components/Pages/UploadFqa"));
const ChatDashboard = lazy(() => import("./components/Pages/ChatDashboard"));
const InstallWidget = lazy(() => import("./components/Pages/ChatWidgetInstallection"));
const Profile = lazy(() => import("./components/Pages/ProfileSection"));


function App() {


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
      dispatch(setConnected(false));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const userId = localStorage.getItem("_user_Identy_v3");
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);

      if (userId) {
        console.log("Sending register_user:", userId);
        socket.emit("register_user", { userId });
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [userId]);


  return (
    <Fragment>
      <BrowserRouter>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/n" element={<RegisterationForm />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<OverviewCards />} />
              <Route path="chats" element={<ChatDashboard />} />
              <Route path="widget" element={<ChatWidgetSetting />} />
              <Route path="upload-fqa" element={<UploadFqa />} />
              <Route path="install-widget" element={<InstallWidget />} />
              <Route path="profile" element={<Profile />} />
            </Route>

          </Routes>
        </Suspense>
        {/* Widget Routes */}
        <Routes>
          <Route path="widget/:widgetId" element={<ChatWidget />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;