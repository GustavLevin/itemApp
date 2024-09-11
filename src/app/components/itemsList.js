"use client";

import { useEffect, useState } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}