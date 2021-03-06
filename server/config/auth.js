module.exports = {
  JWT_EXPIRES_IN: 2592000, // 15 minutes
  JWT_REFRESH_EXPIRES_IN: 2592000, // 1 month
  SERVER_JWT_SECRET: process.env.SERVER_JWT_SECRET,
  SERVER_JWT_SECRET_REFRESH: process.env.SERVER_JWT_SECRET_REFRESH,
  SERVER_JWT_SECRET_USER: process.env.SERVER_JWT_SECRET_USER,
  SERVER_JWT_SECRET_REFRESH_USER: process.env.SERVER_JWT_SECRET_REFRESH_USER,
  SERVER_JWT_SECRET_ADMIN: process.env.SERVER_JWT_SECRET_ADMIN,
  SERVER_JWT_SECRET_REFRESH_ADMIN: process.env.SERVER_JWT_SECRET_REFRESH_ADMIN
};
