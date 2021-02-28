import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {

    const [email, setEmail] = useState('');
    let { user } = useSelector((state) => ({...state}));

    useEffect(() => {

        if (user && user.token) {
            history.push('/');
        }

    }, [history, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
        };
        
        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
        
        window.localStorage.setItem('emailForSignIn', email);
        setEmail('');
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                autoFocus />

            <button 
                type="submit" 
                className="btn btn-raised">
                Register / {email}
            </button>
        </form>
    );
    
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
        
    );

}

export default Register;