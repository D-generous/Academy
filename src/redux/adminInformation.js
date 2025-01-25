import {createSlice, current} from '@reduxjs/toolkit';

export const adminInformation = createSlice({
    name: 'admin',
    initialState: {
        adminInformation: {},
        dataFetchingState: true,
        allStudents: [],
        allStaffs: [],
        allCourses: [],
        entranceQuestions: [],
        entranceParticipants: {},
    },
    reducers: {
        setAdminInfo: (state, action)=>{
            Object.assign(state.adminInformation = action.payload);
            console.log(current(state)); 
        },
        setFetchingState: (state, action)=>{
            Object.assign(state.dataFetchingState = action.payload);
            console.log(current(state));  
        },
        setAllStudents: (state, action)=>{
            Object.assign(state.allStudents = action.payload);
            console.log(current(state));  
        },
        setAllStaffs: (state, action)=>{
            Object.assign(state.allStaffs = action.payload);
            console.log(current(state));  
        },
        setAllCourses: (state, action)=>{
            Object.assign(state.allCourses = action.payload);
            console.log(current(state));  
        },
        updateAllCourses: (state, action)=>{
            let updatedCourses = state.allCourses.map((array, index) => index === action.payload.index ? action.payload.newData : array);
            Object.assign(state.allCourses = updatedCourses);
            console.log(current(state));  
        },
        updateAllStaffs: (state, action)=>{
            let updatedStaffs = state.allStaffs
            updatedStaffs[action.payload.index].push(action.payload.newData)
            Object.assign(state.allStaffs = updatedStaffs);
            console.log(current(state));  
        },
        updateAStaff: (state, action)=>{
            let allStaffsData = state.allStaffs
            allStaffsData[action.payload.index] = allStaffsData[action.payload.index].map(staff => {
                if (staff.email === action.payload.newData.email) {
                  return { ...staff, ...action.payload.newData };
                }
                return staff;
              });
            Object.assign(state.allStaffs = allStaffsData);
            console.log(current(state));  
        },
        deleteAStaff: (state, action)=>{
            let allStaffsData = state.allStaffs
            allStaffsData[action.payload.index] = [action.payload.index].filter(staff => staff._id !== action.payload.id);
            Object.assign(state.allStaffs = allStaffsData);
            console.log(current(state));  
        },
        deleteAStudent: (state, action)=>{
            let allStudentsData = state.allStudents
            allStudentsData[action.payload.index] = [action.payload.index].filter(staff => staff._id !== action.payload.id);
            Object.assign(state.allStaffs = allStudentsData);
            console.log(current(state));  
        },
        setEntranceQuestions: (state, action)=>{
            Object.assign(state.entranceQuestions = action.payload);
            console.log(current(state)); 
        },
        addEntranceQuestion: (state, action)=>{
            Object.assign(state.entranceQuestions = [...state.entranceQuestions, action.payload]);
            console.log(current(state)); 
        },
        setEntranceParticipants: (state, action)=>{
            let previousParticipants = state.entranceParticipants
            previousParticipants[action.payload.year] = action.payload.participants
            Object.assign(state.entranceParticipants = previousParticipants);
            console.log(current(state)); 
        },

    }
}) 

export const {setAdminInfo, setFetchingState, setAllStudents, setAllStaffs, setAllCourses, updateAllCourses, updateAllStaffs, updateAStaff, deleteAStudent, deleteAStaff, setEntranceQuestions, addEntranceQuestion, setEntranceParticipants } = adminInformation.actions

export default adminInformation.reducer