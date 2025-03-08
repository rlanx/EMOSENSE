import axios from "axios";
import {
  getUserAPI,
  updateUserAPI,
  searchNewsAPI,
  searchResearchAPI,
  predictAPI,
  getUserHistoryAPI,
} from "../ApiRoute";

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

// ฟังก์ชันสำหรับค้นหาข่าวสาร
export const searchNews = async (query) => {
  try {
    let url = searchNewsAPI;
    if (query) {
      url += `?query=${query}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Search News Error:", error);
    return {
      error: error.response?.data?.message || "เกิดข้อผิดพลาดในการค้นหาข่าวสาร",
    };
  }
};

// ฟังก์ชันสำหรับค้นหางานวิจัย
export const searchResearch = async (query) => {
  try {
    let url = searchResearchAPI;
    if (query) {
      url += `?query=${query}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Search Research Error:", error);
    return {
      error:
        error.response?.data?.message || "เกิดข้อผิดพลาดในการค้นหางานวิจัย",
    };
  }
};

// ฟังก์ชันเรียก API วิเคราะห์ข้อความ
export const analyzeText = async (input_text) => {
  try {
    const response = await axios.post(
      predictAPI,
      { input_text },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Prediction Error:", error);
    return { error: error.response?.data?.error || "เกิดข้อผิดพลาด" };
  }
};

// ✅ ดึงประวัติการวิเคราะห์ของผู้ใช้ที่เข้าสู่ระบบ
export const getUserHistory = async () => {
  try {
    const response = await axios.get(getUserHistoryAPI, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get User History Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};
