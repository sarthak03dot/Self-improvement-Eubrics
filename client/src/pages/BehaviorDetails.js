import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function BehaviorDetailsPage() {
  const { id } = useParams();
  const [behavior, setBehavior] = useState(null);
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBehavior();
    fetchItems();
  }, [id]);

  const fetchBehavior = async () => {
    try {
      const response = await api.get(`/behaviors/${id}`);
      setBehavior(response.data);
    } catch (err) {
      setError('Failed to fetch behavior.');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await api.get(`/items/by-behavior/${id}`);
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items.');
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/items', { text: newItemText, behaviorId: id });
      setItems([...items, response.data]);
      setNewItemText('');
    } catch (err) {
      setError('Failed to add item.');
    }
  };

  const handleEditItem = (item) => {
    setEditItemId(item._id);
    setEditItemText(item.text);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/items/${editItemId}`, { text: editItemText });
      setItems(items.map((item) => (item._id === editItemId ? response.data : item)));
      setEditItemId(null);
      setEditItemText('');
    } catch (err) {
      setError('Failed to update item.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (err) {
      setError('Failed to delete item.');
    }
  };

  if (!behavior) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="card">
        <h2 className="title">{behavior.title}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleAddItem} className="form">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="New Improvement Item"
            required
            className="form-input"
          />
          <button type="submit" className="form-button">
            Add Item
          </button>
        </form>
        <ul className="list">
          {items.map((item) => (
            <li key={item._id} className="list-item">
              {editItemId === item._id ? (
                <form onSubmit={handleUpdateItem} className="edit-form">
                  <input
                    type="text"
                    value={editItemText}
                    onChange={(e) => setEditItemText(e.target.value)}
                    required
                    className="edit-input"
                  />
                  <button type="submit" className="edit-button">
                    Save
                  </button>
                  <button onClick={() => setEditItemId(null)} className="cancel-button">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span className="item-text">{item.text}</span>
                  <button onClick={() => handleEditItem(item)} className="item-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteItem(item._id)} className="list-button">
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BehaviorDetailsPage;