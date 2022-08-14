const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const helmet = require('helmet');

app.use(express.json()); //analyse du corps des requêtes JSON
app.use(cors()); //gestion des erreurs CORS
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } })); //configuration des en-têtes HTTP
app.disable('x-powered-by');

const db = require('./models');

//Routers
const postsRoutes = require('./routes/Posts');
app.use('/posts', postsRoutes);

const usersRoutes = require('./routes/Users');
app.use('/auth', usersRoutes);

const likesRoutes = require('./routes/Likes');
app.use('/likes', likesRoutes);

app.use('/images', express.static('./images')); //p6 middleware qui sauvegarde les images uploadées dans le dossier /images

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('server running on port 5000');
  });
});
