import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
    connected: boolean;
    messages: any[];
    notifications: any[];
}

const initialState: SocketState = {
    connected: false,
    messages: [],
    notifications: []
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },

        addMessage: (state, action) => {
            state.notifications = [action.payload, ...state.notifications].slice(0, 50);
        },

        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const {
    setConnected,
    addMessage,
    clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;