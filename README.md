<p align="center">
  <a href="https://family-calendar.nicolasmura.com">
    <img alt="MyCloud Portal" src="./apps/frontend-public/src/assets/icons/icon-384x384.png" width="400" />
  </a>
</p>

# Family Calendar PWA V2

Fullstack Angular - Node JS - MongoDB monorepo for Family Calendar project.

- [Family Calendar PWA V2](#family-calendar-pwa-v2)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Run & test locally with Docker](#run--test-locally-with-docker)
  - [Run & test locally without Docker](#run--test-locally-without-docker)
- [Dockerization - How To](#dockerization---how-to)
  - [MongoDB for Dev](#mongodb-for-dev)
  - [Frontend, backend and MongoDB for Prod](#frontend-backend-and-mongodb-for-prod)
- [Deploy in a real-world production environment](#deploy-in-a-real-world-production-environment)
- [A few words about Nx](#a-few-words-about-nx)
  - [CheatSheet](#cheatsheet)

# Requirements

To contribute to this project and run it locally, you will need:

* [Node JS >= v12.19.0 & NPM >= 6.14.8](https://nodejs.org/en)
* [Angular 11.x](https://angular.io)
* [Typescript >= 4.0.5](https://www.typescriptlang.org)
* [Docker >= 20.10.5](https://www.docker.com/)

> :bulb: **_Tip_**
>
> [Microsoft VS Code editor](https://code.visualstudio.com/) is already packaged with Typescript.

# Quick start

```bash
  git clone git@github.com:NicolasMura/family-calendar-v2.git
  cd family-calendar-v2
```

## Run & test locally with Docker

In you favorite terminal, run:

```bash
  # Create .env file
  cp .env.example .env
  # Start up the whole application (front + back + mongodb) stack using docker-compose
  sudo chmod 777 .docker/mongodb_vol/log
  docker-compose -f docker-compose.yml --env-file .env up -d
```

To stop the app, just run:

```bash
  docker-compose -f docker-compose.yml --env-file .env down
```

> :warning: **_Warning_**
>
> `docker compose` command doesn't gather all environment variables, especially COMPOSE_FILE => use `docker-compose` instead.

@TODO : faire un projet "chapeau" family-calendar avec le docker-compose.yml

## Run & test locally without Docker

If needed, adjust environment variables in `apps/frontend-public/src/env.js`

Then, run:

```bash
  git clone git@github.com:NicolasMura/family-calendar-v2.git
  cd family-calendar-v2
  # create .env file
  cp .env.example .env
  # install dependancies
  yarn install
```

@TODO Local `mongodb` configuration

Option 1

@TODO

Option 2

Adjust MONGODB_URI environment variable in `.env` file:

```bash
  (...)
  MONGODB_URI=mongodb://<user>:<password>@localhost:<DB_PORT>/
  (...)
```

In you favorite terminal, run database container in the background:

```bash
  docker-compose --env-file .env up -d database
```

Finally, start frontend and backend apps:

```bash
  nx serve frontend-public backend-api
```

# Dockerization - How To

## MongoDB for Dev

Build new image for `database`:

```bash
  docker build -t family-calendar-v2-database -f .docker/Dockerfile.mongodb .
```

## Frontend, backend and MongoDB for Prod

Mandatory server-side files:

* config/(dev.)family-calendar.nicolasmura.com-le-ssl-host-proxy.conf
* ssl/fullchain.pem
* ssl/privkey.pem

```bash
  # mkdir -p .docker/apache_vol/log && mkdir .docker/apache_vol/ssl
```

Build new image for `frontend-public`:

```bash
  nx build frontend-public --prod
  docker build -t family-calendar-v2-frontend-public -f .docker/Dockerfile.frontend-public .
  docker tag family-calendar-v2-frontend-public nicolasmura/family-calendar-v2-frontend-public
  docker push nicolasmura/family-calendar-v2-frontend-public
  docker tag family-calendar-v2-frontend-public nicolasmura/family-calendar-v2-frontend-public:v1.0
  docker push nicolasmura/family-calendar-v2-frontend-public:v1.0
```

Build new image for `backend`:

```bash
  # nx build backend-api --prod
  docker build -t family-calendar-v2-backend-api -f .docker/Dockerfile.backend-api .
  docker tag family-calendar-v2-backend-api nicolasmura/family-calendar-v2-backend-api
  docker push nicolasmura/family-calendar-v2-backend-api
  docker tag family-calendar-v2-backend-api nicolasmura/family-calendar-v2-backend-api:v1.0
  docker push nicolasmura/family-calendar-v2-backend-api:v1.0
```

Build new image for `database`:

```bash
  docker build -t family-calendar-v2-database -f .docker/Dockerfile.mongodb .
  docker tag family-calendar-v2-database nicolasmura/family-calendar-v2-database
  docker push nicolasmura/family-calendar-v2-database
  docker tag family-calendar-v2-database nicolasmura/family-calendar-v2-database:v1.0
  docker push nicolasmura/family-calendar-v2-database:v1.0
```

Finally:

```bash
  docker-compose --env-file .env up -d
```

# Deploy in a real-world production environment

> :warning: **_Important_**
>
> On Linux systems with Apache web server, you must set the Apache log folder ownership as following to make it work:
> ```bash
>   sudo chmod 777 .docker/mongodb_vol/log
> ```
>
> Don't worry about that.

Don't forget also:

```bash
  sudo chown -R <you>:www-data /var/log/family-calendar.nicolasmura.com
```

# A few words about Nx

🔎 **Powerful, Extensible Dev Tools**

This project was generated using [Nx](https://nx.dev).
Visit the [Nx Angular Documentation](https://nx.dev/angular) to learn more.

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## CheatSheet

Create auth module running the 'module' NestJs generator with Nx project support :

```bash
  nx g @nrwl/nest:module auth --project backend-api --directory app
```

Create auth service inside auth module running the 'service' NestJs generator with Nx project support :

```bash
  nx g @nrwl/nest:service auth --project backend-api --directory app/auth --flat
```
