const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());                                    //analyse du corps des requêtes JSON
app.use(cors());                                            //gestion des erreurs CORS

const db = require('./models');

//Routers
const postsRoutes = require('./routes/Posts')
app.use('/posts', postsRoutes);


db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("server running on port 5000");
    });
})





























