# P7 OpenClassRooms - Créez un réseau social d’entreprise
Le but était de construire un réseau social d'entreprise pour l'entreprise fictive Groupomania.  
Voici un apperçu des technologies qui on été utilisées:  
**Front-end**: React js, Styled components, Axios...  
**Back-end**: Node js, Express Js, MariaDB, Sequelize, JWT...  

## Lancer le projet

### Etape 1 - Cloner le projet :

```
git clone https://github.com/AK-WebDev/DW_P7_Groupomania.git
```

### Etape 2 - Mettre en place la base de donnée :




### Etape 3 - Lancer le backend : 
Depuis votre terminal de commande, déplacez-vous dans le dossier Back et installez les dépendances :
```
cd Back
npm install
```
Dans le dossier config, créer un fichier .env et ajoutez les informations suivantes :
```
RANDOM_TOKEN_SECRET = XXXXXXXXX
```
*Remplacez les 'XXX' par la chaîne de caractère de votre choix*  

Vous pouvez maintenant lancer le serveur :
```
npm start
``` 
le serveur s'ouvre sur le port 5000 et la phrase 'server running on port 5000' doit s'afficher.

