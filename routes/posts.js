const express = require('express');
const router = express.Router();

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 10 });

const { validateQuery, removeDuplicates, getDirection, getSortByKey, sortBy } = require('../utils/functions');
const { getTagResults } = require('../services');

const fields = ['tags', 'sortBy', 'direction'];

/* GET posts */
router.get('/', validateQuery(fields), (req, res, next) => {
  const tags = req.query.tags.split(',');
  const sortByKey = getSortByKey(req.query.sortBy);
  const direction = getDirection(req.query.direction);

  const cacheKey = req.query.tags+sortByKey+direction;

  let postResults = [];

  if (myCache.has(cacheKey)) {
    return res.send(myCache.get(cacheKey))
  } else {
    Promise.all(tags.map(tag => getTagResults(tag)))
      .then(result => {
      // combines all searched tags into postsArray
        for (const posts of result) {
          for (let i = 0; i < posts.posts.length; i++) {
            postResults.push(posts.posts[i]);
          }
        }
      return postResults;
    }).then(unfilteredResults => {
      let removedDuplicates = removeDuplicates(unfilteredResults, "id");
      let sortedResults = sortBy(removedDuplicates, sortByKey, direction);

      myCache.set(cacheKey, { 'posts': sortedResults });

      return res
        .status(200)
        .send({ 'posts': sortedResults });
    }).catch(err => {
      return res
        .status(400)
        .send({ 'error': err })
    })
  }

});

module.exports = router;