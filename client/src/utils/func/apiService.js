import axios from "axios";
import { registerUserAPI, loginUserAPI } from "../ApiRoute"; // นำเข้า API URL

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

// ฟังก์ชันเข้าสู่ระบบ (เพิ่มเข้ามาเผื่อใช้ใน Login)
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(loginUserAPI, { username, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};
