import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();

    const handleEmailLogin = async () => {
        setLoading(true);

        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  email: user.email,
                  token: idTokenResult.token
                }
              });

            toast.success('Login with Email Successfully');
            
            setTimeout(() => {

                history.push('/');
            }, 1500);


        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                setLoading(true);
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                    email: user.email,
                    token: idTokenResult.token
                    }
                });

                toast.success('Login with Google Successfully');
                
                setTimeout(() => {

                    history.push('/');
                }, 1500);
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
    }

    const loginForm = () => (
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
                <input 
                    type="password" 
                    className="form-control" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" />
            </div>

            <div className="form-group">
                <Button 
                    type="primary" 
                    className="mb-3" 
                    block 
                    shape="round" 
                    icon={<MailOutlined />} 
                    size="large" 
                    loading={loading}
                    disabled={!email || password.length < 6}
                    onClick={handleEmailLogin}>
                    Login with Email/Password
                </Button>
                <Button 
                        type="danger" 
                        className="mb-3" 
                        block 
                        shape="round" 
                        icon={<GoogleOutlined />} 
                        size="large" 
                        loading={loading}
                        onClick={handleGoogleLogin}>
                    Login with Google
                </Button>
            </div>
        </form>
    );
    
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
   
                </div>
            </div>
        </div>
        
    );

}

export default Login;