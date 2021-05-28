<p align="center">
  <a href="https://family-calendar.nicolasmura.com">
    <img alt="MyCloud Portal" src="./apps/frontend-public/src/assets/icons/icon-384x384.png" width="400" />
  </a>
</p>

# Family Calendar PWA V2

Fullstack monorepo for Family Calendar project. With Angular frontend, NestJS backend REST API and MongoDB.

- [Family Calendar PWA V2](#family-calendar-pwa-v2)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Run & test locally with Docker](#run--test-locally-with-docker)
  - [Run & test (& dev!) locally without Docker](#run--test--dev-locally-without-docker)
    - [Option 1: use your own local MongoDB](#option-1-use-your-own-local-mongodb)
    - [Option 2: run MongoDB inside Docker compose container](#option-2-run-mongodb-inside-docker-compose-container)
- [Dockerization - How To](#dockerization---how-to)
  - [MongoDB for Dev](#mongodb-for-dev)
  - [Frontend, backend and MongoDB for Prod](#frontend-backend-and-mongodb-for-prod)
- [Deploy in a real-world production environment](#deploy-in-a-real-world-production-environment)
- [Common troubleshootings](#common-troubleshootings)
  - [API Container is unhealthy and doesn't start](#api-container-is-unhealthy-and-doesnt-start)
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
  docker-compose --env-file .env up -d
```

Adjust `MONGODB_URI` environment variable in `.env` file:

```bash
  (...)
  # Backend is living INSIDE the Docker compose container, so change `localhost` to `database`
  MONGODB_URI=mongodb://<MONGO_INITDB_DBUSER_USERNAME>:<MONGO_INITDB_DBUSER_PASSWORD>@database:<MONGODB_PORT>/
  (...)
```

To stop the app, just run:

```bash
  docker-compose --env-file .env down
```

Visit `https://localhost:44300` to see the result.

> :warning: **_Warning_**
>
> `docker compose` command doesn't gather all environment variables, especially COMPOSE_FILE => use `docker-compose` instead.

## Run & test (& dev!) locally without Docker

Run:

```bash
  git clone git@github.com:NicolasMura/family-calendar-v2.git
  cd family-calendar-v2
  # create .env file
  cp .env.example .env
  # install dependancies
  yarn install
```

If needed, adjust environment variables in `apps/frontend-public/src/env.js`

### Option 1: use your own local MongoDB

In this case, I'm pretty sure you will know what to do

### Option 2: run MongoDB inside Docker compose container

Adjust `MONGODB_URI` environment variable in `.env` file:

```bash
  (...)
  # Backend is living OUTSIDE the Docker compose container, so change `database` to `localhost`
  MONGODB_URI=mongodb://<MONGO_INITDB_DBUSER_USERNAME>:<MONGO_INITDB_DBUSER_PASSWORD>@localhost:<MONGODB_PORT>/
  (...)
```

In you favorite terminal, run the database container in the background:

```bash
  docker-compose --env-file .env up -d database
```

Finally, start frontend and backend apps:

```bash
  nx serve frontend-public backend-api
```

Visit `https://localhost:4200` to see the result.

# Dockerization - How To

## MongoDB for Dev

Build new image for `database`:

```bash
  docker build -t family-calendar-v2-database -f .docker/Dockerfile.mongodb .
```

## Frontend, backend and MongoDB for Prod

Mandatory server-side files:

* config/(dev.)<URL_SITE>-le-ssl-host-proxy.conf
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

Don't forget also to give correct ownership to Apache log folder:

```bash
  sudo chown -R <you>:www-data /var/log/<WEBAPP_FOLDER>
```

# Common troubleshootings

## API Container is unhealthy and doesn't start

You have:

```bash
  $ docker-compose --env-file .env up -d # OR docker-compose --env-file .env up -d database
  Creating database-v2 ... done

  ERROR: for api Container "2b24bf6f0f69" is unhealthy.
```

In general, that's because:

- you removed the `MONGODB_DB_MAIN` database defined in `.env` file, or changed some critical environment variables
- you removed the`users` collection in `MONGODB_DB_MAIN`
- you changed some critical environment variables

The solutions is to double check:

- MongoDB port variable is named `MONGODB_PORT` in the following files:
  - `.env`
  - `docker-compose.yml`
  - `scripts/database-healthcheck.sh`
- Database port in `MONGODB_URI` value is the same as `MONGODB_PORT` value
- Host MongoDB log folder has correct permissions: `sudo chmod 777 .docker/mongodb_vol/log`
- Apache log folder has correct ownership: `sudo chown -R <you>:www-data /var/log/<WEBAPP_FOLDER>`

For Linux users using `docker-compose.production.yml` in production environment, also try to remove the named volume `mongodb`:

```bash
  docker volume rm -f <mongodb-volume-name>
  # for example:
  docker volume rm -f dev-family-calendar-v2_mongodb
```

For Mac OS X users, also try to clean the bind mounted volume for MongoDB `/data/db` (see `MONGODB_DB_DIR_FOR_MAC_ONLY` in `.env ` and `docker-compose.macosx-override.yml` files):

```bash
  rm -R .docker/mongodb_vol/db
```

> :information_source: **_Note_**
>
> `MONGODB_PORT` is used to check database health when container is starting (via `scripts/database-healthcheck.sh` script), so if you rename it you will need to re-build the database image:
>
> ```bash
>   docker build -t family-calendar-v2-database -f .docker/Dockerfile.mongodb .  --no-cache && docker tag family-calendar-v2-database nicolasmura/family-calendar-v2-database
>    docker-compose --env-file .env down
>    docker-compose --env-file .env up -d # OR docker-compose --env-file .env up -d database
> ```

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

Create auth service inside frontend-tools Angular library running the 'service' Angular generator with Nx project support :

```bash
  nx g @nrwl/angular:service auth --project frontend-tools --directory app/auth --flat --dry-run
```

Create Angular vendors lib:

```bash
  nx g @nrwl/angular:lib vendors
```
