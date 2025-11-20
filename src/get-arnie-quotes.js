"use strict";

const { httpGet } = require("./mock-http-interface");

const HTTP_STATUS_OK = 200;

const parseResponseBody = (body) => {
  try {
    return JSON.parse(body);
  } catch (e) {
    return { message: "Invalid JSON response format" };
  }
};

const getArnieQuotes = async (urls) => {
  const fetchAllPromises = urls.map((url) => httpGet(url));

  const allResults = await Promise.allSettled(fetchAllPromises);

  const results = allResults.map((result) => {
    if (result.status === "fulfilled") {
      const httpResponse = result.value;

      const parsedBody = parseResponseBody(httpResponse.body);

      if (httpResponse.status === HTTP_STATUS_OK) {
        return {
          "Arnie Quote": parsedBody.message,
        };
      } else {
        return {
          FAILURE: parsedBody.message,
        };
      }
    } else {
      return { FAILURE: result.reason.message || "Request was rejected" };
    }
  });

  return results;
};

module.exports = {
  getArnieQuotes,
};
