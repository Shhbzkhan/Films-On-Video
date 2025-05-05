import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ItemList.css';

export default function ItemList() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearch]   = useState('');
  const [currentPage, setPage]    = useState(1);
  const itemsPerPage              = 10;

  useEffect(() => {
    supabase
      .from('Regular_titles')
      .select('*')
      .order('RegSerialNo', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading items…</div>;

  // filter + paginate
  const filtered    = items.filter(i => i.Title.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages  = Math.ceil(filtered.length / itemsPerPage);
  const startIndex  = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goPage = n => {
    if (n >= 1 && n <= totalPages) {
      setPage(n);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="item-list-container">
      <div className="list-header">
        <Link to="/admin/items/new" className="btn add-new">
          + Add New Regular Item
        </Link>
        <input
          type="text"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>Reg#</th>
            <th>ProductID</th>
            <th>Qty</th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Disc</th>
            <th>Type</th>
            <th>Price</th>
            <th>Description</th>
            <th>Poster</th>
            <th>Genres</th>
            <th>Director</th>
            <th>Cast</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.RegSerialNo}>
              <td>{item.RegSerialNo}</td>
              <td>{item.ProductID}</td>
              <td>{item.QtyToList}</td>
              <td>{item.Title}</td>
              <td>{item['Release Year']}</td>
              <td>{item.Disc}</td>
              <td>{item.Type}</td>
              <td>${item.CurrentPrice.toFixed(2)}</td>
              <td className="description-cell" title={item.Description}>
                {item.Description.length > 50
                  ? item.Description.slice(0, 50) + '…'
                  : item.Description
                }
              </td>
              <td>
                {item.PosterURL
                  ? <img src={item.PosterURL} alt={item.Title} className="poster-thumb" />
                  : <span className="no-image">—</span>
                }
              </td>
              <td>{item.Genres}</td>
              <td>{item.Director}</td>
              <td>{item.Cast}</td>
              <td>
                <Link to={`/admin/items/${item.RegSerialNo}/edit`} className="btn-sm">
                  Edit
                </Link>
                <button
                  className="btn-sm danger"
                  onClick={async () => {
                    await supabase
                      .from('Regular_titles')
                      .delete()
                      .eq('RegSerialNo', item.RegSerialNo);
                    setItems(items.filter(i => i.RegSerialNo !== item.RegSerialNo));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goPage(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => goPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i+1}
              className={currentPage === i+1 ? 'active' : ''}
              onClick={() => goPage(i+1)}
            >
              {i+1}
            </button>
          ))}
          <button onClick={() => goPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          <button onClick={() => goPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      )}
    </div>
  );
}
