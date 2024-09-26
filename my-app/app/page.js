"use client";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]); // Start with an empty array, no initialized values
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Check if price and name are not empty
    if (newItem.name !== '' && newItem.price !== '') {
      // Add item to Firebase
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: parseFloat(newItem.price), // Ensure price is a number
      });

      // Clear input fields
      setNewItem({ name: '', price: '' });
    }
  };

  // Fetch data from Firebase and calculate total
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Calculate total price
      const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotal(totalPrice);
    });

    return () => unsubscribe();
  }, []);

  // Delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid-cols-6 flex items-center text-black" onSubmit={addItem}>
            <input
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Item: '
            />
            <input
              name="price"
              value={newItem.price}
              onChange={handleInputChange}
              className="col-span-3 p-3 border mx-3"
              type='number'
              placeholder='Enter $: '
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between text-white bg-slate-700">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">X</button>
              </li>
            ))}
          </ul>
          {items.length > 0 && (
            <div className="flex justify-between p-3 bg-slate-500">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
