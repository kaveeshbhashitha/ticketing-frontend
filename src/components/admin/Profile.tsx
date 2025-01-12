import React, { useEffect, useState } from "react";
import useAuthCheck from "../../useAuthCheck";
import { User } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  getUserByEmail,
  updateUser,
} from "../../service/UserService";
import { logout } from "../../service/AuthService";
import SideBar from "./layout/SideBar";

const Profile: React.FC = () => {
  useAuthCheck(["User", "Admin"]);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
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
    profileImage: userData?.profileImage || "",
  });

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userEmail = sessionStorage.getItem("user");
      if (!userEmail) throw new Error("User email not found");

      const data = await getUserByEmail(userEmail);

      setFormData(data);
      setUserData(data);
      //console.log(events);
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
    const confirmDelete = window.prompt(
      "Are you sure you want to delete your account? Please enter your Email to perform delete"
    );
    if (confirmDelete === userData.userEmail) {
      try {
        const confirm = window.confirm(
          "Are you sure you want to delete your account?"
        );
        if (confirm) {
          await deleteUser(userData.userId);

          const response = await logout();
          if (response) {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("role");
            navigate("/login");
          }
        }
      } catch {
        setError("Failed to delete account. Please try again later.");
      }
    } else {
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
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 my-1 mx-4">
              <span className="text-muted fw-light">User /</span> Admin Home
            </h4>
            <div className="container mt-3">
              <div className="main-body" style={{ margin: "20px 0" }}>
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card p-2">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Admin"
                            className="rounded-circle"
                            width="150"
                          />
                          <div className="mt-3">
                            <h4>{`${userData?.firstName} ${userData?.lastName}`}</h4>
                            <p className="text-muted font-size-sm mt-1">{`${userData?.userEmail} | ${userData?.userRole}`}</p>
                            <button
                              className="btn btn-outline-danger btn-sm mt-3"
                              onClick={handleDelete}
                            >
                              Delete My Account
                            </button>
                          </div>
                        </div>
                      </div>
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
                            value={`You have registered on: ${
                              userData?.dateRegistered ?? ""
                            } and at: ${userData?.timeRegistered ?? ""}`}
                            disabled
                          />
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-12">
                            {!isEditing ? (
                              <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={handleEdit}
                              >
                                Edit My Profile
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={handleSave}
                                >
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
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="alert alert-warning">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <div className="mt-3">
                            <h6 className="text-danger">
                              Since you are admin, make your to pass your
                              authorization to corresponding person before you
                              delete your account
                              <a
                                onClick={() =>
                                  alert(
                                    "You can contact your head or manger to more information..!"
                                  )
                                }
                                className="b-none bg-none"
                              >
                                <i className="fa-solid fa-arrow-up-right-from-square text-primary mx-2"></i>
                              </a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
