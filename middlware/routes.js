const error = require("../config/error");
const qouteRoutes = require("../routers/quote");
const userRoutes = require("../routers/user");
const unitRoutes = require("../routers/unit");
const authRoutes = require("../routers/auth");
const reportRoutes = require("../routers/report");
const customerRoutes = require("../routers/customer");

module.exports = (app) => {
  app.use("/v1", qouteRoutes);
  app.use("/v1", userRoutes);
  app.use("/v1", unitRoutes);
  app.use("/v1", authRoutes);
  app.use("/v1", reportRoutes);
  app.use("/v1", customerRoutes);
  app.use(error);
}