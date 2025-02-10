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
import History from "./page/user/History";
import Dashboard from "./page/admin/Dashboard";
import ManageUsers from "./page/admin/ManageUsers";
import ManageKnowledge from "./page/admin/ManageKnowledge";
import ManageResearch from "./page/admin/ManageResearch";
import UserHistory from "./page/admin/UserHistory";
import EditUser from "./page/admin/EditUser";
import AddUser from "./page/admin/AddUser";

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
        <Route path="/my-account" element={<Account />} />
        <Route path="/history" element={<History />} />

        {/* admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<ManageUsers />} />
        <Route path="/users/history" element={<UserHistory />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit" element={<EditUser />} />

        <Route path="/manage-knowledge" element={<ManageKnowledge />} />
        <Route path="/manage-research" element={<ManageResearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
