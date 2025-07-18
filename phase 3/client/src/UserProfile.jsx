import React, { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [likedBooks, setLikedBooks] = useState([]);
  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]); // Assuming you have followers implemented

  useEffect(() => {
    // Fetch liked books
    fetch(`http://localhost:5000/api/recommendations`)
      .then(res => res.json())
      .then(data => {
        const liked = data.filter(book => book.likes.includes(userId));
        setLikedBooks(liked);
        // For comments, aggregate comments made by this user
        const userComments = [];
        data.forEach(book => {
          book.comments.forEach(comment => {
            if (comment.user === userId) userComments.push({ bookTitle: book.title, text: comment.text });
          });
        });
        setComments(userComments);
      });

    // For followers, you need an API or DB to get followers list (not implemented in current backend)
  }, [userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Liked Books</h3>
        {likedBooks.length ? (
          likedBooks.map(book => (
            <div key={book._id} className="border p-3 rounded mb-3">
              <h4 className="font-bold">{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))
        ) : (
          <p>No liked books yet.</p>
        )}
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        {comments.length ? (
          comments.map((comment, idx) => (
            <div key={idx} className="border p-3 rounded mb-3">
              <p><strong>{comment.bookTitle}:</strong> {comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Followers</h3>
        {followers.length ? (
          followers.map((follower, idx) => (
            <p key={idx}>{follower.username}</p>
          ))
        ) : (
          <p>No followers yet.</p>
        )}
      </section>
    </div>
  );
}

export default UserProfile;
