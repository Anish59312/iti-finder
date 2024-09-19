import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

// District-City Mapping (for form dropdowns)
const districtCityMapping = {
  'DistA': ['City1', 'City2', 'City3'],
  'DistB': ['City4', 'City5'],
  'DistC': ['City6', 'City7', 'City8', 'City9']
};

const FormPage = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '', // This should eventually be a valid ObjectId from the user database
    age: '',
    contactNo: '',
    district: '',
    city: '',
    qualification: '',
  });

  const [cities, setCities] = useState([]); // For dynamically showing cities based on district

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle district change to update the city options
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({
      ...formData,
      district: district,
      city: '' // Reset city when district changes
    });
    setCities(districtCityMapping[district] || []);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/user_info/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' 
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/interest')
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Inline styles
  const formStyle = {
    backgroundColor: 'white',
    color: 'blue',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'left'
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px'
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>User Information Form</h2>
      
      {/* Age Input */}
      <div>
        <label style={labelStyle}>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </div>

      {/* Contact Number Input */}
      <div>
        <label style={labelStyle}>Contact Number:</label>
        <input
          type="tel"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </div>

      {/* District Dropdown */}
      <div>
        <label style={labelStyle}>District:</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleDistrictChange}
          required
          style={inputStyle}
        >
          <option value="">Select District</option>
          {Object.keys(districtCityMapping).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown (Dependent on District) */}
      <div>
        <label style={labelStyle}>City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          style={inputStyle}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Qualification Dropdown */}
      <div>
        <label style={labelStyle}>Qualification:</label>
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          required
          style={inputStyle}
        >
          <option value="">Select Qualification</option>
          <option value="10th fail">10th Fail</option>
          <option value="10th pass">10th Pass</option>
          <option value="12th pass">12th Pass</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </div>
    </form>
  );
};

export default FormPage;
