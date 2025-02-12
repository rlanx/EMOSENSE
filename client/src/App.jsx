import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/user/Main";
import Login from "./page/user/Login";
import Register from "./page/user/Register";
import News from "./page/user/News";
import Research from "./page/user/Research";
import PostDetail from "./page/user/PostDetail";
import Account from "./page/user/Account";
import History from "./page/user/History";
import Dashboard from "./page/admin/Dashboard";
import ManageUsers from "./page/admin/ManageUsers";
import ManageNews from "./page/admin/ManageNews";
import ManageResearch from "./page/admin/ManageResearch";
import UserHistory from "./page/admin/UserHistory";
import EditUser from "./page/admin/EditUser";
import AddUser from "./page/admin/AddUser";
import AddNews from "./page/admin/AddNews";
import EditNews from "./page/admin/EditNews";
import AddResearch from "./page/admin/AddResearch";
import EditResearch from "./page/admin/EditResearch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* user */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/ex" element={<PostDetail />} />
        <Route path="/research" element={<Research />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/history" element={<History />} />

        {/* admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<ManageUsers />} />
        <Route path="/users/history" element={<UserHistory />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/edit" element={<EditUser />} />

        <Route path="/manage-news" element={<ManageNews />} />
        <Route path="/manage-news/add" element={<AddNews />} />
        <Route path="/manage-news/edit" element={<EditNews />} />

        <Route path="/manage-research" element={<ManageResearch />} />
        <Route path="/manage-research/add" element={<AddResearch />} />
        <Route path="/manage-research/edit" element={<EditResearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
