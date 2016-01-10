var Sequelize = require('sequelize');

var database = process.env.DATABASE || 'townhall';
var dbUser = process.env.DBUSER || 'root';
var dbPass = process.env.DBPASS || 'mypw';
var dbHost = process.env.DBHOST || 'localhost'

var db = new Sequelize(database, dbUser, dbPass, {
  host: dbHost
});

var User = db.define('User', {
  username: Sequelize.STRING,
  name: Sequelize.STRING,
  name_last: Sequelize.STRING,
  name_first: Sequelize.STRING,
  isTeacher: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  email: Sequelize.STRING,
  picture: Sequelize.STRING
}, {
  timestamps: false
});

var Tag = db.define('Tag', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Course = db.define('Course', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Question = db.define('Question', {
  text: Sequelize.STRING,
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  responses: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAnswered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  timestamps: true,
  updatedAt: false
});

var Answer = db.define('Answer', {
  text: Sequelize.STRING,
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  answersQuestion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  timestamps: true,
  updatedAt: false
});

// replaces question and answer
var Post = db.define('Post', {
  text: Sequelize.STRING,
  isAnAnswer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  responses: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAnswered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
});

Course.belongsToMany(User, {
  through: 'CourseUser'
});
User.belongsToMany(Course, {
  through: 'CourseUser'
});

User.hasMany(Question);
Question.belongsTo(User);
Tag.hasMany(Question);
Question.belongsTo(Tag);
Course.hasMany(Question);
Question.belongsTo(Course);

User.hasMany(Answer);
Answer.belongsTo(User);
Question.hasMany(Answer);
Answer.belongsTo(Question);

Post.hasMany(Post, {as: 'Responses', foreignKey: 'QuestionId'});

Post.belongsToMany(User, {through: 'Likes'});
User.belongsToMany(Post, {through: 'Likes'});

User.sync()
.then(function() {
  return Tag.sync();
})
.then(function() {
  return Course.sync();
})
.then(function() {
  return Question.sync();
})
.then(function() {
  return Answer.sync();
})
.then(function() {
  return Post.sync({force: true});
});

exports.User = User;
exports.Question = Question;
exports.Answer = Answer;
exports.Course = Course;
exports.Tag = Tag;
exports.Post = Post;
