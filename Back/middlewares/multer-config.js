// //implémentation de l'upload de fichiers par les utilisateurs

// const multer = require('multer');                         //import de multer qui stock les fichiers des utilisateurs dans la DB



// const storage = multer.diskStorage({                      //creation d'un objet de configuration qui sera enregistré sur le disque en local
//     destination: (req, file, callback) => {                 //cet objet nécéssite deux éléments, une destination qui doit contenir le nom du dossier en 2eme arguments et
//         callback(null, 'images');                             //le 1er argument 'null' sert à spécifier qu'il n'y a pas d'erreurs
//     },
//     filename: (req, file, callback) => {                    //un nom de fichier à personnaliser :
//         const name = file.originalname.split(' ').join('_');  //on crée la partie avant de l'extension en utilisant le nom d'origine du fichier entré par l'utilisateur auquel on retire les eventuels espaces grâce a split et join
//         const extension = MIME_TYPES[file.mimetype];          //pour ajouter l'extension du fichier on accède à son mimetype
//         callback(null, name + Date.now() + '.' + extension);  //on crée le nom du fichier entier en concaténant le nom, un nombre de milisecondes aléatoire grâce à Date.now() (c'est l'élément qui va rendre le nom du fichier unique) un point et l'extension du fichier
//     }
// });

// module.exports = multer({ storage: storage }).single('image');  //on exporte le middleware, single() permet de spécifier qu'il s'agit d'un fichier unique et non un groupe de fichiers







const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log(file);

        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('postImg');

module.exports = upload