import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import { deleteUser, getAllUsers } from "../../../service/UserService";
import useAuthCheck from "../../../useAuthCheck";

interface User {
  userId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  password: string;
  userRole: string;
  dateRegistered: string;
  timeRegistered: string;
}

const SeeUsers: React.FC = () => {
  useAuthCheck(['Admin']);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); 
          setUsers(data); 
          setLoading(false);
      } catch (error) {
          setError("Failed to fetch user data. Please try again later.");
          setLoading(false);
          console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
        const confirmResponse = window.confirm("Are you sure you want to delete this record?");
        if (confirmResponse) {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
        }
    } catch (error) {
        console.error("Failed to delete user:", error);
    }
  };
  

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 my-1">
              <span className="text-muted fw-light">Events /</span> All Users
            </h4>
            <div>
              {error && (
                <div className="alert alert-warning d-flex justify-content-between">
                  {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
                </div>
              )}
              {loading && <p>Loading...</p>}
              {!loading && !error && users.length > 0 && (
                <div className="table-container">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Role</th>
                        <th>Date Registered</th>
                        <th>Time Registered</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.userId}>
                            <td><abbr title={user.userId}>#</abbr></td>
                            <td>{user.userEmail}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.userRole}</td>
                            <td>{user.dateRegistered}</td>
                            <td>{user.timeRegistered}</td>
                            <td className="text-center">
                                <button onClick={() => handleDelete(user.userId)} className="btn btn-outline-secondary btn-sm">
                                        <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && users.length === 0 && (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeUsers;
