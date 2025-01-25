import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { fetchStudentAcademicResults, setFetchedResults } from '../../redux/studentInformation';
import { backendurl } from '../../../constants/backendurl';


const fetchStudentAcademicResultsHook = () => {
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let studentAcademicResults = useSelector((state) => state.studentInformation.studentAcademicResults);
    let fetchingResults = useSelector((state) => state.studentInformation.resultFetchingState);
    let dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            if (Object.keys(studentInfo).length >= 1 && studentInfo.constructor === Object && studentAcademicResults.length === 0) {
                dispatch(setFetchedResults(true))
                let endpoint = `${backendurl}student/academic_results`
                let getStudentResults = await axios.post(endpoint, { id: studentInfo._id })
                console.table(getStudentResults)
                if (getStudentResults.status == 200) {
                    dispatch(fetchStudentAcademicResults(getStudentResults.data))
                    dispatch(setFetchedResults(false))
                }
            }
        }
        fetchData()
    }, [studentInfo])
    return [studentAcademicResults, fetchingResults];
};

export default fetchStudentAcademicResultsHook;
