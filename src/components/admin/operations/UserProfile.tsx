import React, { useEffect, useState } from "react";
import Header from "../../layout/Header";
import EventAbout from "../../content/Events/EventAbout";
import Footer from "../../layout/Footer";
import Chatbot from "../../chatbot/Chatbot";
import useAuthCheck from "../../../useAuthCheck";
import { User } from "../../../interfaces/User";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUserByEmail, updateUser } from "../../../service/UserService";
import { logout } from "../../../service/AuthService";
import { Event } from "../../../interfaces/Event";
import { getEventsByUserId } from "../../../service/EventService";

const UserProfile: React.FC = () => {
  useAuthCheck(["User", "Admin"]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = sessionStorage.getItem("user"); 
        if (!userEmail) throw new Error("User email not found");

        const data = await getUserByEmail(userEmail);
        const event = await getEventsByUserId(data.userId);

        setUserData(data);
        setEvents(event);
        console.log(events);

      } catch {
        setError("Failed to fetch user data. Please try again later.");

      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (!userData) return;
    try {
      await updateUser(userData.userId, userData);
      logout();
      navigate("/");
    } catch {
      setError("Failed to update user profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!userData) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await deleteUser(userData.userId);
        logout();
        navigate("/");
      } catch{
        setError("Failed to delete account. Please try again later.");
      }
    }
  };

  if (loading) return <p>Loading user data...</p>;

  return (
    <div>
      <Header/>
      <EventAbout/>
      <div className="container mt-3">
        <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                      <div className="mt-3">
                        <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
                        <p className="text-muted font-size-sm">{`${userData?.userEmail} | ${userData?.userRole}`}</p>
                        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete My Account</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-3">
                  <h5 className="btn btn-outline-primary m-2">My Recent Activities</h5>
                  <ul className="list-group list-group-flush">
                    {events?.map((event) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" key={event.eventId}>
                      <h6 className="mb-0"><img
                        src={`data:${event.contentType};base64,${event.imageData}`}
                        alt="Event"
                        className="tableimg"
                      /> <span className="mx-3">{event.eventType}</span></h6>
                      <span className="text-secondary"><a href={`http://localhost:5173/AllEvents`}>Go to event</a></span>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">First Name</h6>
                      </div>
                      <input className="col-sm-9 text-secondary border-0" value={userData?.firstName}/>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Last Name</h6>
                      </div>
                      <input className="col-sm-9 text-secondary border-0" value={userData?.lastName}/>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <input className="col-sm-9 text-secondary border-0" value={userData?.userEmail}/>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">User Role</h6>
                      </div>
                      <input className="col-sm-9 text-secondary border-0" value={userData?.userRole} disabled/>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Timestamp</h6>
                      </div>
                      <input className="col-sm-9 text-secondary border-0" value={`You have Registered on: ${userData?.dateRegistered} and at: ${userData?.timeRegistered}`} disabled/>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="btn btn-outline-dark" onClick={handleUpdate}>Edit My Profile</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row gutters-sm">
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                        <small>Web Design</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                          <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Website Markup</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>One Page</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Mobile Template</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Backend API</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                        <small>Web Design</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Website Markup</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>One Page</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Mobile Template</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small>Backend API</small>
                        <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
          </div>
        </div>
      </div>
      <Chatbot/>
      <Footer/>
    </div>
  );
};

export default UserProfile;
