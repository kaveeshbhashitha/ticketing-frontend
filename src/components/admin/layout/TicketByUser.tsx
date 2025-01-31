import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserById } from "../../../service/UserService"; // Assuming you have this function

const TicketsByUser: React.FC = () => {
  const [userTicketData, setUserTicketData] = useState<Map<string, number>>(new Map()); // To store user and their ticket count
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map()); // To store the mapping of userId to username
  const token = sessionStorage.getItem("token");

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const API_URL_1 = "https://ticketing-backend-production-088a.up.railway.app/api/reservation/getAllReservations";
  const API_URL_2 = "http://localhost:8080/api/reservation/getAllReservations";

  // Helper function to attempt requests on both APIs
  const requestWithFallback = async (apiUrl: string) => {
    try {
      const response = await axios.get(apiUrl, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`API request failed for ${apiUrl}: ${(error as Error).message}`);
      throw error; // Re-throw to fallback
    }
  };

  useEffect(() => {
    // Fetch reservation data (e.g., number of reservations by user)
    requestWithFallback(API_URL_1)
      .then((data) => {
        if (data && Array.isArray(data)) {
          const userTicketMap = new Map<string, number>();

          // Group the ticket counts by userId
          data.forEach((item: any) => {
            const { userId, numOfTickets } = item;
            if (userTicketMap.has(userId)) {
              userTicketMap.set(userId, userTicketMap.get(userId)! + numOfTickets);
            } else {
              userTicketMap.set(userId, numOfTickets);
            }
          });

          setUserTicketData(userTicketMap);

          // Fetch the usernames based on userId
          const userIds = Array.from(userTicketMap.keys());
          userIds.forEach((userId) => {
            getUserById(userId) // Assuming this function fetches user details
              .then((user) => {
                setUsernames((prev) => new Map(prev).set(userId, user.username)); // Store username in the map
              })
              .catch((error) => {
                console.error(`Error fetching user info for ${userId}:`, error);
              });
          });
        }
      })
      .catch(() => {
        console.error("Failed to fetch from the first API, attempting to fetch from the second API.");
        requestWithFallback(API_URL_2)
          .then((data) => {
            if (data && Array.isArray(data)) {
              const userTicketMap = new Map<string, number>();

              data.forEach((item: any) => {
                const { userId, numOfTickets } = item;
                if (userTicketMap.has(userId)) {
                  userTicketMap.set(userId, userTicketMap.get(userId)! + numOfTickets);
                } else {
                  userTicketMap.set(userId, numOfTickets);
                }
              });

              setUserTicketData(userTicketMap);

              // Fetch the usernames based on userId
              const userIds = Array.from(userTicketMap.keys());
              userIds.forEach((userId) => {
                getUserById(userId)
                  .then((user) => {
                    setUsernames((prev) => new Map(prev).set(userId, user.firstName + " " + user.lastName)); // Store username
                  })
                  .catch((error) => {
                    console.error(`Error fetching user info for ${userId}:`, error);
                  });
              });
            }
          })
          .catch((error) => {
            console.error("Both API requests failed:", error);
          });
      });
  }, [token]);

  return (
    <div className="card-body">
      <h5 className="card-title text-primary">Tickets Reserved by Users</h5>
      <div className="mb-4">
        <ul>
          {Array.from(userTicketData.entries()).map(([userId, ticketCount], index) => {
            const username = usernames.get(userId) || userId; // Fallback to userId if username is not found
            return (
                <li key={index} className="d-flex justify-content-between">
                <strong className="text-primary">{username}</strong>
                <span>{ticketCount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TicketsByUser;
