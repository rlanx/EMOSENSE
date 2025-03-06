const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      req.user = null; // ถ้าไม่มี token ให้ทำงานต่อไปเลย (ไม่หยุด request)
      return next();
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;

    // console.log("Decoded User:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
