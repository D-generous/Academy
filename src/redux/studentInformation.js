import { createSlice, current } from "@reduxjs/toolkit";

export const studentInformation = createSlice({
    name: 'student',
    initialState: {
        studentInformation: {},
        allStaffs: [],
        allStudents: [],
        allAdmins: [],
        classTeachers: [],
        studentNotifications: {},
        studentFetchingState: true,
        notificationFetchingState: true,
        termDetails: {},
        studentAcademicResults: [],
        resultFetchingState: true,
    },
    reducers: {
        fetchStudent: (state, action)=>{
            Object.assign(state.studentInformation = action.payload)  
            console.log(current(state));         
        },
        fetchTermDetails: (state, action)=>{
            Object.assign(state.termDetails = action.payload)  
            console.log(current(state));         
        },
        fetchStudentAcademicResults: (state, action)=>{
            Object.assign(state.studentAcademicResults = action.payload)  
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
        fetchClassTeachers: (state, action)=>{
            Object.assign(state.classTeachers = action.payload)  
            console.log(current(state)); 
        },
        setFetched: (state, action)=>{
            Object.assign(state.studentFetchingState = action.payload)  
            console.log(current(state)); 
        },
        setFetchedResults: (state, action)=>{
            Object.assign(state.resultFetchingState = action.payload)  
            console.log(current(state)); 
        },
        fetchStudentNotifications: (state, action)=>{
            Object.assign(state.studentNotifications = action.payload)  
            console.log(current(state));         
        },
        updateStudentNotifications: (state, action)=>{
            Object.assign(state.studentNotifications = {unread:Number(state.studentNotifications.unread)+1, notifications: [...state.studentNotifications.notifications, action.payload]})  
            console.log(current(state));         
        },
        shownStudentNotifications: (state, action)=>{
            Object.assign(state.studentNotifications = { ...state.studentNotifications, unread: action.payload})  
            console.log(current(state));         
        },
    }
})

export const {fetchStudent, fetchAllStaffs, fetchAllStudents, setFetched, fetchStudentNotifications, updateStudentNotifications, shownStudentNotifications, fetchTermDetails, fetchStudentAcademicResults, setFetchedResults, fetchAllAdmins, fetchClassTeachers} = studentInformation.actions

export default studentInformation.reducer