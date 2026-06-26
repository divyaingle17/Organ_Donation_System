import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/donors");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading)
    return <p className="loading-text">Loading donors...</p>;

  // if (donors.length === 0)
  //   return <p className="no-data-text">No donors found.</p>;

  return (
    <div className="donor-container">
      <div className="header-section">
        <h2 className="donor-title">💓 Available Donors</h2>
        <Link to="add-donor">
          <button className="add-btn">+ Add New Donor</button>
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="donor-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Organ</th>
              <th>Blood Group</th>
              <th>Age</th>
              <th>Medical History</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={donor._id}>
                <td>{index + 1}</td>
                <td>{donor.organ}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.age}</td>
                <td>{donor.medicalHistory || "N/A"}</td>
                <td
                  className={donor.availability ? "available" : "unavailable"}
                >
                  {donor.availability ? "Available" : "Unavailable"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline CSS */}
      <style>{`
        body {
          background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
          margin: 0;
        }

        .donor-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 24px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          font-family: 'Poppins', sans-serif;
          color: #333;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .donor-title {
          font-size: 26px;
          font-weight: 700;
          color: #1e40af;
          letter-spacing: 0.5px;
        }

        .add-btn {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: white;
          padding: 10px 20px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: linear-gradient(90deg, #1d4ed8, #1e3a8a);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
        }

        .donor-table {
          width: 100%;
          border-collapse: collapse;
          overflow: hidden;
          border-radius: 12px;
        }

        .donor-table thead {
          background: linear-gradient(90deg, #2563eb, #1e40af);
          color: white;
        }

        .donor-table th,
        .donor-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          font-size: 15px;
        }

        .donor-table tr {
          transition: background-color 0.2s ease;
        }

        .donor-table tr:hover {
          background-color: #f8fafc;
        }

        .available {
          color: #16a34a;
          font-weight: bold;
        }

        .unavailable {
          color: #dc2626;
          font-weight: bold;
        }

        .loading-text,
        .no-data-text {
          text-align: center;
          margin-top: 60px;
          font-size: 18px;
          color: #555;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .donor-container {
            margin: 20px;
            padding: 16px;
          }

          .donor-title {
            font-size: 22px;
          }

          .add-btn {
            width: 100%;
          }

          .donor-table th, .donor-table td {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}








