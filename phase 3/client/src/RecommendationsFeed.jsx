import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecommendationsFeed({ userId }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recommendations/recommendations/personalized/${userId}`)
      .then(res => res.json())
      .then(data => setRecommendations(data));
  }, [userId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Personalized Recommendations</h2>
      {recommendations.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map(book => (
            <div key={book._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h4 className="font-bold">{book.title}</h4>
              <p className="mb-1 text-gray-700">{book.author}</p>
              <p className="mb-2">{book.description}</p>
              <p className="text-yellow-600 font-semibold mb-2">Rating: {book.rating ? book.rating.toFixed(
