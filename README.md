
# 🧾 Application de gestion d'article – React.js + NestJS + MariaDB

Cette application est une solution **Fullstack CRUD** construite avec :
- **ReactJS** pour le frontend
- **NestJS** pour le backend
- **MariaDB** comme base de données

Le tout est entièrement **dockerisé** pour un déploiement et une installation simplifiés.


## Technologie Stack

- 🎨 **Frontend** : React, Material UI, TypeScript, Axios, Docker  
- 🧠 **Backend** : NestJS, TypeORM, MariaDB, Docker  
- 🗃️ **Base de données** : MariaDB

## Installation

## 📦 Prérequis

- ⚙️ [Node.js](https://nodejs.org/) (v16 ou supérieur)  
- 🐳 [Docker](https://www.docker.com/)

### Installation

#### Clone the repository

```bash
git clone git@github.com:chriss122000/article.git
cd article
git switch dev



#### Install dependencies

```
cd frontend

npm install

cd ../backend

npm install
```

#### Environment Variables

Create .env files in both the frontend and backend directories

# 🧭 Project Structure

```
├── frontend                # React frontend
│   ├── public
│   ├── src
│   ├── Dockerfile
│   └── .env
├── backend                 # NestJS backend
│   ├── src
│   ├── Dockerfile
│   └── .env
└── docker-compose.yml      # Docker Compose file


```

# Environment Variables
## Backend (backend/.env)
```
DB_HOST=mariadb
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=mydb

JWT_CONSTANTS=GESTION_ARTICLE

PORT=3000
```
## Frontend (frontend/.env)
```
REACT_APP_BACKEND_API_URL=http://localhost:3000
REACT_APP_HOST=0.0.0.0
REACT_APP_PORT=3001

```

🐳 Lancer le projet avec Docker
🔧 Build & Run
bash
Copier
Modifier
docker-compose up --build
📌 Cela construira et démarrera tous les services définis dans docker-compose.yml.

🌐 Accès à l’application
🖥️ Frontend : http://localhost:3001

🧩 Backend API : http://localhost:3000

🗄️ MariaDB (via un client type Adminer ou DBeaver) : localhost:3306

🛠️ Commandes Docker utiles
Action	Commande
🔻 Arrêter les services	docker-compose down
🧾 Voir les logs	`docker-compose logs -f <backend
🔁 Rebuild un service	docker-compose up --build <service>
🔁 Recréer tous les conteneurs	docker-compose up -d --force-recreate

📝 Remarques
⚠️ Ne pas oublier de créer les fichiers .env avant de lancer les services.

✅ L’API est protégée par une authentification (standard ou JWT selon l’implémentation).

📦 Le script init.sql initialise la base de données automatiquement via Docker.

✅ Statut : Fonctionnel avec docker-compose up -d
Merci pour votre attention 🙏 et bonne utilisation !