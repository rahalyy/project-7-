import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearchAndRecommend from './BookSearchAndRecommend';
import BookDetails from './BookDetails';
import UserProfile from './UserProfile';
import RecommendationsFeed from './RecommendationsFeed';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold shadow">
          Book Recommendation App
        </header>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<BookSearchAndRecommend />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/profile" element={<UserProfile userId="replace_with_user_id" />} />
            <Route path="/recommendations" element={<RecommendationsFeed userId="replace_with_user_id" />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; 2025 Book App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
