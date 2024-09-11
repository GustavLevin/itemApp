"use client";

import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", quantity: 0, category: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch items on page load
    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const item = await response.json();
        setItems([...items, item]);
        setMessage("Item added successfully!");
      } else {
        setMessage("Failed to add item.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDeleteItem = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
        setMessage("Item deleted successfully!");
      } else {
        setMessage("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="items-container">
      <h2>Manage Inventory Items</h2>
      <form onSubmit={handleAddItem} className="add-item-form">
        <input type="text" placeholder="Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
        <input type="text" placeholder="Description" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
        <input type="number" placeholder="Quantity" onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} required />
        <input type="text" placeholder="Category" onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required />
        <button type="submit" className="button">Add Item</button>
      </form>
      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleDeleteItem(item.id)} className="button delete-button">Delete</button>
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
      <style jsx>{`
        .items-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f7f7f7;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .add-item-form, .items-list {
          margin-top: 20px;
        }
        .add-item-form input {
          display: block;
          margin: 10px 0;
          padding: 10px;
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .item-card {
          background-color: #fff;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .delete-button {
          background-color: #e00;
        }
        .delete-button:hover {
          background-color: #c00;
        }
      `}</style>
    </div>
  );
}