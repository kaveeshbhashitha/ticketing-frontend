import React, { useEffect, useState } from "react";
import { NotificationInt } from "../../../interfaces/NotificationInt";
import SideBar from "../layout/SideBar";
import { deleteNotification, getAllNotification } from "../../../service/NotificationService";

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationInt[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationInt[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationList = await getAllNotification();
        if (notificationList && notificationList.length > 0) {
          setNotifications(notificationList);
          setFilteredNotifications(notificationList); 
          setError("");
        } else {
          setError("No notifications found to display.");
        }
      } catch (error) {
        setError("Error fetching notifications.");
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update query state

    if (query.trim() === "") {
      // If the query is empty, reset to original list
      setFilteredNotifications(notifications);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = notifications.filter(
        (notification) =>
          (notification.name && notification.name.toLowerCase().includes(lowerCaseQuery)) ||
          (notification.toEmail && notification.toEmail.toLowerCase().includes(lowerCaseQuery)) ||
          (notification.subject && notification.subject.toLowerCase().includes(lowerCaseQuery))
      );

      setFilteredNotifications(filtered); // Update filtered list
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmResponse = window.confirm("Are you sure you want to delete this record?");
      if (confirmResponse) {
        await deleteNotification(id);
        setNotifications((prev) => prev.filter((res) => res.emailId !== id));
        setFilteredNotifications((prev) => prev.filter((res) => res.emailId !== id));
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SideBar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 my-1">
                <span className="text-muted fw-light">User /</span> Notifications
              </h4>
              <div>
                {error && (
                  <div className="alert alert-warning d-flex justify-content-between">
                    {error} <i className="fa-solid fa-circle-exclamation pt-1"></i>
                  </div>
                )}

                <div className="table-container">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Name, To Email, or Subject"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)} // Call search handler
                    />
                  </div>

                  {filteredNotifications.length > 0 ? (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Email ID</th>
                          <th>Name</th>
                          <th>To Email</th>
                          <th>Subject</th>
                          <th>Body</th>
                          <th>Status</th>
                          <th>Date Added</th>
                          <th>Time Added</th>
                          <th>Reply</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNotifications.map((notification) => (
                          <tr key={notification.emailId}>
                            <td><abbr title={notification.emailId}>#</abbr></td>
                            <td
                              className={
                                notification.name === "Automatic Reply" ? "text-primary" : "text-success"
                              }
                            >
                              {notification.name}
                            </td>
                            <td>
                              <a href={`mailto:${notification.toEmail}`}>
                                <i className="fa-solid fa-at"></i>
                              </a>
                            </td>
                            <td>{notification.subject}</td>
                            <td>{notification.body}</td>
                            <td>{notification.status}</td>
                            <td>{notification.dateAdded}</td>
                            <td>{notification.timeAdded}</td>
                            <td className="text-center">
                              <a
                                href={
                                  notification.name !== "Automatic Reply"
                                    ? `mailto:${notification.toEmail}`
                                    : ""
                                }
                              >
                                <i
                                  className={
                                    notification.name === "Automatic Reply"
                                      ? "text-danger fa-solid fa-reply"
                                      : "text-primary fa-solid fa-reply"
                                  }
                                ></i>
                              </a>
                            </td>
                            <td className="text-center">
                              <a onClick={() => handleDelete(notification.emailId)}>
                                <i className="fa-solid fa-trash"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      No notifications to display.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;