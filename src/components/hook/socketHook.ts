import { useEffect } from "react";
import { socket } from "../../components/Socket/socket";
import { useDispatch } from "react-redux";
import { addMessage, setConnected } from "../../reduxToolKit/slice/socketSlice";


const dispatch = useDispatch();

useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
        dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
        dispatch(setConnected(false));
    });

    socket.on("new_notification", (data) => {
        dispatch(addMessage(data)); 
    });

    return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("new_notification");
    };
}, []);