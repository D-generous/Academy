import { createSlice, current } from "@reduxjs/toolkit";

export const staffInformation = createSlice({
    name: 'staff',
    initialState: {
        staffInformation: {},
        staffNotifications: {},
        allStaffs: [],
        allStudents: [],
        allAdmins: [],
        classStudents: [],
        staffFetchingState: true,
        notificationFetchingState: true
    },
    reducers: {
        fetchStaff: (state, action)=>{
            Object.assign(state.staffInformation = action.payload)  
            console.log(current(state));         
        },
        fetchStaffNotifications: (state, action)=>{
            Object.assign(state.staffNotifications = action.payload)  
            console.log(current(state));         
        },
        updateStaffNotifications: (state, action)=>{
            Object.assign(state.staffNotifications = {unread:Number(state.staffNotifications.unread)+1, notifications: [...state.staffNotifications.notifications, action.payload]})  
            console.log(current(state));         
        },
        shownStaffNotifications: (state, action)=>{
            Object.assign(state.staffNotifications = { ...state.staffNotifications, unread: action.payload})  
            console.log(current(state));         
        },
        fetchAllStaffs: (state, action)=>{
            Object.assign(state.allStaffs = action.payload)  
            console.log(current(state)); 
        },
        fetchAllStudents: (state, action)=>{
            Object.assign(state.allStudents = action.payload)  
            console.log(current(state)); 
        },
        fetchAllAdmins: (state, action)=>{
            Object.assign(state.allAdmins = action.payload)  
            console.log(current(state)); 
        },
        fetchClassStudents: (state, action)=>{
            Object.assign(state.classStudents = action.payload)  
            console.log(current(state));
        },
        setFetching: (state, action)=>{
            Object.assign(state.staffFetchingState = action.payload)  
            console.log(current(state));
        },
        setNotificationFetching: (state, action)=>{
            Object.assign(state.notificationFetchingState = action.payload)  
            console.log(current(state));
        }
    }
})

export const {fetchStaff, fetchAllStaffs, fetchAllStudents, fetchClassStudents, fetchAllAdmins, setFetching, fetchStaffNotifications, updateStaffNotifications, setNotificationFetching, shownStaffNotifications} = staffInformation.actions

export default staffInformation.reducer