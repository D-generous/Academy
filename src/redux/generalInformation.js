import {createSlice, current} from '@reduxjs/toolkit';

export const generalInformation = createSlice({
    name: 'admin',
    initialState: {
        banksList: [],
        states: [],
        LGAs: [],
        noticesAndNews: [],    
    },
    reducers: {
        setbanksList: (state, action)=>{
            Object.assign(state.banksList = action.payload);
            console.log(current(state)); 
        },
        setstates: (state, action)=>{
            Object.assign(state.states = action.payload);
            console.log(current(state)); 
        },
        setLGAs: (state, action)=>{
            Object.assign(state.LGAs = action.payload);
            console.log(current(state)); 
        },
        setnoticesAndNews: (state, action)=>{
            Object.assign(state.noticesAndNews = action.payload);
            console.log(current(state)); 
        },
        addnoticesAndNews: (state, action)=>{
            Object.assign(state.noticesAndNews = [...state.noticesAndNews, action.payload]);
            console.log(current(state)); 
        },
        deletenoticesAndNews: (state, action) => ({
            ...state,
            noticesAndNews: state.noticesAndNews.filter(value => value._id !== action.payload)
        }),        
        updatenoticesAndNews: (state, action) => ({
            ...state,
            noticesAndNews: state.noticesAndNews.map(item =>item._id === action.payload.id ? { ...item, ...action.payload.newData } : item )
        })
    }
}) 

export const {setbanksList, setstates, setLGAs, setnoticesAndNews, addnoticesAndNews, deletenoticesAndNews, updatenoticesAndNews} = generalInformation.actions

export default generalInformation.reducer