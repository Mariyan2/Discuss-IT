import React from "react";
import Header from "./components/debate_page_components/header";
import Viewers from "./components/debate_page_components/viewers";
import './index.css';
function App() {
  return (
    <div>
      <Header title="What are the economic implications of our high deficit?" />
      <Viewers></Viewers>
    </div>
  );
}

export default App;
