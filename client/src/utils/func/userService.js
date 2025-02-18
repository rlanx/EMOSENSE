import axios from "axios";
import { getUserAPI, updateUserAPI, getAllUsersAPI } from "../ApiRoute";

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
