const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // ดึง Token จาก Cookie

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ถอดรหัส Token
    req.user = decoded; // แนบข้อมูล User ไปกับ Request

    console.log("Decoded Token:", req.user);

    next(); // ดำเนินการต่อไปยัง Controller
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
