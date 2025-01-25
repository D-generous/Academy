import React, { useState, useEffect } from 'react';
import Notice from '../../src/Components/AdminComponents/NoticesAndNews/Notice';
import News from '../../src/Components/AdminComponents/NoticesAndNews/News';
import Form from '../../src/Components/AdminComponents/NoticesAndNews/Form';
import NavBar from '../../src/Components/AdminComponents/NavBar/NavBar';
import PopUp from '../../src/Components/PopUp';
import FetchAdminInfo from '../../src/CustomHooks/AdminHooks/FetchAdminInfo';
import FetchAllStudentsAndStaffs from '../../src/CustomHooks/AdminHooks/FetchAllStudentsAndStaffs';
import FetchNoticesAndNews from '../../src/CustomHooks/FetchNoticesAndNews';




const AdminNoticesAndNews = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [viewingIndex, setviewingIndex] = useState(0);
    const [adminInfo, fetching] = FetchAdminInfo(); 
    const [noticesAndNews] = FetchNoticesAndNews();

    const [isOpen, setIsOpen] = useState(false);

    const openPopup = (index = null) => {
        setIsOpen(true);
        index?setviewingIndex(index):''
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className=''>
                <NavBar/>
                <div className='flex'><button onClick={openPopup} className='bg-blue-500 p-2 my-2 rounded-md ms-auto me-4'>+ Create</button></div>
                <div className='container p-2 mx-auto'>
                    {noticesAndNews?.length>=1?
                    noticesAndNews.map((value)=>(
                        value.type=='news'?<News data={value}/>:<Notice data={value}/>
                    ))
                    :
                    <News data={{head: 'Empty', type: 'blog', body: 'No News Or Notice Here Yet'}}/>
                    }
                </div>
            </div>
            <PopUp isOpen={isOpen} onClose={closePopup}>
                <Form type='add' />
            </PopUp>
        </>
    );
}

export default AdminNoticesAndNews;
