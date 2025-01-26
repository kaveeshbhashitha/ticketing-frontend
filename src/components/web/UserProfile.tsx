import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import EventAbout from "../content/Events/EventAbout";
import Footer from "../layout/Footer";
import Chatbot from "../chatbot/Chatbot";
import useAuthCheck from "../../useAuthCheck";
import { User } from "../../interfaces/User";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUserByEmail, updateUser } from "../../service/UserService";
import { logout } from "../../service/AuthService";
import { Event } from "../../interfaces/Event";
import { getEventsByUserId } from "../../service/EventService";
import PieChart from "../charts/PieChart";
import { LineChart } from "../charts/LineChart";


const UserProfile: React.FC = () => {
  useAuthCheck(["USER", "ADMIN"]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    userId: userData?.userId || "",
    userEmail: userData?.userEmail || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    password: "",
    userRole: userData?.userRole || "",
    dateRegistered: userData?.dateRegistered || "",
    timeRegistered: userData?.timeRegistered || "",
    profileImage: userData?.profileImage || ""
  });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userEmail = sessionStorage.getItem("user"); 
      if (!userEmail) throw new Error("User email not found");

      const data = await getUserByEmail(userEmail);
      const event: Event[] = await getEventsByUserId(data.userId) as Event[];

      setFormData(data);
      setUserData(data);
      setEvents(event);
      //console.log(data);

    } catch {
      setError("Failed to fetch user data. Please try again later.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async () => {
    if (!userData) return;
    const confirmDelete = window.prompt("Are you sure you want to delete your account? Please enter your Email to perform delete");
    if (confirmDelete === userData.userEmail) {
      try {
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if (confirm) {
          await deleteUser(userData.userId);
          
          const response = await logout();
          if (response) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            navigate('/login');
          }
        }
      } catch{
        setError("Failed to delete account. Please try again later.");
      }
    }
    else {
      alert("Email does not match. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      if (userData?.userId) {
        const updatedUserId = await updateUser(userData.userId, formData);
        console.log(userData.userId, userData);
        console.log("User updated successfully with userId:", updatedUserId);
      }
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setIsEditing(false);
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
                        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete My Account</button>
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
                      <span className="text-secondary"> <Link to={`/event/${event.eventId}`} className="mx-2">Go to event</Link></span>
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
                      <input
                        className="col-sm-9 text-secondary border-0"
                        name="firstName"
                        value={formData?.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Last Name</h6>
                      </div>
                      <input
                        className="col-sm-9 text-secondary border-0"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <input
                        className="col-sm-9 text-secondary border-0"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">User Role</h6>
                      </div>
                      <input
                        className="col-sm-9 text-secondary border-0"
                        name="userRole"
                        value={formData.userRole}
                        disabled
                      />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Timestamp</h6>
                      </div>
                      <input
                        className="col-sm-9 text-secondary border-0"
                        value={`You have registered on: ${userData?.dateRegistered ?? ''} and at: ${userData?.timeRegistered ?? ''}`}
                        disabled
                      />
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        {!isEditing ? (
                          <button className="btn btn-outline-dark btn-sm" onClick={handleEdit}>
                            Edit My Profile
                          </button>
                        ) : (
                          <>
                            <button className="btn btn-outline-primary btn-sm" onClick={handleSave}>
                              Save Changes
                            </button>
                            <button
                              className="btn btn-outline-secondary ms-2 btn-sm"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row gutters-sm">
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        {userData && <LineChart userId={userData.userId}/>}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="d-flex">
                      <div className="card-body">
                        {userData?.userId && <PieChart userId={userData.userId} />}
                      </div>
                      <div className="p-5">
                        <h5>Ticket Reservation</h5>
                        <p>My Ticket Count</p>
                        <p>Frequency distribution of purcheses</p>
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
