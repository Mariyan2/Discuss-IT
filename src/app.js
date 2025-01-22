import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Discussion from "./pages/DiscussionPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import AuthPopup from "./components/debate_page_components/AuthPopup"; 
import "./index.css";

function App() {
  const isAuthenticated = false; 

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {!isAuthenticated && <AuthPopup />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discussion/:discussionId" element={<Discussion />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
