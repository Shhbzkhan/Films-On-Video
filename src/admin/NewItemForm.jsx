 // Form to create a new item

 /* src/admin/NewItemForm.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateItem } from './useAdminData';

export default function NewItemForm() {
  const [form, setForm] = useState({ Title: '', CurrentPrice: '', PosterURL: '' });
  const navigate = useNavigate();
  const createItem = useCreateItem();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createItem(form);
      navigate('/admin/items');
    } catch {
      alert('Failed to add item.');
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>New Item</h2>
      <label>Title<input name="Title" value={form.Title} onChange={handleChange} required /></label>
      <label>Price<input name="CurrentPrice" type="number" step="0.01" value={form.CurrentPrice} onChange={handleChange} required /></label>
      <label>Poster URL<input name="PosterURL" value={form.PosterURL} onChange={handleChange} /></label>
      <button type="submit">Add Item</button>
    </form>
  );
}