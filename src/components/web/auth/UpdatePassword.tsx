import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import EventAbout from '../../content/Events/EventAbout';
import Chatbot from '../../chatbot/Chatbot';
import Footer from '../../layout/Footer';
import { updatePassword } from '../../../service/AuthService';

const UpdatePassword:React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { userEmail } = useParams<{ userEmail: string }>();
    const navigate = useNavigate();

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // Reset status and error messages
        setStatus('');
        setError('');
      
        // Basic validation
        if (!newPassword || !confirmPassword) {
          setError('Both fields are required.');
          return;
        }
      
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
      
        if (!userEmail) {
          setError('User email is missing.');
          return;
        }
      
        try {
          // Call the API to update the password
          const response = await updatePassword(userEmail, newPassword) as { status: number };
      
          if (response.status === 200) {
            setStatus('Password updated successfully! You can now log in with your new password.');
            setNewPassword('');
            setConfirmPassword('');
            navigate('/login');
          } else {
            setError('Unexpected response from the server.');
          }
        } catch (error) {
            setError(error + 'Failed to update password. Please try again later.');
          
        }
    };

    return (
        <div>
            <Header />
            <EventAbout />

            <div className="container mt-5">
                <div className="row justify-content-center" style={{margin:"150px 0"}}>
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-header text-center text-white" style={{backgroundColor:"#f82249"}}>
                                <h4 className="mt-3 text-white">Recover Your Password</h4>
                                <p className="mb-0">
                                    Don’t worry, we’ll help you get back into your account.
                                </p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handlePasswordUpdate}>
                                    <div className="form-group my-4">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <button type="submit" className="btn w-100 text-white" style={{backgroundColor:"#f82249"}}>
                                        Change Password
                                    </button>
                                </form>
                                {status && (
                                    <div className="alert alert-success mt-4 text-center">
                                        {status}
                                    </div>
                                )}
                                {error && (
                                    <div className="alert alert-danger mt-4 text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Chatbot />
            <Footer />
        </div>
    );
}
export default UpdatePassword;
