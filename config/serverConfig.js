const serverConfig = {
  mongoUrl: process.env.mongodb,
  port: process.env.PORT || 3000,
};

module.exports = { serverConfig };
