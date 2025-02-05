import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/user/Main";
import Login from "./page/user/Login";
import Register from "./page/user/Register";
import Knowledge from "./page/user/Knowledge";
import Research from "./page/user/Research";
import KnowledgeDetail from "./page/user/KnowledgeDetail";
import Account from "./page/user/Account";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* user */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/knowledge/ex" element={<KnowledgeDetail />} />
        <Route path="/research" element={<Research />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
