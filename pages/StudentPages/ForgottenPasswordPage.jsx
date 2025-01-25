import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LandingPageNav from '../../src/Components/LandingPageNav';
import SendLink from '../../src/Components/StudentComponents/ForgottenPassword/SendLink';
import SetNewPasswordForm from '../../src/Components/StudentComponents/ForgottenPassword/SetNewPassword';


const ForgottenPasswordPage = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    document.querySelector('title').innerText = 'Forgotton Password | Student'; 
    return (
        <div>
            <LandingPageNav/>
            <div className="h-screen flex justify-center items-center border-2">
                {token == null || undefined ? <SendLink /> : <SetNewPasswordForm token={token} />}
            </div>
        </div>
    );
}

export default ForgottenPasswordPage;
