import axios from "axios";
import {
  addUserAPI,
  getAllUsersAPI,
  editUserByAdminAPI,
  getUserByIdAPI,
  deleteUserByAdminAPI,
} from "../ApiRoute";

//ดึงข้อมูลผู้ใช้ทั้งหมด
export const getUsers = async () => {
  try {
    const response = await axios.get(getAllUsersAPI, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Get Users Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};

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

// ฟังก์ชันแก้ไขข้อมูลผู้ใช้ (เฉพาะ Admin)
export const updateUserByAdmin = async (id, username, password, role) => {
  try {
    const response = await axios.put(
      `${editUserByAdminAPI}/${id}`,
      { username, newPassword: password, role },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Update User by Admin Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};

// ดึงข้อมูลผู้ใช้ตาม ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${getUserByIdAPI}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};

// ฟังก์ชันสำหรับลบผู้ใช้ (เฉพาะ Admin)
export const deleteUserByAdmin = async (id) => {
  try {
    const response = await axios.delete(`${deleteUserByAdminAPI}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Delete User by Admin Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};
