import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import { deleteUser, getAllUsers } from "../../../service/UserService";
import useAuthCheck from "../../../useAuthCheck";
import { User } from "../../../interfaces/User";
import ComponentDasboard from "../../layout/ComponetDashboard";


const SeeUsers: React.FC = () => {
  useAuthCheck(['ADMIN']);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); 
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users
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
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const searchedUsers = users.filter((user) =>
      user.firstName.toLowerCase().includes(lowerCaseQuery) ||
      user.lastName.toLowerCase().includes(lowerCaseQuery)
    );
    applyDateFilter(startDate, endDate, searchedUsers);
  };

  const applyDateFilter = (start: string, end: string, list: User[] = users) => {
    let filtered = list;

    if (start) {
      filtered = filtered.filter((user) => new Date(user.dateRegistered) >= new Date(start));
    }
    if (end) {
      filtered = filtered.filter((user) => new Date(user.dateRegistered) <= new Date(end));
    }
    setFilteredUsers(filtered);
  };

  const handleDateFilter = () => {
    applyDateFilter(startDate, endDate);
  };

  return (
    <><div className="layout-wrapper layout-content-navbar">
      <ComponentDasboard />
      <div className="layout-container">
        <SideBar />

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 my-1">
              <span className="text-muted fw-light">Users /</span> All Users
            </h4>

            <div>
              {error && (
                <div className="alert alert-warning d-flex justify-content-between">
                  {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
                </div>
              )}
              {loading && <p>Loading...</p>}
              {!loading && !error && (
                <>
                  {/* Filter Controls */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <input
                      type="text"
                      className="form-control w-50 me-2"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)} />
                    <div className="d-flex align-items-center">
                      <input
                        type="date"
                        className="form-control me-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} />
                      <input
                        type="date"
                        className="form-control me-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} />
                      <button className="btn btn-primary" onClick={handleDateFilter}>
                        Filter
                      </button>
                    </div>
                  </div>

                  {/* User Table */}
                  {filteredUsers.length > 0 ? (
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
                          {filteredUsers.map((user) => (
                            <tr key={user.userId}>
                              <td><abbr title={user.userId}>#</abbr></td>
                              <td>{user.userEmail}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.userRole}</td>
                              <td>{user.dateRegistered}</td>
                              <td>{user.timeRegistered}</td>
                              <td className="text-center">
                                <button
                                  onClick={() => handleDelete(user.userId)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No users found.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default SeeUsers;