// Data table + search/sort/pagination

/* src/admin/ItemList.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { useItems, useDeleteItem } from './useAdminData';

export default function ItemList() {
  const { items, loading, error, refetch } = useItems();
  const deleteItem = useDeleteItem();

  if (loading) return <div>Loading items…</div>;
  if (error)   return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await deleteItem(id);
        refetch();
      } catch {
        alert('Failed to delete item.');
      }
    }
  };

  return (
    <div className="admin-list">
      <h2>All Items</h2>
      <table>
        <thead>
          <tr><th>Title</th><th>Price</th><th>Poster</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.Title}</td>
              <td>${item.CurrentPrice}</td>
              <td><img src={item.PosterURL} alt={item.Title} width={50} /></td>
              <td>
                <Link to={`${item.id}/edit`}>Edit</Link>{' '}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}