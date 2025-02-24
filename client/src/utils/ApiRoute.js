export const host = `http://localhost:3000`;

// USER API
export const registerUserAPI = `${host}/api/auth/register`;
export const loginUserAPI = `${host}/api/auth/login`;
export const getUserAPI = `${host}/api/user/me`;
export const logoutUserAPI = `${host}/api/auth/logout`;
export const updateUserAPI = `${host}/api/user/update`;
export const checkUsernameAPI = `${host}/api/auth/check-username`;

// ADMIN API
export const getAllUsersAPI = `${host}/api/user/users`; // ดึงรายการผู้ใช้ทั้งหมด
export const addUserAPI = `${host}/api/user/add-user`; // เพิ่มผู้ใช้
export const editUserByAdminAPI = `${host}/api/user/edit-user`; // สำหรับแก้ไขผู้ใช้ (สำหรับ admin)
export const getUserByIdAPI = `${host}/api/user/get-user`; // ดึงข้อมูลผู้ใช้ตาม ID
export const deleteUserByAdminAPI = `${host}/api/user/delete-user`; // ลบผู้ใช้

// CONTENT API
export const addNewsAPI = `${host}/api/content/add/news`; // สำหรับเพิ่มข่าวสาร
export const getAllNewsAPI = `${host}/api/content/news`; // API สำหรับดึงข่าวสาร

export const getContentByIdAPI = (type, id) =>
  `${host}/api/content/${type}/${id}`; // API ดึงข้อมูลข่าวสารหรือวิจัยตามประเภทและ ID

export const editContentByIdAPI = (type, id) =>
  `${host}/api/content/edit/${type}/${id}`; // API แก้ไขข้อมูลข่าวสาร / วิจัย;
