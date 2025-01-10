import React, { useEffect, useState } from "react";
import SideBar from "../layout/SideBar";
import useAuthCheck from "../../../useAuthCheck";
import type { Reservation } from "../../../interfaces/Reservation";
import { deleteReservation, getAllReservations } from "../../../service/ReservationService";

const Reservation: React.FC = () => {
  useAuthCheck(["Admin"]);
  const [reservations, setReservationData] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservationData(data);
        setFilteredReservations(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch reservation data. Please try again later.");
        setLoading(false);
        console.error(error);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const confirmResponse = window.confirm("Are you sure you want to delete this record?");
      if (confirmResponse) {
        await deleteReservation(id);
        setReservationData((prev) => prev.filter((res) => res.reservationId !== id));
        setFilteredReservations((prev) => prev.filter((res) => res.reservationId !== id));
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    }
  };

  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
    const now = new Date();
  
    let filtered = [...reservations];
    if (filterType === "thisWeek") {
      // Calculate the start of the week (Monday)
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1); // Monday
      filtered = reservations.filter((res) => {
        const resDate = new Date(res.reservationDate);
        return resDate >= startOfWeek && resDate <= now;
      });
    } else if (filterType === "thisMonth") {
      // Calculate the start of the month
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = reservations.filter((res) => {
        const resDate = new Date(res.reservationDate);
        return resDate >= startOfMonth && resDate <= now;
      });
    } else if (filterType === "thisYear") {
      // Calculate the start of the year
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      filtered = reservations.filter((res) => {
        const resDate = new Date(res.reservationDate);
        return resDate >= startOfYear && resDate <= now;
      });
    } else {
      // "All" filter
      filtered = [...reservations];
    }
  
    setFilteredReservations(filtered);
  };
  

  const totalTickets = filteredReservations.reduce((total, res) => total + res.numOfTickets, 0);
  const totalIncome = filteredReservations.reduce((total, res) => total + res.totalCharge, 0);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 my-1">
              <span className="text-muted fw-light">User /</span> All Reservations
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
                  {/* Filters */}
                  <div className="filters mb-3 d-flex justify-content-between">
                    <div>
                        <button className="btn btn-outline-primary me-2" onClick={() => handleFilterChange("thisWeek")}>
                        This Week
                        </button>
                        <button className="btn btn-outline-primary me-2" onClick={() => handleFilterChange("thisMonth")}>
                        This Month
                        </button>
                        <button className="btn btn-outline-primary me-2" onClick={() => handleFilterChange("thisYear")}>
                        This Year
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => handleFilterChange("all")}>
                        All
                        </button>
                    </div>
                    <div>
                        <div className="btn btn-outline-dark mx-2 disabled">Total Tickets: {totalTickets}</div>
                        <div className="btn btn-outline-dark disabled">Total Income: Rs.{totalIncome.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="table-container">
                    {filteredReservations.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Res. ID</th>
                            <th>User ID</th>
                            <th>Event ID</th>
                            <th># Tickets</th>
                            <th>Per Ticket</th>
                            <th>Total</th>
                            <th>Date reserved</th>
                            <th>Time reserved</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReservations.map((res) => (
                            <tr key={res.reservationId}>
                              <td className="text-center">
                                <abbr title={res.reservationId}>#</abbr>
                              </td>
                              <td className="text-center">
                                <abbr title={res.userId}>
                                  <i className="fa-regular fa-circle-user"></i>
                                </abbr>
                              </td>
                              <td className="text-center">
                                <abbr title={res.eventId}>
                                  <i className="fa-regular fa-calendar-check"></i>
                                </abbr>
                              </td>
                              <td className="text-center">{res.numOfTickets}</td>
                              <td>{res.perTicketCharge}</td>
                              <td>{res.totalCharge}</td>
                              <td>{res.reservationDate}</td>
                              <td>{res.reservationTime}</td>
                              <td>{res.status}</td>
                              <td className="text-center">
                                <button
                                  onClick={() => handleDelete(res.reservationId)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No reservations found for the selected filter.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
