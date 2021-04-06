const jobs = require("./jobs.json");
const { filterParams } = require("../../utils");

const getList = (req, res) => {
  if (jobs instanceof Array) {
    return res.status(200).json(jobs);
  }
  res.status(404).json([]);
};

const getStacks = (req, res) => {
  let stackList = [];

  jobs.forEach((job) => {
    stackList = stackList.concat(job.stack);
  });
  stackList = [...new Set(stackList)];
  stackList = stackList.filter((stack) => stack !== undefined);
  return res.status(200).json(stackList.sort());
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
  res.status(200).json(locations.sort());
};

const searchByKey = (keywords, jobs) => {
  if (keywords) {
    const jobFilter = [];
    const partsKeyword = keywords.split(" ");

    jobs.forEach((job) => {
      const containsKeywords = partsKeyword.every((keyword) => {
        return job.title.includes(keyword);
      });

      if (containsKeywords) {
        jobFilter.push(job);
      }
    });
    return jobFilter;
  }
  return jobs;
};

const searchByLocate = (locations, jobs) => {
  if (Object.entries(locations).length !== 0) {
    return jobs.filter((job) => locations.includes(job.location.toUpperCase()));
  }
  return jobs;
};

const searchByTypes = (types, jobs) => {
  if (Object.entries(types).length !== 0) {
    return jobs.filter((job) => {
      return Object.values(types).includes(job.type.toUpperCase());
    });
  }
  return jobs;
};

const searchByStack = (stacks, jobs) => {
  if (Object.entries(stacks).length !== 0) {
    return jobs.filter((job) => {
      const jobStacks = String(job.stack).toUpperCase().split(",");
      return stacks.some((stack) => jobStacks.includes(stack));
    });
  }
  return jobs;
};

const searchByQuery = (req, res) => {
  let results = [];
  if (jobs instanceof Array) {
    const query = req.query ? req.query : "";
    results = searchByKey(query.keyword, jobs);

    const selectedTypes = filterParams(query, "type");
    results = searchByTypes(selectedTypes, results);

    const selectedLocations = Object.values(filterParams(query, "location"));
    results = searchByLocate(selectedLocations, results);

    const selectedStacks = Object.values(filterParams(query, "stack"));
    results = searchByStack(selectedStacks, results);
  }
  res.status(200).json(results);
};

module.exports = {
  getList,
  getLocations,
  getStacks,
  searchByQuery,
};
