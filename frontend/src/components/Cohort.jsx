import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Cohort() {
  const { cohortName } = useParams(); // Assuming the cohort name is passed as a URL parameter
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cohort details
    const fetchCohortDetails = async () => {
      try {
        const cohortResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cohort/${cohortName}`);
        const users = cohortResponse.data.users;
        console.log(users)
        setUsers(users);

        // Check if the current user is a member of this cohort
        const token = localStorage.getItem('token');
        if (token) {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          console.log()
          setIsMember(users.some(user => user.username === tokenPayload.username));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cohort details:', error);
        setLoading(false);
      }
    };

    fetchCohortDetails();
  }, [isMember]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const username = tokenPayload.username;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cohort/join`, 
        { cohortName, username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      setIsMember(true);
    } catch (error) {
      console.error('Error joining cohort:', error);
    }
  };

  const handleLeave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const username = tokenPayload.username;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cohort/leave`, 
        { cohortName, username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      setIsMember(false);
    } catch (error) {
      console.error('Error leaving cohort:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ margin: '20px' }}>
      <h2>{cohortName} Cohort</h2>
      {!isMember && (
        <button onClick={handleJoin} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Join Cohort
        </button>
      )}
      {isMember && (
        <button onClick={handleLeave} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Leave Cohort
        </button>
      )}
      <div>
        {users.length === 0 ? (
          <p>No members in this cohort.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>First Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Last Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Total Problems</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Easy Problems</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Medium Problems</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Hard Problems</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.username}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.firstName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.lastName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.problems}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.easy}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.medium}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{user.hard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Cohort;
