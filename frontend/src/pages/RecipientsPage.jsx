import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RecipientsPage = () => {
  const [filters, setFilters] = useState({
    organ: "",
    bloodGroup: "",
    age: "",
  });

  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const navigate = useNavigate();

  // Fetch all donors on mount
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/donors");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast.error("Error fetching donors. Please try again.");
      }
    };
    fetchDonors();
  }, []);

  // Filter donors
  useEffect(() => {
    const filtered = donors.filter((donor) => {
      const matchesOrgan = filters.organ
        ? donor.organ.toLowerCase().includes(filters.organ.toLowerCase())
        : true;
      const matchesBlood = filters.bloodGroup
        ? donor.bloodGroup.toLowerCase().includes(filters.bloodGroup.toLowerCase())
        : true;
      const matchesAge = filters.age ? donor.age === Number(filters.age) : true;
      const isAvailable = donor.availability;

      return matchesOrgan && matchesBlood && matchesAge && isAvailable;
    });

    setFilteredDonors(filtered);
  }, [filters, donors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequest = (donor) => {
    // Redirect to request form with pre-filled organ & bloodGroup
    navigate("/request-organ", { state: { organ: donor.organ, bloodGroup: donor.bloodGroup } });
  };

  return (
    <div className="recipient-page">
      <h1>Search for Available Organs</h1>

      <div className="filters">
        <label>
          Organ:
          <input
            type="text"
            name="organ"
            value={filters.organ}
            onChange={handleChange}
            placeholder="e.g., Kidney"
          />
        </label>

        <label>
          Blood Group:
          <input
            type="text"
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleChange}
            placeholder="e.g., A+"
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={filters.age}
            onChange={handleChange}
            placeholder="e.g., 30"
          />
        </label>
      </div>

      <div className="results">
        {filteredDonors.length === 0 ? (
          <p>No matching donors found.</p>
        ) : (
          <ul>
            {filteredDonors.map((donor) => (
              <li key={donor._id}>
                <strong>{donor.name}</strong> - {donor.organ}, {donor.bloodGroup}, Age: {donor.age}, Phone: {donor.phone}
                <button className="request-btn" onClick={() => handleRequest(donor)}>
                  Request Organ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Inline CSS */}
      <style>{`
        .recipient-page {
          max-width: 700px;
          margin: 50px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          color: #16a34a;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #333;
          flex: 1;
          min-width: 150px;
        }

        input {
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .results ul {
          list-style: none;
          padding: 0;
        }

        .results li {
          background: white;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .request-btn {
          padding: 8px 15px;
          background-color: #16a34a;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .request-btn:hover {
          background-color: #138d3a;
        }

        @media (max-width: 600px) {
          .filters {
            flex-direction: column;
          }
          .results li {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipientsPage;
