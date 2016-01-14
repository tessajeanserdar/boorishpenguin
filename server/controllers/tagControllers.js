var db = require('../db/index.js');

module.exports = {
  allTags: function(req, res) {
    db.Tag.findAll()
    .then(function(tags) {
      var formmatedTags = tags.map(function(tag) {
        return {
          id: tag.id,
          name: tag.name
        };
      });

      tags = {};
      tags.results = formmatedTags;
      res.json(tags);
    });
  },

  createTag: function(req, res) {
    var tagObj = req.body;
    db.Tag.create(tagObj).then(function (tag) {
      res.sendStatus(200);
    });
  }
};
