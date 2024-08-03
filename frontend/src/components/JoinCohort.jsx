import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function JoinCohort() {
  const [cohortName, setCohortName] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchCohorts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cohort/`);
        setCohorts(response.data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohorts();
  }, []);

  const handleJoin = async (cohortName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const username = tokenPayload.username;

      if (!username) {
        throw new Error('Username not found in token');
      }

      // Send a request to the backend to join the cohort
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cohort/join`, 
        { cohortName, username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      console.log(response.data);
      navigate(`/cohort/${cohortName}`); 
    } catch (error) {
      console.error('Error joining cohort:', error);
      
    }
  };

  return (
    <div className="join-container">
      <h2 className="join-header">Join a Cohort</h2>
      <div className="join-form">
        <label>
          Cohort Name:
          <input 
            type="text" 
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
            required
          />
        </label>
        <button onClick={() => handleJoin(cohortName)}>Join</button>
      </div>
      <h3 className="available-cohorts">Available Cohorts:</h3>
      <ul className="cohort-list">
        {cohorts.map(cohort => (
          <li key={cohort._id}>
            {cohort.name}
            <button onClick={() => handleJoin(cohort.name)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinCohort;
