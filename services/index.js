const axios = require('axios');

exports.getTagResults = async (tag) => {
    const apiResponse = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);

    return apiResponse.data;
}