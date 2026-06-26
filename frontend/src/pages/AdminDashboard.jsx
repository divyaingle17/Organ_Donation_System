import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole !== "admin") {
      toast.error("You must be logged in as admin");
      navigate("/admin/login");
      return;
    }

    fetchDonors();
    fetchRequests();
  }, [navigate]);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/donors");
      setDonors(res.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Error fetching donors");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/recipients");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Error fetching requests");
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/recipients/${requestId}`, {
        status: newStatus,
      });
      toast.success("Request status updated!");
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };


  return (
    <div className="admin-dashboard">

      {/* Donors Table */}
      <section className="section">
        <h2>All Donors</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organ</th>
              <th>Blood Group</th>
              <th>Age</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id}>
                <td>{donor.name}</td>
                <td>{donor.email}</td>
                <td>{donor.phone}</td>
                <td>{donor.organ}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.age}</td>
                <td>{donor.availability ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Organ Requests Table */}
      <section className="section">
        <h2>Organ Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Organ</th>
              <th>Blood Group</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.requiredOrgan}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.urgencyLevel}</td>
                <td>{req.status}</td>
                <td>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req._id, e.target.value)}
                    disabled={req.status === "Matched"}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Matched">Matched</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Inline CSS */}
      <style>{`
        .admin-dashboard {
          max-width: 1200px;
          margin: 40px auto;
          font-family: Arial, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        h1 {
          color: #16a34a;
        }

        .logout-btn {
          padding: 8px 16px;
          background-color: #dc2626;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .logout-btn:hover {
          background-color: #b91c1c;
        }

        .section {
          margin-bottom: 50px;
        }

        h2 {
          margin-bottom: 15px;
          color: #1f2937;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        th, td {
          padding: 10px;
          border: 1px solid #ccc;
          text-align: center;
        }

        th {
          background-color: #16a34a;
          color: white;
        }

        tr:nth-child(even) {
          background-color: #f3f4f6;
        }

        select {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }

          th {
            text-align: left;
          }

          td {
            text-align: right;
            padding-left: 50%;
            position: relative;
          }

          td::before {
            content: attr(data-label);
            position: absolute;
            left: 10px;
            text-align: left;
            font-weight: bold;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
