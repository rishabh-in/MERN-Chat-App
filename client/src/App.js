import "./App.css";
import { Spinner } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { ChatPage } from "./Pages/ChatPage";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
