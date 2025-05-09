import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [behaviors, setBehaviors] = useState([]);
  const [newBehavior, setNewBehavior] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBehaviors();
  }, []);

  const fetchBehaviors = async () => {
    try {
      const response = await api.get('/behaviors/top5');
      setBehaviors(response.data);
    } catch (err) {
      setError('Failed to fetch behaviors. Please log in.');
    }
  };

  const handleCreateBehavior = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/behaviors', { title: newBehavior });
      setBehaviors([...behaviors, response.data]);
      setNewBehavior('');
    } catch (err) {
      setError('Failed to create behavior.');
    }
  };

  const handleDeleteBehavior = async (id) => {
    try {
      await api.delete(`/behaviors/${id}`);
      setBehaviors(behaviors.filter((behavior) => behavior._id !== id));
    } catch (err) {
      setError('Failed to delete behavior.');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">Top 5 Behaviors</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleCreateBehavior} className="form">
          <input
            type="text"
            value={newBehavior}
            onChange={(e) => setNewBehavior(e.target.value)}
            placeholder="New Behavior Title"
            required
            className="form-input"
          />
          <button type="submit" className="form-button">
            Add Behavior
          </button>
        </form>
        <ul className="list">
          {behaviors.map((behavior) => (
            <li key={behavior._id} className="list-item">
              <span
                onClick={() => navigate(`/behavior/${behavior._id}`)}
                className="list-link"
              >
                {behavior.title} ({behavior.count} items)
              </span>
              <button
                onClick={() => handleDeleteBehavior(behavior._id)}
                className="list-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;