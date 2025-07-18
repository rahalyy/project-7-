import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recommendations/${id}`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  const handleLike = async () => {
    await fetch(`http://localhost:5000/api/recommendations/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: "replace_with_user_id" })
    });
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}`);
    const data = await res.json();
    setBook(data);
  };

  const handleComment = async e => {
    e.preventDefault();
    if (!commentText) return;
    await fetch(`http://localhost:5000/api/recommendations/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: "replace_with_user_id", text: commentText })
    });
    setCommentText('');
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}`);
    const data = await res.json();
    setBook(data);
  };

  const handleRating = async () => {
    if (ratingValue < 1 || ratingValue > 5) return;
    await fetch(`http://localhost:5000/api/recommendations/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: "replace_with_user_id", value: ratingValue })
    });
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}`);
    const data = await res.json();
    setBook(data);
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p className="mb-2 font-semibold">Author: {book.author}</p>
      <p className="mb-4">{book.description}</p>
      <p className="mb-4 text-yellow-600 font-semibold">Average Rating: {book.rating ? book.rating.toFixed(1) : 'No ratings yet'}</p>

      <button onClick={handleLike} className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">
        {book.likes && book.likes.includes("replace_with_user_id") ? 'Unlike' : 'Like'} ({book.likes ? book.likes.length : 0})
      </button>

      <div className="mb-6">
        <input
          type="number"
          min="1"
          max="5"
          value={ratingValue}
          onChange={e => setRatingValue(Number(e.target.value))}
          placeholder="Rate 1-5"
          className="border p-2 rounded mr-2 w-20"
        />
        <button onClick={handleRating} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit Rating
        </button>
      </div>

      <form onSubmit={handleComment} className="mb-6">
        <textarea
          placeholder="Add a comment..."
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        ></textarea>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Comment</button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {book.comments && book.comments.length > 0 ? (
          book.comments.map((c, i) => (
            <p key={i} className="border-b py-2">{c.text}</p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
