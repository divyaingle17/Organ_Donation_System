import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrganRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { organ, bloodGroup } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requiredOrgan: organ || "",
    bloodGroup: bloodGroup || "",
    urgencyLevel: "Medium",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/recipients", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Organ request submitted successfully!");
      navigate("/recipients");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Error submitting request.");
    }
  };

  return (
    <div className="request-page">
      <h1>Request Organ</h1>
      <form className="request-form" onSubmit={handleSubmit}>
        <label>
          Name*
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email*
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>


        <label>
          Phone*
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Required Organ*
          <input type="text" name="requiredOrgan" value={formData.requiredOrgan} onChange={handleChange} required />
        </label>

        <label>
          Blood Group*
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
        </label>

        <label>
          Urgency Level
          <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <button type="submit">Submit Request</button>
      </form>

      {/* Inline CSS */}
      <style>{`
        .request-page {
          max-width: 600px;
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

        .request-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          color: #333;
        }

        input, select {
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        button {
          padding: 12px;
          background-color: #16a34a;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        button:hover {
          background-color: #138d3a;
        }

        @media (max-width: 600px) {
          .request-page {
            margin: 20px;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrganRequestForm;
