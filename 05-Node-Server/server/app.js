require("dotenv").config();
let express = require("express");
let app = express();
// const app = express();
let sequelize = require("./db");

// let about = require("./controllers/journalcontroller");
// const { Sequelize } = require("./db");

let journal = require("./controllers/journalcontroller");
let user = require("./controllers/usercontroller");

sequelize.afterSync();
//sequelize.sync({force: true});

app.use(express.json());

// sequelize.sync({force: true});
// app.use("/test", function(req,res){
//     res.send("This is a message from the test endpoint on the server!");
// });

// app.use("/teay", function(req,res){
//     res.send ("My name is Teay and I am 33 years old");
// }); 

//Have endpoint of journal/ practice 
//send a response from that endpoint (This is a practice route) 


//exposed route
app.use("/user", user);

// app.use('/journal', about);

//protected route

// app.use(require('./middleware/validate-session'));
app.use('/journal', journal);


app.listen(3000, function(){
    console.log("App is listening on port 3000");
});
