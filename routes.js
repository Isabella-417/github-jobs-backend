const jobs = require("./api/jobs");

const routes = (app) => {
  app.use("/api/jobs", jobs);
};

module.exports = routes;
