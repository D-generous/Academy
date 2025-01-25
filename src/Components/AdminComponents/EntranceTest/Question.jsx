import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { useSelector, useDispatch } from 'react-redux';
import { addEntranceQuestion } from '../../../redux/adminInformation';
import { backendurl } from '../../../../constants/backendurl';


const Question = ({formType, a, b, c, d, question, correctAnswer, id}) => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [editOption, seteditOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [questionValue, setquestionValue] = useState('')
    const [optionA, setoptionA] = useState('')
    const [optionB, setoptionB] = useState('')
    const [optionC, setoptionC] = useState('')
    const [optionD, setoptionD] = useState('')
    let localOption = editOption;

    useEffect(() => {
        editOption==''?seteditOption(formType):'';
        if (localOption!='add') {
            setoptionA(a)
            setoptionB(b)
            setoptionC(c)
            setoptionD(d)
            setSelectedOption(correctAnswer)
            setquestionValue(question)
        }
    }, [editOption])
    
    const handleSubmit =()=>{
        if(!id){
            DisplayToast('error', 'Newly Added Questions Can Not Be Changed, Please Refresh To Be Able To Edit it')
            return;
        }
        if (localOption=='view') {
            seteditOption('update')
            localOption='update'
        } else if(localOption=='add'){
            let endpoint = `${backendurl}admin/add_entrance_question`;
            let details = {
                question: questionValue,
                options: [optionA, optionB, optionC, optionD],
                correctAnswer: selectedOption,
            }
            axios.post(endpoint, details)
            .then((res)=>{
                if(res.status==200){
                    dispatch(addEntranceQuestion(details))
                    let [show] = DisplayToast('success', 'Question Added Successfully');
                } else {
                    let [show] = DisplayToast('error', 'An Error Occurred, Please Try Again');
                }
            })
            .catch((error)=>{
                let [show] = DisplayToast('error', 'An Error Occurred, Please Try Again');
            })
        } else if(localOption=='update'){
            let endpoint = `${backendurl}admin/update_entrance_question`;
            let details = {
                _id: id,
                question: questionValue,
                options: [optionA, optionB, optionC, optionD],
                correctAnswer: selectedOption,
            }
            axios.post(endpoint, details)
            .then((res)=>{
                seteditOption('view')
                localOption='view'
                let [show] = DisplayToast('success', 'Question Successfully Updated');
            })
            .catch((error)=>{
                seteditOption('view')
                localOption='view'
                let [show] = DisplayToast('error', 'An Error Occurred, Please Try Again');
            })
        }
    }

  return (
    <div>
        <p>Question</p>
        <input disabled={editOption=='view'} type="text" onChange={(e)=>setquestionValue(e.target.value)} value={questionValue} className='h-12 p-2 border-2 border-blue-600 w-full mb-1' name="" id="" />
        <div className='ps-10 flex'>
            <div className='p-2 flex flex-col gap-5'>
                <input disabled={editOption=='view'} type="radio" name="option" onChange={handleChange} value={0} checked={selectedOption==0}  className=' checked:accent-blue-600 border-2 checked:border-blue-600 checked:outline-blue-600' id="" />
                <input disabled={editOption=='view'} type="radio" name="option" onChange={handleChange} value={1} checked={selectedOption==1}  className=' checked:accent-blue-600 border-2 checked:border-blue-600 checked:outline-blue-600' id="" />
                <input disabled={editOption=='view'} type="radio" name="option" onChange={handleChange} value={2} checked={selectedOption==2}  className=' checked:accent-blue-600 border-2 checked:border-blue-600 checked:outline-blue-600' id="" />
                <input disabled={editOption=='view'} type="radio" name="option" onChange={handleChange} value={3} checked={selectedOption==3}  className=' checked:accent-blue-600 border-2 checked:border-blue-600 checked:outline-blue-600' id="" />
            </div>
            <div>
                <input disabled={editOption=='view'} value={optionA} onChange={(e)=>setoptionA(e.target.value)} type="text" className=' h-9 mb-1 p-2 border w-full' placeholder='Option A' />
                <input disabled={editOption=='view'} value={optionB} onChange={(e)=>setoptionB(e.target.value)} type="text" className=' h-9 mb-1 p-2 border w-full' placeholder='Option B' />
                <input disabled={editOption=='view'} value={optionC} onChange={(e)=>setoptionC(e.target.value)} type="text" className=' h-9 mb-1 p-2 border w-full' placeholder='Option C' />
                <input disabled={editOption=='view'} value={optionD} onChange={(e)=>setoptionD(e.target.value)} type="text" className=' h-9 mb-1 p-2 border w-full' placeholder='Option D' />
            </div>
        </div>
        <div onClick={handleSubmit} className='flex'><button className='bg-blue-600 text-white p-2 ms-auto rounded-lg'>{editOption=='add'?'Add Question':editOption=='update'?'Update Question':'Edit'}</button></div>
    </div>
  )
}

export default Question