import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    surname: '',
    age: '',
    email: '',
    sex: '',
    race: '',
  });

  const formRef = useRef(); // Ref to access the form and reset it
  const navigate = useNavigate(); // For navigation

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form data input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Submit form data and file
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure a file is selected
    if (!file) {
      console.error('No file selected');
      return;
    }

    // Prepare file data (in binary format - base64 encoding)
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      const fileData = {
        fileName: file.name,
        fileContent: fileReader.result.split(',')[1], // Convert to base64 without data URL prefix
      };

      // Prepare applicant data to send with the file
      const applicantData = {
        ...formData,
        fileData,
      };

      try {
        // Make PUT request to Lambda function for file upload
        const fileUploadResponse = await axios.put('https://qvtpwn2l66.execute-api.eu-west-1.amazonaws.com/prod/dev', fileData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // After file upload is successful, send applicant data to DynamoDB
        const dataSubmitResponse = await axios.post('https://qvtpwn2l66.execute-api.eu-west-1.amazonaws.com/prod', applicantData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Log success responses
        console.log('File uploaded and data saved:', fileUploadResponse.data, dataSubmitResponse.data);
        alert('Application submitted successfully!\nData and file have been uploaded.');

        // Clear the form after submission
        setFormData({
          id: '',
          name: '',
          surname: '',
          age: '',
          email: '',
          sex: '',
          race: '',
        });
        setFile(null);

        // Reset the form including the file input
        formRef.current.reset();
      } catch (error) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        alert('Error submitting application. Please try again.');
      }
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '500px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ textAlign: 'center' }}>Application Form</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">ID:</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Applicant ID"
              aria-label="ID"
              aria-describedby="basic-addon1"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon2">Name:</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Applicant Name"
              aria-label="Name"
              aria-describedby="basic-addon2"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">Surname:</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Applicant Surname"
              aria-label="Surname"
              aria-describedby="basic-addon3"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon4">Age:</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Applicant Age"
              aria-label="Age"
              aria-describedby="basic-addon4"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon5">Email:</span>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Applicant Email"
              aria-label="Email"
              aria-describedby="basic-addon5"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Sex as radio buttons */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">Sex</span>
            <select
              className="form-control"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              aria-label="Select Sex"
              aria-describedby="basic-addon3"
            >
              <option value="">Select your sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Race Radio Buttons */}
          <div className="mb-3">
            <label htmlFor="race" className="form-label">Race: </label>
            <div className="form-check">
              <input
                type="radio"
                id="black"
                name="race"
                value="black"
                className="form-check-input"
                checked={formData.race === 'black'}
                onChange={handleInputChange}
              />
              <label htmlFor="black" className="form-check-label">Black</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="white"
                name="race"
                value="white"
                className="form-check-input"
                checked={formData.race === 'white'}
                onChange={handleInputChange}
              />
              <label htmlFor="white" className="form-check-label">White</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="asian"
                name="race"
                value="asian"
                className="form-check-input"
                checked={formData.race === 'asian'}
                onChange={handleInputChange}
              />
              <label htmlFor="asian" className="form-check-label">Asian</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="otherRace"
                name="race"
                value="other"
                className="form-check-input"
                checked={formData.race === 'other'}
                onChange={handleInputChange}
              />
              <label htmlFor="otherRace" className="form-check-label">Other</label>
            </div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon8">Resume:</span>
            </div>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back to Main</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FileUpload;
