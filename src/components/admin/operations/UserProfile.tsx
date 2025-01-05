// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import defaultImage from "../../../../public/assets/img/avatars/userlogo.png"; // Import the default image
// import { User } from "../../../interfaces/User";
// import { getUserByEmail } from "../../../service/UserService";

// interface UserProfileProps {
//   userId: string;
//   userEmail: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   userRole: string;
//   dateRegistered: string;
//   timeRegistered: string;
// }

// const UserProfile: React.FC= ()  => {

//   const [edituser, setEditUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [eror, setError] = useState("");

//   useEffect(() => {
//     fetchUserDetails();
//   }, [getUserByEmail]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`/api/users/${userId}`);
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (user) {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/api/users/${userId}`, {
//         ...user,
//         userRole: user?.userRole, // Ensure userRole is not updated
//       });
//       setIsEditing(false);
//       alert("User updated successfully");
//     } catch (error) {
//       console.error("Error updating user details:", error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileImage(e.target.files[0]);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!profileImage) return;
//     const formData = new FormData();
//     formData.append("file", profileImage);

//     try {
//       await axios.post(`/api/users/${userId}/upload-profile-image`, formData);
//       alert("Profile image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading profile image:", error);
//     }
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this profile?"
//     );
//     if (confirmed) {
//       try {
//         await axios.delete(`/api/users/${userId}`);
//         alert("Profile deleted successfully");
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         alert("Error deleting the profile.");
//       }
//     }
//   };

//   if (!user) return <p>Loading user details...</p>;

//   const profileImageSrc = user.profileImage || defaultImage; // Use default image if profile image doesn't exist
//   const fullName = `${user.firstName} ${user.lastName}` || "User's Full Name"; // Default name

//   return (
//     <div className="container mt-5">
//       <h4 className="mb-4">User Profile</h4>

//       <div className="d-flex">
//         {/* User Information container*/}
//         <div className="col-md-6">
//           <div
//             className="card p-4 me-3 shadow"
//             style={{ height: "fit-content" }}
//           >
//             <form>
//               <div className="mb-2">
//                 <label htmlFor="userId" className="form-label small">
//                   USER ID
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   name="userId"
//                   value={user.userId}
//                   onChange={handleChange}
//                   disabled
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="firstName" className="form-label small">
//                   FIRST NAME <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   name="firstName"
//                   value={user.firstName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="lastName" className="form-label small">
//                   LAST NAME <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   name="lastName"
//                   value={user.lastName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="password" className="form-label small">
//                   PASSWORD <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control bg-white"
//                   name="password"
//                   value={user.password}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="email" className="form-label small">
//                   EMAIL
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control bg-white"
//                   name="userEmail"
//                   value={user.userEmail}
//                   onChange={handleChange}
//                   disabled
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="userRole" className="form-label small">
//                   USER ROLE
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   value={user.userRole}
//                   disabled
//                 />
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="dateRegistered" className="form-label small">
//                   DATE REGISTERED
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   value={user.dateRegistered}
//                   disabled
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="timeRegistered" className="form-label small">
//                   TIME REGISTERED
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control bg-white"
//                   value={user.timeRegistered}
//                   disabled
//                 />
//               </div>

//               {isEditing ? (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-primary me-2"
//                     onClick={handleUpdate}
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary me-2"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel Edit
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={handleDelete}
//                   >
//                     Delete Profile
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     className="btn btn-secondary me-2"
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Edit Details
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={handleDelete}
//                   >
//                     Delete Profile
//                   </button>
//                 </>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* Profile Image Section */}
//         <div
//           className="col-md-5 ms-3 d-flex flex-column justify-content-between"
//           style={{ height: "fit-content" }}
//         >
//           <div className="card p-4 text-center mb-5" style={{ height: "auto" }}>
//             <div className="mb-4">
//               <img
//                 src={profileImageSrc}
//                 alt="Profile"
//                 className="rounded-circle"
//                 style={{ width: "150px", height: "150px", objectFit: "cover" }}
//               />
//             </div>
//             <h4 className="mb-1">{fullName}</h4>
//             <h5 className="text-muted">{user.userRole}</h5>
//           </div>

//           <div className="card p-4 shadow mb-5">
//             <h5 className="mb-4">Upload Profile Picture</h5>
//             <input
//               type="file"
//               className="form-control mb-3"
//               onChange={handleFileChange}
//               disabled={!isEditing}
//             />
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleImageUpload}
//               disabled={!isEditing}
//             >
//               Upload Image
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState } from "react";
import defaultImage from "../../../../public/assets/img/avatars/userlogo.png";

const UserProfile: React.FC = () => {
  const [error, setError] = useState();
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  // Default values for User Profile Image and Full name container
  const profileImageSrc = defaultImage;
  const fullName = "User Name";
  const userRole = "User Role";

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">User Profile</h4>

      <div className="d-flex">
        {/* User Information Section */}
        <div className="col-md-6">
          <div
            className="card p-4 me-3 shadow"
            style={{ height: "fit-content" }}
          >
            <form>
              <div className="mb-2">
                <label htmlFor="userId" className="form-label small">
                  USER ID
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="User_ID"
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="firstName" className="form-label small">
                  FIRST NAME <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="Username"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="lastName" className="form-label small">
                  LAST NAME <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="Lastname"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label small">
                  PASSWORD <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control bg-white"
                  placeholder="Passoword"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="form-label small">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="form-control bg-white"
                  placeholder="email@example.oom"
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="userRole" className="form-label small">
                  USER ROLE
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="User_role"
                  disabled
                />
              </div>

              <div className="mb-2">
                <label htmlFor="dateRegistered" className="form-label small">
                  DATE REGISTERED
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="YYYY-MM-DD"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label htmlFor="timeRegistered" className="form-label small">
                  TIME REGISTERED
                </label>
                <input
                  type="text"
                  className="form-control bg-white"
                  placeholder="00:00"
                  disabled
                />
              </div>

              {/* Buttons */}
              {isEditing ? (
                <>
                  <button type="button" className="btn btn-primary me-2">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleEditToggle}
                  >
                    Edit Details
                  </button>
                </>
              )}
              <button type="button" className="btn btn-danger">
                Delete Profile
              </button>
            </form>
          </div>
        </div>

        {/* Profile Image Section */}
        <div
          className="col-md-5 ms-3 d-flex flex-column justify-content-between"
          style={{ height: "fit-content" }}
        >
          <div
            className="card p-4 text-center mb-5 shadow"
            style={{ height: "auto" }}
          >
            <div className="mb-4">
              <img
                src={profileImageSrc}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <h4 className="mb-1">{fullName}</h4>
            <h5 className="text-muted">{userRole}</h5>
          </div>

          {/* Upload Image Section */}
          <div className="card p-4 shadow mb-5">
            <h5 className="mb-4">Upload Profile Picture</h5>
            <input
              type="file"
              className="form-control mb-3"
              disabled={!isEditing}
            />
            <button
              type="button"
              className="btn btn-primary"
              disabled={!isEditing}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
