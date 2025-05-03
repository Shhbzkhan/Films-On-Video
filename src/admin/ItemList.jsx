import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ItemList.css'; // your existing styles

const ItemList = () => {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [searchTerm, setSearch] = useState('');
  const [currentPage, setPage]  = useState(1);
  const itemsPerPage            = 10;

  // 1) Load data
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('Regular_titles')
        .select('*')
        .order('RegSerialNo', { ascending: false });
      console.log('⚙️ data:', data, 'error:', error);
      if (!error) setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Loading items…</div>;

  // 2) Filter by title
  const filtered = items.filter(item =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3) Pagination slice
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // 4) Change page
  const goPage = (n) => {
    if (n >= 1 && n <= totalPages) {
      setPage(n);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="item-list-container">
      <div className="list-header">
        <Link to="/admin/items/new" className="btn">+ Add New Regular Item</Link>
        <input
          type="text"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>RegSerialNo</th><th>ProductID</th><th>QtyToList</th><th>Title</th>
            <th>Release Year</th><th>Disc</th><th>Type</th><th>CurrentPrice</th>
            <th>Description</th><th>PosterURL</th><th>Genres</th><th>Director</th>
            <th>Cast</th><th>Actions</th>
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
              <td>{item.CurrentPrice}</td>
              <td>{item.Description}</td>
              <td><a href={item.PosterURL} target="_blank">View</a></td>
              <td>{item.Genres}</td>
              <td>{item.Director}</td>
              <td>{item.Cast}</td>
              <td>
                <Link to={`/admin/items/${item.RegSerialNo}/edit`} className="btn-sm">Edit</Link>
                <button
                  className="btn-sm danger"
                  onClick={async () => {
                    await supabase
                      .from('Regular_titles')
                      .delete()
                      .eq('RegSerialNo', item.RegSerialNo);
                    // reload
                    setItems(items.filter(i => i.RegSerialNo !== item.RegSerialNo));
                  }}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goPage(1)} disabled={currentPage === 1}>First</button>
          <button onClick={() => goPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                className={p === currentPage ? 'active' : ''}
                onClick={() => goPage(p)}
              >
                {p}
              </button>
            );
          })}
          <button onClick={() => goPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          <button onClick={() => goPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
