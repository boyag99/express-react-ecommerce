import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComponent = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForSignIn'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForSignIn');
                
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                
                console.log(user, idTokenResult);

                history.push('/');
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control"
                value={email} 
                readOnly />
            
            <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoFocus />

            <button 
                type="submit" 
                className="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );
    
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
        
    );

}

export default RegisterComponent;