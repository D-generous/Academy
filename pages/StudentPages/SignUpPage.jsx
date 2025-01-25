import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LandingPageNav from '../../src/Components/LandingPageNav'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import { subjects } from '../../constants/subjects'
import DisplayToast from '../../src/CustomHooks/DisplayToast'
import MessageSchool from '../../src/Components/MessageSchool'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'
import { backendurl } from '../../constants/backendurl';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from '@mui/material'





const SignUpPage = () => {
    document.querySelector('title').innerText = 'Sign Up | Student';

    const navigate = useNavigate()
    const theme = useTheme();
    const [fileType, setfileType] = useState('.jpeg, .jpg, .gif, .tif, .psd');


    const [signingUp, setsigningUp] = useState(false)
    const [imageBase64, setimageBase64] = useState('')
    const submit = ({ firstName, lastName, email, password, address, subjects, clas }) => {
        let fullsubjects = [];
        subjects.map((subject, index) => {
            let subjectDetails = {
                subjectIndex: index,
                ca1: '',
                ca2: '',
                ca3: '',
                ca4: '',
                ca5: '',
                ass1: '',
                ass2: '',
                ass3: '',
                ass4: '',
                ass5: '',
                test1: '',
                test2: '',
                test3: '',
                bonus1: '',
                bonus2: '',
                exam: '',
                total: '',
                percent: '',
                position: ''
            }
            fullsubjects.push(subjectDetails)
        })
        const details = {
            firstName,
            lastName,
            email,
            password,
            address,
            class: clas,
            imageBase64,
            links: {
                twitter: '',
                facebook: '',
                whatsapp: '',
                other: ''
            },
            localGovernment: '',
            state: '',
            country: '',
            subjects: fullsubjects,
            tasks: []
        }
        let endpoint = `${backendurl}student/signup`
        if (imageBase64 != '') {
            setsigningUp(true)
            axios.post(endpoint, details)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        DisplayToast('success', 'Account Successfully Created')
                        navigate("/student/signin");
                    }
                })
                .catch((err) => {
                    if (err.response.status == 478) {
                        DisplayToast('error', 'Email Already Exists')
                    } else {
                        DisplayToast('error', 'An Error Occurred, Pease try Again')
                    }
                    setsigningUp(false)
                    console.log(err);
                })
        } else {
            DisplayToast('error', 'Please Select An Image')
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            state: '',
            localGovernment: '',
            subjects: [0, 1],
            clas: 0
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Too Short')
                .max(40, 'Too Long')
                .required('Required'),
            address: Yup.string()
                .min(2, 'Too Short')
                .max(230, 'Too Long')
                .required('Required'),
            localGovernment: Yup.string()
                .min(2, 'Too Short')
                .max(230, 'Too Long')
                .required('Required'),
            state: Yup.string()
                .min(2, 'Too Short')
                .max(230, 'Too Long')
                .required('Required')
        }),
        onSubmit: (values) => {
            submit(values)
        }
    })
    const selectImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setimageBase64(reader.result)
        }
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const getStyles = (name, personName, theme) => {
        return {
            fontWeight: personName.includes(name)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        };
    }

    const [selectedSubjects, setSelectedSubjects] = useState([0, 1]);

    const handleSelectSubjects = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedSubjects(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [studentClass, setStudentClass] = useState('');

    const handleClassChange = (event) => {
        setStudentClass(event.target.value);
    };

    return (
        <>
            <LandingPageNav />
            <h3 className='text-center text-2xl bg-light m-0 p-3'>Welcome to <span className='text-3xl font-bold text-blue-600'>HOPE Academy</span></h3>
            <div className="flex flex-col-reverse md:flex-row w-full p-4 topSpace bg-light gap-3 relative">
                <div className="border rounded-5 p-5 flex flex-col relative">
                    <div className='absolute -z-10 left-0 right-0 top-0 bottom-0'>
                        <img src="/school_logo.png" alt="School Logo" className='sticky -z-10 top-32 w-full h-44' />
                    </div>
                    <form className='bg-white bg-opacity-75' onSubmit={formik.handleSubmit}>
                        <h3 className='text-center text-blue-600 font-bold text-3xl'>Create An Account Form</h3>
                        <label htmlFor="firstName">First Name</label>
                        <input {...formik.getFieldProps('firstName')} className='w-full border-2 rounded-md p-2 h-12 my-2' type="text" id='firstName' name='firstName' placeholder='First Name' />
                        <small className='text-red-500'>{formik.touched.firstName && formik.errors.firstName}</small><br />
                        <label htmlFor="lastName">Last Name</label>
                        <input {...formik.getFieldProps('lastName')} className='w-full border-2 rounded-md p-2 h-12 my-2' id='lastName' name='lastName' type="text" placeholder='Last Name' />
                        <small className='text-red-500'>{formik.touched.lastName && formik.errors.lastName}</small><br />
                        <label htmlFor="email">Email</label>
                        <input {...formik.getFieldProps('email')} className='w-full border-2 rounded-md p-2 h-12 my-2' id='email' name='email' type="text" placeholder='Email' />
                        <small className='text-red-500'>{formik.touched.email && formik.errors.email}</small><br />
                        <label htmlFor="password">Password</label>
                        <input {...formik.getFieldProps('password')} className='w-full border-2 rounded-md p-2 h-12 my-2' id='password' name='password' type="password" placeholder='Password' />
                        <small className='text-red-500'>{formik.touched.password && formik.errors.password}</small><br />
                        <div className="p-2 flex justify-center">
                        <FormControl className='w-full border-2 rounded-md my-4' sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="class-label" className='z-10 bg-white'>Class</InputLabel>
                            <Select
                                value={studentClass}                                
                                labelId="class-label"
                                name="clas"
                                id="clas"
                                onChange={(e) => {
                                    handleClassChange(e);
                                    formik.handleChange(e);
                                }}
                                displayEmpty
                                required
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>JSS 1</MenuItem>
                                <MenuItem value={1}>JSS 2</MenuItem>
                                <MenuItem value={2}>JSS 3</MenuItem>
                                <MenuItem value={3}>SSS 1</MenuItem>
                                <MenuItem value={4}>SSS 2</MenuItem>
                                <MenuItem value={5}>SSS 3</MenuItem>

                            </Select>
                        </FormControl>
                        </div>
                        <FormControl className='w-full border border-black rounded-md p-2 my-5' >
                            <InputLabel id="subjects-label"  className='z-10 bg-white'>Subjects</InputLabel>
                            <Select
                                labelId="subjects-label"
                                id="subjects"
                                name='subjects'
                                error={false}
                                onError={(e)=>console.log(e, 'error')}
                                multiple
                                value={selectedSubjects}
                                onChange={(e) => {
                                    handleSelectSubjects(e);
                                    formik.handleChange(e);
                                }}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={subjects[value]} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {subjects.map((subject, index) => (
                                    <MenuItem
                                        key={subject}
                                        value={index}
                                        style={getStyles(subject, selectedSubjects, theme)}
                                    >
                                        {subject}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <label htmlFor='address'>Address</label>
                        <input type='text' className='w-full border-2 rounded-md p-2 h-12' {...formik.getFieldProps('address')} placeholder='Address' id='address' name='address' />
                        <small className='text-red-500'>{formik.touched.address && formik.errors.address}</small><br />
                        <label htmlFor='localGovernment'>Local Goverment</label>
                        <input type='text' className='w-full border-2 rounded-md p-2 h-12' {...formik.getFieldProps('localGovernment')} placeholder='Local Goverment' id='localGovernment' name='localGovernment' />
                        <small className='text-red-500'>{formik.touched.localGovernment && formik.errors.localGovernment}</small><br />
                        <label htmlFor='state'>State</label>
                        <input type='text' className='w-full border-2 rounded-md p-2 h-12' {...formik.getFieldProps('state')} placeholder='State' id='state' name='state' />
                        <small className='text-red-500'>{formik.touched.state && formik.errors.state}</small><br />
                        <div style={{ aspectRatio: '1' }} className='w-3/6 mx-auto rounded-lg overflow-hidden bg-black opacity-3/6 my-2 flex justify-center items-center'>
                            {imageBase64 ? <img src={imageBase64} className='w-full h-full' alt="" /> : <h3 className='text-white'>Profile Picture</h3>}
                        </div>
                        <input type="file" accept={fileType} onChange={(e) => selectImage(e)} name="pictureUrl" className='w-full file:mr-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 rounded-md p-2 h-12' id="" />
                        <button type='submit' className='w-full rounded-3xl block my-2 text-center p-2 bg-blue-500' disabled={signingUp ? true : false}>{signingUp ? 'Signing Up' : 'Sign Up'}</button>
                        <p>Already have an account? <Link className='inline text-blue-700' to='/student/signin'>Sign In</Link></p>
                    </form>
                </div>
                <div className="basis-3/5 rounded-5 relative">
                    <img src="/teachers/gallary6.jpg" className='w-full h-auto sticky top-10' alt="" />
                    <span className=' absolute top-0 right-0 m-2 px-3 py-2 rounded-3xl bg-blue-600 text-white'><Link to='/stduent/signin'>Sign In</Link></span>
                </div>
            </div>
            <LandingPageFooter />
            <MessageSchool />
        </>
    )
}

export default SignUpPage