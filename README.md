
# 🧾 Application de gestion d'article – React.js + NestJS + MariaDB

Cette application est une solution **Fullstack CRUD** construite avec :
- **ReactJS** pour le frontend
- **NestJS** pour le backend
- **MariaDB** comme base de données


## Technologie Stack

- 🎨 **Frontend** : React, Material UI, TypeScript, Axios, Docker  
- 🧠 **Backend** : NestJS, TypeORM, MariaDB, Docker  
- 🗃️ **Base de données** : MariaDB


## Installation

### Prerequisites

- ⚙️ [Node.js](https://nodejs.org/) (v16 ou supérieur)  
- 🐳 [Docker](https://www.docker.com/)

### Installation

#### Clone the repository

```
git clone git@github.com:chriss122000/article.git

git switch dev

cd article
```


#### Install dependencies

```
cd frontend

npm install

cd ../backend

npm install
```

#### Environment Variables

Create .env files in both the frontend and backend directories

# Project Structure

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

# Docker
Docker is used to create and run containers for both the backend and frontend.

## Build and Run with Docker
### Run Docker Compose

```docker-compose up --build```

This will build and start all services as defined in docker-compose.yml.

### Access the Application

Frontend: http://localhost:3001

Backend API: http://localhost:3000

Adminer interface: http://localhost:3306

### Useful Docker Commands

Stop all services:


```docker-compose down```


### View logs for all services:



```docker-compose logs -f <backend|frontend|mariadb>```


### Rebuild a specific service:



```docker-compose up --build <backend|frontend|mariadb>```


### Force recreate container:



```sudo docker compose up -d --force-recreate```
