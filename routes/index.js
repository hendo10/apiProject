let express = require('express');
let router = express.Router();
let postsRouter = require('./posts');

router.use('/posts', postsRouter);

router.get('/ping', function(req, res, next) {
  res.status(200)
    .send({ 'success': true });
});

module.exports = router;