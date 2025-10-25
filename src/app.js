import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Discussion from "./pages/DiscussionPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import AuthPopup from "./components/debate_page_components/AuthPopup"; 
import CreateThread from "./components/debate_page_components/create-thread";
import "./index.css";
function App() {
  const isAuthenticated = false; 

  return (
    <Router>
<div className="flex flex-col min-h-screen bg-transparent">
        {/* Combined container for AuthPopup and CreateThread */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          {!isAuthenticated && <AuthPopup />} {/* Auth component */}
        </div>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage route */}
          <Route path="/discussion/:discussionId" element={<Discussion />} />  {/* DiscussionPage Route */}
          <Route path="*" element={<NotFound />} /> {/* Error Page route */}
          <Route path="/profile/:username"element={<ProfilePage />} /> {/* DProfile Page Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
