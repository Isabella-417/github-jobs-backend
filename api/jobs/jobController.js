const jobs = require("./jobs.json");
const { filterParams } = require("../../utils");

const getList = (req, res) => {
  if (jobs instanceof Array) {
    return res.status(200).json(jobs);
  }
  res.status(404).json([]);
};

const getLocations = (req, res) => {
  const locations = [];
  if (jobs instanceof Array) {
    jobs.forEach((job) => {
      if (!locations.includes(job.location)) {
        locations.push(job.location);
      }
    });
  }
  res.status(200).json(locations);
};

const searchByKeyword = (req, res) => {
  const keywords = req.params ? req.params.keyword : "";
  const jobFilter = [];
  const partsKeyword = keywords.split(" ");

  if (jobs instanceof Array) {
    jobs.forEach((job) => {
      const containsKeywords = partsKeyword.every((keyword) => {
        return job.title.includes(keyword);
      });

      if (containsKeywords) {
        jobFilter.push(job);
      }
    });
  }
  res.json(jobFilter);
};

const searchByLocation = (req, res) => {
  const location = req.query ? req.query : "";
  const selectedLocations = Object.values(filterParams(location, "location"));
  let jobsInLocation = [];
  if (jobs instanceof Array) {
    jobsInLocation = jobs.filter((job) =>
      selectedLocations.includes(job.location.toUpperCase())
    );
    return res.status(200).json(jobsInLocation);
  }

  return res.status(404).json([]);
};

const searchByType = (req, res) => {
  const type = req.query ? req.query : "";
  const selectedTypes = filterParams(type, "type");

  if (jobs instanceof Array) {
    jobFilter = jobs.filter((job) => {
      return Object.values(selectedTypes).includes(job.type.toUpperCase());
    });
  }

  res.status(200).json(jobFilter);
};

const searchByTechnology = (req, res) => {
  const technologySearched = req.params ? req.params.technology : "";
  let jobFilter = [];
  if (jobs instanceof Array) {
    jobFilter = jobs.filter((job) =>
      job.stack ? job.stack.includes(technologySearched) : false
    );
  }
  res.status(200).json(jobFilter);
};

module.exports = {
  getList,
  getLocations,
  searchByLocation,
  searchByType,
  searchByTechnology,
  searchByKeyword,
};
