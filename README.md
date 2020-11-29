# Formation DOCKER : TP WebApp - API

## Prérequis

Pour lancer localement l'application les outils suivant sont nécessaires sur le poste de développement :
- node v14.6.0
- npm v6.14.6
- mongodb >= v4.2

## Installation des dépendances

Les dépendances s'installent comme suit (commande à lancer à la racine du projet):

```
npm install
```

## Configuration

Une configuration par défaut est fournie dans le fichier __.env__ et s'appuie sur une base de données démarrée localement.
Il est toutefois possible de customiser cette configuration en modifiant les variables suivantes :

- MONGODB_HOST : l'adresse où est située la base de données
- MONGODB_PORT : le port d'écoute de la base de données
- MONGODB_USER : l'user a utiliser pour la connexion à la base
- MONGODB_PWD :  le mot de passe a utiliser pour la connexion à la base
- MONGODB_NAME : le nom de la base de données à utiliser

## Exécution locale de l'application

Une fois la base mongo lancée, l'initialisation des données peut être réaliser via un script situé dans dockerfiles/scripts.

```
./mongo /path/to/dockerfiles/scripts/mongo-init.sh
```

L'application se lance alors simplement avec la commande suivante :

```
npm start
```