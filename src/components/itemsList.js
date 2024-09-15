"use client";

import { useState, useEffect } from "react";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: 0, category: "" });
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await fetch("/api/items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
      });

      if (!response.ok) throw new Error("Failed to fetch items");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to load items. Please try again.");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Failed to add item");
      fetchItems();
      setNewItem({ name: "", description: "", quantity: 0, category: "" });
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item); 
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/items/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editItem),
      });
      if (!response.ok) throw new Error("Failed to update item");
      fetchItems();
      setEditItem(null);
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete item");
      fetchItems();
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  return (
    <div className="items-list">
      <h2 className="items-title">Manage Your Items</h2>

      
      <form onSubmit={handleAddItem} className="item-form">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>

      
      <ul className="items-container">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            {editItem && editItem.id === item.id ? (
              
              <form onSubmit={handleUpdateItem} className="edit-form">
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editItem.quantity}
                  onChange={(e) => setEditItem({ ...editItem, quantity: Number(e.target.value) })}
                />
                <input
                  type="text"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                />
                <button type="submit" className="btn btn-success">Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <button className="btn btn-warning" onClick={() => handleEditItem(item)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {error && <p className="error-message">{error}</p>}
      <style jsx>{`
        .items-list {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .item-form,
        .items-container {
          margin-top: 20px;
          padding: 20px;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .items-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        input {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        button {
          margin: 5px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn-primary {
          background-color: #0070f3;
          color: white;
        }
        .btn-primary:hover {
          background-color: #005bb5;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .btn-success:hover {
          background-color: #218838;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }
        .btn-secondary:hover {
          background-color: #5a6268;
        }
        .btn-warning {
          background-color: #ffc107;
          color: black;
        }
        .btn-warning:hover {
          background-color: #e0a800;
        }
        .btn-danger {
          background-color: #dc3545;
          color: white;
        }
        .btn-danger:hover {
          background-color: #c82333;
        }
        .item-card {
          margin: 15px 0;
          padding: 15px;
          border-radius: 8px;
          background-color: #f7f7f7;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .error-message {
          color: #ff0000;
          text-align: center;
          margin-top: 20px;
        }
        @media (prefers-color-scheme: dark) {
          .items-list,
          .item-form,
          .items-container,
          .item-card {
            background-color: #444;
            color: #f7f7f7;
          }
          input {
            background-color: #555;
            color: #f7f7f7;
            border-color: #666;
          }
        }
      `}</style>
    </div>
  );
}