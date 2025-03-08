import axios from "axios";
import {
  addUserAPI,
  getAllUsersAPI,
  editUserByAdminAPI,
  getUserByIdAPI,
  deleteUserByAdminAPI,
  addNewsAPI,
  getAllNewsAPI,
  getContentByIdAPI,
  editContentByIdAPI,
  deleteContentByIdAPI,
  addResearchAPI,
  getAllResearchAPI,
  getUserHistoryByAdminAPI,
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

// ฟังก์ชันเพิ่มข่าวสาร
export const addNews = async (formData) => {
  try {
    const response = await axios.post(addNewsAPI, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
      validateStatus: (status) => status < 500,
    });
    if (response.status !== 201) throw new Error(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Add News Error:", error);
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มข่าวสาร"
    );
  }
};

// ฟังก์ชันเพิ่มงานวิจัย
export const addResearch = async (formData) => {
  try {
    const response = await axios.post(addResearchAPI, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
      validateStatus: (status) => status < 500,
    });
    if (response.status !== 201) throw new Error(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Add Research Error:", error);
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการเพิ่มงานวิจัย"
    );
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลข่าวสารทั้งหมด
export const getAllNews = async () => {
  try {
    const response = await axios.get(getAllNewsAPI, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Get All News Error:", error);
    throw new Error(
      error.response?.data?.message || "ไม่สามารถดึงข้อมูลข่าวสารได้"
    );
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลงานวิจัยทั้งหมด
export const getAllResearch = async () => {
  try {
    const response = await axios.get(getAllResearchAPI, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get All News Error:", error);
    throw new Error(
      error.response?.data?.message || "ไม่สามารถดึงข้อมูลงานวิจัยได้"
    );
  }
};

// ดึงข้อมูลข่าวสารหรือวิจัยตามประเภทและ ID
export const getContentById = async (type, id) => {
  try {
    const response = await axios.get(`${getContentByIdAPI(type, id)}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get Content By ID Error:", error);
    throw new Error(error.response?.data?.message || "ไม่สามารถดึงข้อมูลได้");
  }
};

// ฟังก์ชันสำหรับแก้ไขข้อมูลข่าวสารหรือวิจัย
export const updateContentById = async (type, id, formData) => {
  try {
    const response = await axios.put(editContentByIdAPI(type, id), formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Update Content by ID Error:", error);
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขข้อมูล"
    );
  }
};

// ฟังก์ชันลบข่าวสาร/งานวิจัย
export const deleteContentById = async (type, id) => {
  try {
    const response = await axios.delete(deleteContentByIdAPI(type, id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Delete Content By ID Error:", error);
    return {
      error: error.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูล",
    };
  }
};

// ✅ ดึงประวัติการวิเคราะห์ของผู้ใช้ที่กำหนด (สำหรับ admin)
export const getUserHistoryByAdmin = async (userId) => {
  try {
    const response = await axios.get(`${getUserHistoryByAdminAPI}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Get User History By Admin Error:", error);
    return { error: error.response?.data?.message || "เกิดข้อผิดพลาด" };
  }
};
