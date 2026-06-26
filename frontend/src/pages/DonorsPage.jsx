import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

const DonorsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organ: "",
    bloodGroup: "",
    age: "",
    medicalHistory: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/api/donors", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Server Response:", response.data);
      toast.success("Form submitted successfully! 🎉");
  
      // Reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        organ: "",
        bloodGroup: "",
        age: "",
        medicalHistory: "",
        availability: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again!");
    }
  };
  

  return (
    <div className="donor-page">
      <h1>Organ Donation Form</h1>
      <form className="donor-form" onSubmit={handleSubmit}>
        <label>
          Name*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email*
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone*
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Organ to Donate*
          <input
            type="text"
            name="organ"
            value={formData.organ}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Blood Group*
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age*
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Medical History
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          Available for Donation
        </label>

        <button type="submit">Submit</button>
      </form>

      {/* Inline CSS */}
      <style>{`
        .donor-page {
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

        .donor-form {
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

        input, textarea {
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        .checkbox-label {
          flex-direction: row;
          align-items: center;
          gap: 10px;
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
          .donor-page {
            margin: 20px;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default DonorsPage;
