"use client";

import { useEffect, useState } from "react";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch items from the backend API
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");  // Ensure the API route is correct
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again.");
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="items-list">
      <h2 className="items-title">Your Items</h2>
      {items.length === 0 ? (
        <p>No items found. Create some to see them here!</p>
      ) : (
        <ul className="items-container">
          {items.map((item) => (
            <li key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Category:</strong> {item.category}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .items-list {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .items-title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .items-container {
          list-style: none;
          padding: 0;
        }

        .item-card {
          background-color: #fff;
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .item-card:hover {
          transform: translateY(-5px);
        }

        @media (prefers-color-scheme: dark) {
          .items-list {
            color: #f7f7f7;
          }

          .item-card {
            background-color: #333;
            color: #f7f7f7;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
          }

          .item-card:hover {
            background-color: #444;
          }
        }
      `}</style>
    </div>
  );
}