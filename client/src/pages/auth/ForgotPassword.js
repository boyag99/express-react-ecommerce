import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

const ForgotPaswords = ({ history }) => {

        const [email, setEmail] = useState('');
        const [loading, setLoading] = useState(false);

        const handleSubmit = async () => {
            setLoading(true);

            const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be in the authorized domains list in the Firebase Console.
                url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
                // This must be true.
                handleCodeInApp: true,
            };

            await auth.sendPasswordResetEmail(email, actionCodeSettings)
                    .then(() => {
                        setEmail('');
                        toast.success('Check your email for password reset link');
                        setLoading(false);
                    }).catch((error) => {
                        setLoading(false);
                        toast.error(error.message);
                        console.log(error);
                    });
        }

        return (
            <div className="container col-md-6 offset-md-3 p-5">
                <h4>Forgot Password</h4>
                <form>
                    <div className="form-group">
                        <input 
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoFocus />
                    </div>
                    <div className="form-group">
                        <Button 
                            className="btn btn-raised"
                            onClick={handleSubmit} 
                            disabled={!email}
                            loading={loading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
}

export default ForgotPaswords;