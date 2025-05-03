import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './NewItemForm.css';

export default function NewAdultItemForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Title: '', CurrentPrice: '', Year: '',
    Quantity: '', Description: '', PosterURL: '', Disc: '', Type: '',
    Genres: '', Director: '', Cast: ''
  });
  const [loading, setLoading]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase
      .storage
      .from('posters')
      .upload(fileName, file);
    if (error) {
      setError(error.message);
    } else {
      const { publicUrl } = supabase
        .storage
        .from('posters')
        .getPublicUrl(data.path);
      setForm(f => ({ ...f, PosterURL: publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const newItem = {
      Title: form.Title,
      CurrentPrice: parseFloat(form.CurrentPrice),
      ['Release Year']: form.Year,
      QtyToList: parseInt(form.Quantity, 10),
      Description: form.Description,
      PosterURL: form.PosterURL,
      Disc: form.Disc,
      Type: form.Type,
      Genres: form.Genres,
      Director: form.Director,
      Cast: form.Cast
      // AdultSerialNo will be auto‐assigned by your sequence
    };

    const { error: insertError } = await supabase
      .from('Adult_titles')
      .insert([newItem]);

    if (insertError) {
      setError(insertError.message);
    } else {
      navigate('/admin/adult/items', { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="edit-form-container">
      <h2>Add New Adult Movie</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-form">
        {/* reuse same form rows: Title, CurrentPrice, Release Year, etc. */}
        {/* … */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding…' : 'Add Movie'}
          </button>
          <button type="button" className="btn btn-secondary"
                  onClick={() => navigate('/admin/adult/items')} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
