const Sequelize = require('sequelize');

const db = require('../util/database');




const Session= db.define('user-sessions', {
    sid: {
      type: Sequelize.STRING,
       primaryKey: true,
    },
    sess:{
      type: Sequelize.JSON
    },
    userId: Sequelize.STRING,
    expire: Sequelize.DATE,
    data: Sequelize.TEXT,
  });

  module.exports=Session