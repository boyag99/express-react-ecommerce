import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';

const Password = ({ history }) => {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({...state}));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!password || password.length < 6 || newPassword.length < 6) {
            toast.error('Please enter a password and password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            setLoading(false);
            return;
        }

        try {
            const credential = await firebase.auth.EmailAuthProvider.credential(user.email, password);
            await auth.currentUser.reauthenticateWithCredential(credential);
            await auth.currentUser.updatePassword(newPassword);
            
            setLoading(false);
            toast.success('Password updated successfully');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    const passwordUpdateForm = () => (
        <form>
            <div className="form-group">
                <input 
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your old password"
                    autoFocus />
            </div>
            <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input 
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                     />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                     />
            </div>
            <div className="form-group">
                <Button type="primary" loading={loading} onClick={handleSubmit} disabled={!password || newPassword.length < 6 || confirmPassword.length < 6}>
                    Submit
                </Button>
            </div>
        </form>
    );

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <h4>Password Update</h4>
                    {passwordUpdateForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password;