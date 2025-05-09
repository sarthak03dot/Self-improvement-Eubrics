const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    console.log("No token provided, sending 401"); 
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  } else {
    return res.status(400).json({ message: "Invalid Token Format" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message); 
    res.status(400).json({ message: "Invalid Token" });
  }
};
