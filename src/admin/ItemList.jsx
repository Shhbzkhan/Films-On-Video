import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css'; // add any styles you need

const ItemList = () => {
  // 1) All items (could come from props or fetched from an API)
  const [items, setItems] = useState([]);
  // 2) Search term
  const [searchTerm, setSearchTerm] = useState('');
  // 3) Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Example fetch – replace with your real data source
  useEffect(() => {
    async function fetchItems() {
      // e.g. const { data } = await supabase.from('YourTable').select('*');
      const data = [
        /* mock data: { serialno, name, ... } */
      ];
      setItems(data);
    }
    fetchItems();
  }, []);

  // Filter by search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Pagination calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const idxLast  = currentPage * itemsPerPage;
  const idxFirst = idxLast - itemsPerPage;
  const currentItems = filteredItems.slice(idxFirst, idxLast);

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };
  const handleFirst = () => handlePageChange(1);
  const handleLast  = () => handlePageChange(totalPages);
  const handlePrev  = () => handlePageChange(currentPage - 1);
  const handleNext  = () => handlePageChange(currentPage + 1);

  // Build array of page numbers (max 5 at a time)
  const maxPages = 5;
  let start = Math.max(1, currentPage - Math.floor(maxPages/2));
  let end   = start + maxPages - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPages + 1);
  }
  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="item-list-admin">
      <div className="item-list-header">
        <h2>Manage Items</h2>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <Link to="items/new" className="btn-new">
          + New Item
        </Link>
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.serialno}>
              <td>{item.serialno}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`items/${item.serialno}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="3">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-admin">
          <button onClick={handleFirst} disabled={currentPage === 1}>
            First
          </button>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          {pageNumbers.map(num => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={num === currentPage ? 'active' : ''}
            >
              {num}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
          <button onClick={handleLast} disabled={currentPage === totalPages}>
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
