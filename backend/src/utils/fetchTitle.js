const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitleFromUrl = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(data);
    const title = $("title").text().trim();

    return title || "";
  } catch (err) {
    return "";
  }
};

module.exports = fetchTitleFromUrl;
