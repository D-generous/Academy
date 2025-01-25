import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const StudentScoreTable = ({ func, index, studentIndex }) => {
    let staffInfo = useSelector((state) => state.staffInformation.staffInformation)
    let classStudents = useSelector((state) => state.staffInformation.classStudents)

    useEffect(() => {
        studentIndex && subjectIndex ? updateStudentAssessment() : '';
        setca1(classStudents[studentIndex]?.subjects[subjectIndex]?.ca1)
        setca2(classStudents[studentIndex]?.subjects[subjectIndex]?.ca2)
        setca3(classStudents[studentIndex]?.subjects[subjectIndex]?.ca3)
        setca4(classStudents[studentIndex]?.subjects[subjectIndex]?.ca4)
        setca5(classStudents[studentIndex]?.subjects[subjectIndex]?.ca5)
        setass1(classStudents[studentIndex]?.subjects[subjectIndex]?.ass1)
        setass2(classStudents[studentIndex]?.subjects[subjectIndex]?.ass2)
        setass3(classStudents[studentIndex]?.subjects[subjectIndex]?.ass3)
        setass4(classStudents[studentIndex]?.subjects[subjectIndex]?.ass4)
        setass5(classStudents[studentIndex]?.subjects[subjectIndex]?.ass5)
        settest1(classStudents[studentIndex]?.subjects[subjectIndex]?.test1)
        settest2(classStudents[studentIndex]?.subjects[subjectIndex]?.test2)
        settest3(classStudents[studentIndex]?.subjects[subjectIndex]?.test3)
        setbonus1(classStudents[studentIndex]?.subjects[subjectIndex]?.bonus1)
        setbonus2(classStudents[studentIndex]?.subjects[subjectIndex]?.bonus2)

    }, [studentIndex])

    let subjectIndex = classStudents[studentIndex]?.subjects?.findIndex((subject, index) => subject.subjectIndex == staffInfo.class);    

    const [ca1, setca1] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ca1)
    const [ca2, setca2] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ca2)
    const [ca3, setca3] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ca3)
    const [ca4, setca4] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ca4)
    const [ca5, setca5] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ca5)
    const [ass1, setass1] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ass1)
    const [ass2, setass2] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ass2)
    const [ass3, setass3] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ass3)
    const [ass4, setass4] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ass4)
    const [ass5, setass5] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.ass5)
    const [test1, settest1] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.test1)
    const [test2, settest2] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.test2)
    const [test3, settest3] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.test3)
    const [bonus1, setbonus1] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.bonus1)
    const [bonus2, setbonus2] = useState(classStudents[studentIndex]?.subjects[subjectIndex]?.bonus2)
    let percent = document.getElementById('total') / 50 * 100
    let caRegex = /^[0-5]$/
    // console.log(caRegex.test(4));

    const updateStudentAssessment = () => {
        let newAssessment = {
            ca1: document.getElementById('ca1').value,
            ca2: document.getElementById('ca2').value,
            ca3: document.getElementById('ca3').value,
            ca4: document.getElementById('ca4').value,
            ca5: document.getElementById('ca5').value,
            ass1: document.getElementById('ass1').value,
            ass2: document.getElementById('ass2').value,
            ass3: document.getElementById('ass3').value,
            ass4: document.getElementById('ass4').value,
            ass5: document.getElementById('ass5').value,
            test1: document.getElementById('test1').value,
            test2: document.getElementById('test2').value,
            test3: document.getElementById('test3').value,
            bonus1: document.getElementById('bonus1').value,
            bonus2: document.getElementById('bonus2').value,
            total: Number(ca1) + Number(ca2) + Number(ca3) + Number(ca4) + Number(ca5) + Number(ass1) + Number(ass2) + Number(ass3) + Number(ass4) + Number(ass5) + Number(test1) + Number(test2) + Number(test3) + Number(bonus1) + Number(bonus2)
        }        
        func(newAssessment)
    }

    const showTable = () => {
        return (<>
            <tr>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ca1} id='ca1' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' name="" onChange={(e) => {
                    setca1(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ca2} id='ca2' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setca2(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ca3} id='ca3' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setca3(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ca4} id='ca4' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setca4(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ca5} id='ca5' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setca5(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ass1} id='ass1' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setass1(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ass2} id='ass2' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setass2(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ass3} id='ass3' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setass3(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ass4} id='ass4' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setass4(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={ass5} id='ass5' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setass5(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={test1} id='test1' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    settest1(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={test2} id='test2' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    settest2(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={test3} id='test3' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    settest3(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={bonus1} id='bonus1' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setbonus1(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' value={bonus2} id='bonus2' className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => {
                    setbonus2(e.target.value)
                    updateStudentAssessment()
                }} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' defaultValue={subjectIndex ? classStudents[index].subjects[subjectIndex].total : '00'} disabled className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" value={Number(ca1) + Number(ca2) + Number(ca3) + Number(ca4) + Number(ca5) + Number(ass1) + Number(ass2) + Number(ass3) + Number(ass4) + Number(ass5) + Number(test1) + Number(test2) + Number(test3) + Number(bonus1) + Number(bonus2)} id='total' /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' defaultValue={subjectIndex ? classStudents[index].subjects[subjectIndex].percent : '00'} disabled className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" value={percent} /></td>
                <td className=' h-11 w-11 text-center m-1 border-2 p-1'><input type="number" placeholder='00' defaultValue={subjectIndex ? classStudents[index].subjects[subjectIndex].position : '00'} disabled className=' w-full h-full focus:outline-0 focus:ring-2 focus:ring-blue-600 rounded-md text-center' max={5} min={0} name="" onChange={(e) => setposition(e.target.value)} /></td>
            </tr>
        </>)
    }

    return (
        <>
            <table className=' w-full'>
                <thead className=' w-full'>
                    <tr className=' w-full'>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>C/A</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>C/A</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>C/A</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>C/A</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>C/A</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>ASS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>ASS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>ASS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>ASS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>ASS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>TEST</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>TEST</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>TEST</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>BONUS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>BONUS</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>TOTAL</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>PERCENT</td>
                        <td className=' h-11 w-11 text-center m-1 border p-1'>POSITION</td>
                    </tr>
                </thead>
                <tbody id='result'>
                    {<tr className='w-full'><td colSpan={15}>Select A Student</td></tr>}
                    {showTable()}
                </tbody>
            </table>
        </>
    )
}

export default StudentScoreTable