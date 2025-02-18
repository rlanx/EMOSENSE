import axios from "axios";
import { registerUserAPI, loginUserAPI, checkUsernameAPI } from "../ApiRoute";

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
