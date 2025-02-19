import axios from "axios";
import { addUserAPI } from "../ApiRoute";

// ฟังก์ชันเพิ่มผู้ใช้ (เฉพาะ Admin)
export const addUser = async (username, password, role) => {
  try {
    const response = await axios.post(
      addUserAPI,
      { username, password, role },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Add User Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};
