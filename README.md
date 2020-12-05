# Introduction

Typescript with NodeJS + Express + Sequelize ORM.

## Installation

Run one of the command below

```bash
npm install
```

The build tasks use **Gulp tasks runner**. Typescript is transpiled to Javascript in the /build directory.
This sample use Sqlite3 but you can easily change it and use your favorite relational database (npm) :

```bash
npm install --save mysql // For both mysql and mariadb dialects
npm install --save sqlite3
npm install --save tedious // MSSQL
```

## Configure your database

Sequelize configuration and entities can be found in /Src/sqlz directory.

| Directory  | Description                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| config     | Your database configuration.                                                                                                  |
| migrations | Your database migrations scripts. Keep this files in Javascript and run sequelize db:migrate to migrate your database schema. |
| models     | Sequelize entities.                                                                                                           |

First, define your database schema in config/config.json file.
Use [Sequelize CLI](http://docs.sequelizejs.com/en/v3/docs/migrations/) to initialize your database.

In models/ directory, the index.ts file define the DbConnection interface. When you create a new Sequelize entity, add its reference in this interface to fully use Typescript's superpower !

## Run the project

```bash
npm start
```

Your web server is now exposed on http://localhost:3000

### GET /api/appusers

curl -X GET -H 'Content-Type: application/json' http://localhost:3000/api/appusers

### POST /api/appusers

curl -X POST -H 'Content-Type: application/json' -d '{"name": "Vinit", "email":"vinit.pal@digi-corp.com","pwd":"123456"}' http://localhost:3000/api/appusers

### POST /api/appusers/search

curl -X POST -H 'Content-Type: application/json' -d '{"name":"win"}' http://localhost:3000/api/appusers/search

### POST /api/appUsers/chats

curl -X POST -H 'Content-Type: application/json' -d '{"id":"", "message":"", "receiver": ""}' http://localhost:3000/api/appusers/chats

### POST /api/appusers/getchats

curl -X POST -H 'Content-Type: application/json' -d '{"id":""}' http://localhost:3000/api/appusers/getchats

### POST /api/appusers/upload

curl -X POST -d 'FormData {"file":""}' http://localhost:3000/api/appusers/upload

## Build

```bash
npm run build
```

## Lint your code before you commit!

In a collaborative project, it's always a pain when you have to work on files not correctly formatted.
Now before each commit, yout typescript files are linted based on your tsconfig.json > .editorconfig > tslint.json files.

By the way you can also run the command with a npm script

```bash
npm run prettify
```

## Roadmap

- [x] Add Sequelize Typescript example with association
- [x] Manage multiple database configuration with NODE_ENV
- [ ] Add Swagger API Framework
