
# Parking App 🚗 🚙 🚗

### Ce projet est une application de gestion de parking développée avec les technologies suivantes :

**React.js :** React.js est utilisé pour la partie frontend de l'application. Il offre une approche basée sur les composants pour la construction d'interfaces utilisateur réactives et dynamiques. React.js est populaire pour sa performance élevée, sa réutilisabilité des composants et sa facilité de développement.

**Nest.js :** Nest.js est utilisé pour la partie backend de l'application. C'est un framework Node.js qui utilise TypeScript comme langage de programmation. Nest.js offre une architecture basée sur les modules, inspirée par Angular, ce qui facilite l'organisation et la structuration du code. Il fournit également des fonctionnalités avancées telles que l'injection de dépendances et la gestion des requêtes HTTP.

**TypeScript :** TypeScript est un sur-ensemble de JavaScript qui apporte le typage statique au développement JavaScript. Il permet de détecter les erreurs potentielles à la compilation et offre une meilleure assistance au développement grâce à l'autocomplétion et à la vérification des types. L'utilisation de TypeScript améliore la maintenabilité du code et réduit les erreurs.

**SQLite :** SQLite est une base de données relationnelle légère et autonome. Dans ce projet, SQLite est utilisé comme base de données embarquée pour stocker les informations sur les places de parking. SQLite est largement utilisé dans les applications mobiles et les petits projets en raison de sa simplicité, de sa portabilité et de sa faible empreinte mémoire.

## Configuration

**Pour configurer le projet, suivez les étapes suivantes :**

Clonez le dépôt GitHub :
```bash
git clone <repository-url>
```
Accédez au répertoire du projet :
```bash
cd parking-app
```
Installez les dépendances :
```bash
npm install
```
Démarrer le serveur (Backend)
```bash
npm run start:server
```
Le serveur sera accessible à l'adresse http://localhost:3001.

Démarrer le client (Frontend)
```bash
npm run start:client
```
Le client sera accessible à l'adresse http://localhost:3000.

## Utilisation

* Utilisez le bouton "Ticket" pour générer un nouveau ticket avec une place assignée.
* Cliquez sur une place déjà assignée pour la libérer.
* Utilisez le bouton "reset" pour réinitialiser l'application de gestion de parking.

![Parking App front](https://i.ibb.co/pjrF9PC/Parking-App.png)

![Parking App ticket](https://i.ibb.co/JRDFfSk/Parking-app-ticket.png)
