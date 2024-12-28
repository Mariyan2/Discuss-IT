import React from "react";
import Header from "./components/debate_page_components/header";
import Viewers from "./components/debate_page_components/viewers";
import ApprovalBar from "./components/debate_page_components/approval-bar";
import VideoContainer from "./components/debate_page_components/VideoContainer";
import './index.css';
function App() {
  return (
    <div>
      <Header title="What are the economic implications of our high deficit?" />
      <ApprovalBar percentage={35}></ApprovalBar>
      <VideoContainer></VideoContainer>
      <Viewers></Viewers>

    </div>
  );
}
export default App;
