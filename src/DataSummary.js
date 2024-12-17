import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataSummary() {
  // State initialization
  const [data, setData] = useState({ dynamoDB: [], s3: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch DynamoDB data
        const dynamoResponse = await axios.get('https://qvtpwn2l66.execute-api.eu-west-1.amazonaws.com/prod');
        console.log("DynamoDB Data:", dynamoResponse.data);

        // Fetch S3 files data
        const s3Response = await axios.get('https://qvtpwn2l66.execute-api.eu-west-1.amazonaws.com/prod/dev');
        console.log("S3 Files Data:", s3Response.data);

        // Update state with fetched data
        setData({
          dynamoDB: dynamoResponse.data.dynamoDB || [],
          s3: s3Response.data.s3 || [],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if data is fetched properly
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h3>Applicants Information</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
            <th scope="col">Sex</th>
            <th scope="col">Race</th>
            <th scope="col">Document</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {data.dynamoDB.length > 0 ? (
            data.dynamoDB.map((item, index) => {
              const correspondingFile = data.s3.find(file => file.documentId === item.id);
              const documentName = correspondingFile ? correspondingFile.name : 'No Document';
              const fileUrl = correspondingFile ? correspondingFile.url : '';

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.sex}</td>
                  <td>{item.race}</td>
                  <td>{documentName}</td>
                  <td>
                    {fileUrl ? (
                      <a href={fileUrl} download>
                        Download
                      </a>
                    ) : (
                      'No file to download'
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-3">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back Main Page
        </button>
      </div>
    </div>
  );
}

export default DataSummary;
