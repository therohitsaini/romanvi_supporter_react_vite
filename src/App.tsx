import { Fragment, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./components/Helper/Loader";
import { socket } from "./components/Socket/socket";
import { useDispatch } from "react-redux";
import { useSocket } from "./components/Socket/useSocket";
import { connectSocket } from "./reduxToolKit/slice/socketSlice";



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


function App() {

  const dispatch = useDispatch();
  useSocket();
  useEffect(() => {

    dispatch(connectSocket());

    socket.on("connect", () => {

      console.log("Socket connected:", socket.id);

      socket.emit("register_user", {
        userId: localStorage.getItem("_user_Identy_v3"),
      });

    });

  }, [dispatch,]);


  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/n" element={<RegisterationForm />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="widget/:widgetId" element={<ChatWidget />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<OverviewCards />} />
              <Route path="chats" element={<ChatDashboard />} />
              <Route path="widget" element={<ChatWidgetSetting />} />
              <Route path="upload-fqa" element={<UploadFqa />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;