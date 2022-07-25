const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());                                   //analyse du corps des requêtes JSON
app.use(cors());

const db = require('./models');

//Routers
const postRouter = require('./routes/Posts.js');                //import du router
app.use("/posts", postRouter);                               //définition de la route initiale pour les requêtes de posts

db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("server running on port 5000");
    });
})





























