const error = require("../config/error");
const qouteRoutes = require("../routers/quote");
const userRoutes = require("../routers/user");

module.exports = (app) => {
  app.use("/v1", qouteRoutes);
  app.use("/v1", userRoutes);
  app.use(error);
}