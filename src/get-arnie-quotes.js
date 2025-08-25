const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  // return results;

  let results;

  try {
    const fetchAllPromises = urls.map(async (url) => {
      return await httpGet(url);
    });

    const data = await Promise.allSettled(fetchAllPromises);

    results = data.map((item) => {
      if (item.value.status === 200) {
        return {
          "Arnie Quote": JSON.parse(item.value.body).message,
        };
      } else {
        return { FAILURE: JSON.parse(item.value.body).message };
      }
    });
  } catch (error) {
    console.error("One or more requests failed:", error.message);
  }

  return results;
};

module.exports = {
  getArnieQuotes,
};
