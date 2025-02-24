import React, { useState } from "react";
import { GiScales } from "react-icons/gi"; // Lawyer Icon
import { FaUser } from "react-icons/fa"; // User Icon
import "./ImageDisplay.css"; // Import CSS

const ImageDisplay = () => {
  const [flipped, setFlipped] = useState(null); // Track flipped card

  // Handle successful form submission
  const handleFormSubmit = () => {
    setFlipped(null); // Only close the card after successful submission
  };


  return (
    <div className="container">
      {/* Lawyer Card */}
      <div className="icon-wrapper" onClick={() => setFlipped(flipped === "lawyer" ? null : "lawyer")}>
        <div className={`card ${flipped === "lawyer" ? "flipped expanded" : ""}`}>
          <div className="icon dark card-front">
            <GiScales className="icon-style" />
          </div>
          <div className="card-back dark">
          <LawyerSignupForm 
            title="Lawyer Signup Form"  
            onSubmit={handleFormSubmit}
            />
          </div>
        </div>
        <p className="label">Lawyer</p>
      </div>

      {/* User Card */}
      <div className="icon-wrapper" onClick={() => setFlipped(flipped === "user" ? null : "user")}>
        <div className={`card ${flipped === "user" ? "flipped expanded" : ""}`}>
          <div className="icon light card-front">
            <FaUser className="icon-style" />
          </div>
          <div className="card-back light">
          <UserSignupForm 
            title="User Signup Form" 
            onSubmit={handleFormSubmit}
            />
          </div>
        </div>
        <p className="label">User</p>
      </div>
    </div>
  );
};

const LawyerSignupForm = ({ title, onSubmit }) => {
  const provinces = [
    "Western", "Central", "Eastern", "North Central", "Northern",
    "North Western", "Uva", "Sabaragamuwa", "Southern"
  ];

  const expertiseAreas = [
    "Family Law", "Criminal Law", "Corporate Law", "Environmental Law",
    "Health Law", "Property Law", "Immigration Law", "Administrative Law",
    "Constitutional Law", "Commercial Law", "International Law",
    "Intellectual Property Law"
  ];

  const experienceYears = Array.from({ length: 50 }, (_, i) => i + 1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    registrationNumber: '',
    address: '',
    contactNumber: '',
    email: '',
    password: '',
    yearsOfExperience: '',
    officeLocation: '',
    areasOfExpertise: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validation logic here
    if (!formData.areasOfExpertise.length) {
      alert("Please select at least one area of expertise");
      return;
    }
    
    console.log('Lawyer Form submitted:', formData);
    if (onSubmit) onSubmit();
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const newExpertise = [...formData.areasOfExpertise];
      if (e.target.checked) {
        newExpertise.push(value);
      } else {
        const index = newExpertise.indexOf(value);
        if (index > -1) newExpertise.splice(index, 1);
      }
      setFormData(prev => ({
        ...prev,
        areasOfExpertise: newExpertise
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form className="signup-form lawyer-form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
      <h2>{title}</h2>
      
      <div className="form-group">
      <input
          type="text"
          name="fullName"
          placeholder="Lawyer Fullname *"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
      <input
        type="text"
        name="registrationNumber"
        placeholder="Lawyer Registration Number *"
        value={formData.registrationNumber}
        onChange={handleChange}
        required
      />
      </div>

      <div className="form-group">
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address *"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          placeholder="Contact Number *"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail *"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="password"
        name="password"
        placeholder="Password *"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="repeatPassword"
        placeholder="Confirm Password *"
        value={formData.repeatPassword}
        onChange={handleChange}
        required
      />

      <div className="form-group">
        <select
          id="yearsOfExperience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
          style={{
            width: '90%',
            minWidth: '400px', 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <option value="">Please Select</option>
          {experienceYears.map(year => (
            <option key={year} value={year}>{year} year{year > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
      <select
        id="officeLocation"
        name="officeLocation"
        value={formData.officeLocation}
        onChange={handleChange}
        style={{
          width: '90%',
          minWidth: '400px', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        <option value="">Please Select Office Location (Province)</option>
        {provinces.map(province => (
          <option key={province} value={province}>{province}</option>
        ))}
      </select>
      </div>

      <div className="form-group">
        <div className="expertise-checkboxes">
          {expertiseAreas.map(area => (
            <div key={area} className="checkbox-item">
              <input
                type="checkbox"
                id={area.replace(/\s+/g, '')}
                name="areasOfExpertise"
                value={area}
                checked={formData.areasOfExpertise.includes(area)}
                onChange={handleChange}
              />
              <label htmlFor={area.replace(/\s+/g, '')}>{area}</label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};


//UserSignupForm component here...

const UserSignupForm = ({ title, hideName, onSubmit }) => {
  const provinces = [
    "Western",
    "Central",
    "Eastern",
    "North Central",
    "Northern",
    "North Western",
    "Uva",
    "Sabaragamuwa",
    "Southern"
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
    province: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.province) {
      alert("Please select a province!");
      return;
    }
    
    console.log('Form submitted:', formData);
    if (onSubmit) onSubmit();
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
      <h2>{title}</h2>
      {!hideName && (
        <input
          type="text"
          name="fullName"
          placeholder="Client Fullname *"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      )}
      
      <input
        type="tel"
        name="contactNumber"
        placeholder="Contact Number *"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail *"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password *"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="repeatPassword"
        placeholder="Confirm Password *"
        value={formData.repeatPassword}
        onChange={handleChange}
        required
      />

      <select
        name="province"
        value={formData.province}
        onChange={handleChange}
        required
        style={{
          width: '90%',
          minWidth: '400px', 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
        
      >
        <option value="">Please Select The Province You are living...</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
};



export default ImageDisplay;
