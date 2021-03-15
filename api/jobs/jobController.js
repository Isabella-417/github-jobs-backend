const jobs = require("./jobs.json");

const getList = (req, res) => {
  res.json(jobs);
};

module.exports = {
  getList,
};
