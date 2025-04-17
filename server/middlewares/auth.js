const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};

exports.authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.sendStatus(403);
  next();
};