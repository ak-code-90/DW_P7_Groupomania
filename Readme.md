# P7 OpenClassRooms - Créez un réseau social d’entreprise
Le but était de construire un réseau social d'entreprise pour l'entreprise fictive Groupomania :

• Définition et mise en place de l'environnement technique nécessaire à la réalisation du projet.  
• Développement d'une interface responsive et accessible avec React  
• Implémentation de fonctionnalités : Authentifier un utilisateur, maintenir sa session, permettre la création, modification et suppression de    posts, système de likes,
  rôle administrateur  
• Construction et consommation d'une API REST  
• Mise en place d'un stockage de données sécurisé (OWASP) avec une base de données SQL  



Voici un aperçu des technologies qui ont été utilisées:  
**Front-end**: React js, Styled components, Axios...  
**Back-end**: Node js, Express Js, MariaDB, Sequelize, JWT...  

## Lancer le projet

### Etape 1 - Cloner le projet :
Ouvrez un terminal de commande, placez-vous où vous voulez et entrez :
```
git clone https://github.com/AK-WebDev/DW_P7_Groupomania.git
```


### Etape 2 - Configurer la base de données :
Vous avez besoin d'installer et de configurer MariaDb ou MySQL sur votre machine.  
Vous devrez ensuite vous connecter avec votre identifiant et votre mot de passe :
```
mysql -u root -p
```
Une fois connecté vous pouvez créer la base de données de groupomania :
```
CREATE DATABASE groupomania;
```
Le message 'Query OK, 1 row affected' devrait s'afficher et vous pouvez maintenant fermer le terminal mySQL avec `ctrl + c`

Nous allons maintenant importer le fichier SQL, assurez-vous d'être à la racine du dossier (Dw_P7_Groupomania) et entrez :
```
 & cmd.exe /c "mysql -u root -p groupomania < groupomania.sql" 
```
Entrez ensuite votre mot de passe et la configuration de la base de données est terminée.

Pour vérifier si l'installation s'est bien déroulée, connectez-vous à nouveau à MySQL et entrez la commande :
```
SHOW TABLES FROM groupomania;
```
Vous devriez voir trois tables : likes, posts et users.



### Etape 3 - Lancer le backend : 
Depuis votre terminal de commande, déplacez-vous dans le dossier Back et installez les dépendances :
```
cd Back
npm install
```
Dans le dossier config, créer un fichier .env et ajoutez une clé secrète en remplaçant les 'XXX' par la chaîne de caractère de votre choix :
```
RANDOM_TOKEN_SECRET = XXXXXXXXX
```
Dans le fichier config.json remplissez tous les champs "username", "password" et "database" avec vos identifiants et le nom de la base de données : groupomania

Vous pouvez maintenant lancer le serveur :
```
npm start
``` 
le serveur s'ouvre sur le port 5000 et la phrase 'server running on port 5000' doit s'afficher.

### Etape 4 - Lancer le frontend : 
Ouvrez un second terminal et déplacez-vous cette fois çi dans le dossier Front pour effecuter l'installation :
```
cd Front
npm install
```
Vous pouvez maintenant lancer le serveur :
```
npm start
```
Le client tourne sur le port 3000 et devrait se lancer automatiquement, si ce n'est pas le cas, accédez au [localhost](http://localhost:3000)
