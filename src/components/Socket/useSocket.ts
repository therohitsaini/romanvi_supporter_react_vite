import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "./socket";
import { addMessage, setConnected } from "../../reduxToolKit/slice/socketSlice";

export const useSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        console.log("Socket connected:", socket.connected);

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
            dispatch(setConnected(true));
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
            dispatch(setConnected(false));
        });

        socket.on("receive_message", (data) => {
            dispatch(addMessage(data));
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("receive_message");
        };

    }, [dispatch]);
};