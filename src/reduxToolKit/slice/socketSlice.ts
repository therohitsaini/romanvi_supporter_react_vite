import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../components/Socket/socket";

interface SocketState {
    connected: boolean;
    messages: string[];
}

const initialState: SocketState = {
    connected: false,
    messages: [],
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        connectSocket: (state) => {
            if (!socket.connected) {
                socket.connect();
            }
        },

        disconnectSocket: (state) => {
            if (socket.connected) {
                socket.disconnect();
            }
        },

        setConnected: (state, action) => {
            state.connected = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const {
    connectSocket,
    disconnectSocket,
    setConnected,
    addMessage,
    clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;