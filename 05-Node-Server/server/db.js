const  Sequelize  = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres' 
  });

sequelize.authenticate().then( 
    function() {
    console.log('Connection has been established successfully.');
},
function(err) {
    console.log(err);
}
);

module.exports = sequelize;
