import { createSlice, current } from "@reduxjs/toolkit";
import { io } from "socket.io-client";


export const socketIO = createSlice({
    name: 'socketIO',
    initialState:{
        // socket: socketClient('https://horn-efficient-headphones.glitch.me'),
        socket: io("https://horn-efficient-headphones.glitch.me", {
            // withCredentials: true,
            path: '/server',
            cert: process.env.NODE_ENV === 'production' ? process.env.SSL_CERT : '',
            key: process.env.NODE_ENV === 'production' ? process.env.SSL_KEY : '',
            reconnection: true,
            transports: ['websocket', 'polling'],
            reconnectAttempts: 5,
            // extraHeaders: {
            //   "my-custom-header": "hopeacademy"
            // }
        }),
    },
    reducers: {
        setSocket: (state, action)=>{
            state.socket = action.payload
        },
        setIO: (state, action)=>{
            state.io = action.payload
        },
        closeIO: (state)=>{
            state.io.close()
            state.io.off('connect')
        }
    }

});

export const {setSocket, setIO, closeIO} = socketIO.actions;
export default socketIO.reducer;

