import axios from "axios";
import {
  registerUserAPI,
  loginUserAPI,
  getUserAPI,
  updateUserAPI,
  checkUsernameAPI,
  getAllUsersAPI,
} from "../ApiRoute";

// ฟังก์ชันสมัครสมาชิก
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(registerUserAPI, { username, password });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};

// ตั้งค่า axios ให้ส่ง Cookie ทุกครั้งที่เรียก API
const apiClient = axios.create({
  withCredentials: true, // ส่ง Cookie ไปกับทุก Request
});

// ฟังก์ชันเข้าสู่ระบบ
export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post(loginUserAPI, { username, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);

    if (error.response && error.response.status === 400) {
      return { error: error.response.data.message }; // ส่งข้อความ Error จาก Backend
    }

    return { error: "เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้" };
  }
};

// ฟังก์ชันดึงข้อมูลผู้ใช้
export const getUser = async () => {
  try {
    const response = await axios.get(getUserAPI, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error);
    return {
      error:
        error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
    };
  }
};

// ฟังก์ชันอัปเดตข้อมูลผู้ใช้
export const updateUser = async (formData) => {
  try {
    const response = await axios.put(updateUserAPI, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }, // รองรับการอัปโหลดไฟล์
    });
    return response.data;
  } catch (error) {
    console.error("Update User Error:", error);
    return {
      error:
        error.response?.data?.message ||
        "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้",
    };
  }
};

// ฟังก์ชันเช็คว่าชื่อผู้ใช้ซ้ำหรือไม่
export const checkUsername = async (username) => {
  try {
    const response = await axios.post(checkUsernameAPI, { username });
    return response.data;
  } catch (error) {
    console.error("Check Username Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};

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
