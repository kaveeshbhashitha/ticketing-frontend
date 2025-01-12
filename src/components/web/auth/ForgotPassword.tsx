import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Chatbot from '../../chatbot/Chatbot';
import EventAbout from '../../content/Events/EventAbout';
import { passwordRecovery } from '../../../service/AuthService';

const ForgotPassword:React.FC = () => {
    const [userEmail, setEmail] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [, setRes] = useState<number | null>(null);
    const [code, setCode] = useState<number | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSendEmail = async () => {
        setStatus('');
        setError('');

        if (!userEmail.trim()) {
            setError('Please enter your email.');
            return;
        }

        try {
            const response = await passwordRecovery(userEmail);

            setRes(response.status);
            setCode(response.data);
            setStatus('Recovery code sent successfully! Please check your email.');
            setIsCodeSent(true);
        } catch {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleUserEnterCode = () => {
        if (String(code) === String(userInput)) {
            navigate(`/updatePassword/${userEmail}`);
        } else {
            setStatus('');
            setError('Your entered code is incorrect.');
        }
    };

    return (
        <div>
            <Header/>
            <EventAbout/>
            <div className="container my-5">
                <div className="row justify-content-center" style={{margin:"150px 0"}}>
                    <div className="col-md-6">
                        <div className="card shadow">
                            {!isCodeSent ? (
                                <div className="card-header text-center text-white" style={{backgroundColor:"#f82249"}}>
                                <h4 className='my-3 text-white'>Password Recovery</h4>
                                <p className="mb-0">Follow the steps to recover your account</p>
                            </div>
                            ) : (
                                <div className="card-header text-center bg-primary text-white">
                                <h4 className='my-3 text-white'>Password Recovery</h4>
                                <p className="mb-0">Follow the steps to recover your account</p>
                            </div>
                            )}
                            <div className="card-body">
                                {!isCodeSent ? (
                                    <>
                                        <div className="form-group my-4">
                                            <label htmlFor="userEmail my-3">Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="userEmail"
                                                placeholder="Enter your registered email"
                                                value={userEmail}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            style={{backgroundColor:"#f82249"}}
                                            className="btn w-100 text-white"
                                            onClick={handleSendEmail}
                                        >
                                            Send Recovery Code
                                        </button>
                                        <div className="mt-3 text-muted">
                                            <small>
                                                Please ensure you enter the email used during registration.
                                            </small>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group my-4">
                                            <label htmlFor="userInput">Recovery Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userInput"
                                                placeholder="Enter the recovery code sent to your email"
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={handleUserEnterCode}
                                        >
                                            Verify Code and Continue
                                        </button>
                                        <button
                                            className="btn btn-link text-muted w-100 mt-2"
                                            onClick={() => setIsCodeSent(false)}
                                        >
                                            Go Back to Email Step
                                        </button>
                                    </>
                                )}

                                {status && (
                                    <div className="alert alert-success mt-3">
                                        {status}
                                    </div>
                                )}
                                {error && (
                                    <div className="alert alert-danger mt-3">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Chatbot/>
            <Footer/>
        </div>
    );
}
export default ForgotPassword;
