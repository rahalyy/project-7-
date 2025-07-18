import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookSearchAndRecommend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    rating: ''
  });

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const res = await fetch('http://localhost:5000/api/recommendations');
    const data = await res.json();
    setBooks(data);
  };

  const handleSearch = () => {
    const filtered = books.filter(b =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBooks(filtered);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBook, userId: "replace_with_user_id" })
    });
    if (res.ok) {
      fetchRecommendations();
      setNewBook({ title: '', author: '', description: '', rating: '' });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Discover & Share Books</h2>

      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2 mb-2 md:mb-0"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded md:ml-4 hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Add Book Recommendation</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} className="border p-2 rounded w-full" required />
        <textarea placeholder="Description" value={newBook.description} onChange={e => setNewBook({ ...newBook, description: e.target.value })} className="border p-2 rounded w-full"></textarea>
        <input type="number" placeholder="Rating (1-5)" value={newBook.rating} onChange={e => setNewBook({ ...newBook, rating: e.target.value })} min="1" max="5" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Recommendation</button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Book Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map(book => (
          <div key={book._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h4 className="font-bold">{book.title}</h4>
            <p className="text-gray-700">{book.author}</p>
            <p className="mb-2">{book.description}</p>
            <p className="text-yellow-600 mb-2">Rating: {book.rating}</p>
            <Link to={`/book/${book._id}`} className="text-blue-600 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearchAndRecommend;
