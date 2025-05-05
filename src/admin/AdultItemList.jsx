import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ItemList.css';

export default function AdultItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase
      .from('Adult_titles')
      .select('*')
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setItems(data);
      });
  }, []);

  const handleDelete = async (AdultSerialNo) => {
    await supabase
      .from('Adult_titles')
      .delete()
      .eq('AdultSerialNo', AdultSerialNo);
    setItems(items.filter(item => item.AdultSerialNo !== AdultSerialNo));
  };

  return (
    <div>
      <h2>All Adult Movies</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>Poster</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.AdultSerialNo}>
              <td>{item.AdultSerialNo}</td>
              <td>
                {item.PosterURL
                  ? <img src={item.PosterURL} alt={item.Title} className="poster-thumb" />
                  : <span style={{ color: '#888' }}>No image</span>}
              </td>
              <td>{item.Title}</td>
              <td>${item.CurrentPrice}</td>
              <td>
                <Link to={`adult/items/${item.AdultSerialNo}/edit`}>Edit</Link>{' '}
                <button onClick={() => handleDelete(item.AdultSerialNo)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
