// Layout + sidebar + nav

/* src/admin/EditItemForm.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateItem, useItems } from './useAdminData';

export default function EditItemForm() {
  const { id } = useParams();
  const { items, loading, error } = useItems();
  const updateItem = useUpdateItem();
  const navigate = useNavigate();
  const [form, setForm] = useState({ Title: '', CurrentPrice: '', PosterURL: '' });

  useEffect(() => {
    if (!loading) {
      const item = items.find(it => it.id === (isNaN(id) ? id : parseInt(id,10)));
      if (item) setForm({ Title: item.Title, CurrentPrice: item.CurrentPrice, PosterURL: item.PosterURL });
    }
  }, [loading, items, id]);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>Error loading item.</div>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateItem(id, form);
      navigate('/admin/items');
    } catch {
      alert('Failed to update item.');
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Edit Item</h2>
      <label>Title<input name="Title" value={form.Title} onChange={handleChange} required /></label>
      <label>Price<input name="CurrentPrice" type="number" step="0.01" value={form.CurrentPrice} onChange={handleChange} required /></label>
      <label>Poster URL<input name="PosterURL" value={form.PosterURL} onChange={handleChange} /></label>
      <button type="submit">Save Changes</button>
    </form>
  );
}
