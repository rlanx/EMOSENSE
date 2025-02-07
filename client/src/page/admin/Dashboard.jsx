import React from "react";
import Navbar from "../../components/user/Navbar";
import Sidebar from "../../components/admin/Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="">
        <Sidebar />
      </div>
    </div>
  );
}
