let Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  route: {
    type: Sequelize.VIRTUAL,
    get () {
      return '/wiki/' + this.getDataValue('urlTitle');
    }
  }
},
// 'OPTIONS OBJECT' - HOOKS, VIRTUALS
{
  hooks: {
    beforeValidate: function (page) {
      if (page.title){
        page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      }
      // } else {
      //   return Math.random().toString(36).substring(2, 7);
      console.log(page)
    }
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User,
  db: db
};
