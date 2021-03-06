# diff-patch-sync-demo

This repo contains a client-server-example with **Angular 8** frontend and **NestJS** REST-backend based on Node.js server integrating the [**diff-patch-sync**](https://github.com/w11k/diff-patch-sync)-library on both sides. 

## Frameworks

- Provide Client-Server-Synchronisation using **diff-patch-sync**. This is a TypeScript library for syncing collaborative web-applications implementing the _Differential Synchronization_ Algorithm developed by [_Neil Fraser_](https://neil.fraser.name/writing/sync/) with REST-backends via HTTP.
- Uses **Angular 8** Framework to develop frontend functionality and to serve a single-page-application.
- Provide client-side storage by using **IndexedDB**.
- In order to make the client fully offline-capable to provide static files using Angular specific **Service Worker API** [(@angular/service-worker)](https://angular.io/api/service-worker).
- Makes use of NestJS, a framework for building efficient, scalable REST-backends based on Node.js. 
- On server-side the object-relational-mapper TypeOrm is used for better entity management, migrations and automatic migrations generation.
- An lightweight open-source SQL-database PostgreSQL is used for persisting data server-side.

## Demo
See a running demo of a collaborative todo-app here: **[Demo Todo App](http://todo-app.w11k.de/)**

> **_Hint:_** It is recommended to use two different browsers (e.g. Chrome and Firefox) or two instances of Chrome (one instance in _private mode ("Ctrl + Shift + n")_) because IndexedDB is used and the instances should not share their databases.


## Prerequisites for local development

- Make sure to have node version v10.9.0 installed [(Node.js download link)](https://nodejs.org/en/download/)
- Install Dependencies executing `cd client/ && npm install && cd ../server/ && npm install`
- Install _http-server_ globally when you want to serve the application via CLI-Http-Server with `npm install -g http-server`
- Make sure to have Docker installed [(Docker download link)](https://docs.docker.com/install/)
- Bring up the PostgreSLQ database by running `cd docker && docker-compose up`
- Run database migrations using TypeOrm migrations with `cd server/ && npm run migrate:run`

## Client

### Start Angular Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Serve via CLI-Http-Server

Run `npm run start:offline` for running the app with Server Worker activated. Navigate to `http://localhost:4200/`. 

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:prod` for a production build.

### Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests locally via [Protractor](http://www.protractortest.org/). Use `npm run e2e:noDevServer` to execute tests when you've started the dev server manually before.


## Server

### Start Node.js Server

Run `npm run start` to start Nest application dev server. The app will automatically reload if you change any of the source files. Use the `npm run start:prod` to start in production environments. 

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Continuous Integration

The application is continuously tested and deployed within a CI-environment. Gitlab CI is used for that purpose. Four stages are passed, which are defined in the [_.gitlab-ci.yml_ file](.gitlab-ci.yml).

- build -> create production build artifacts for client and server
- test -> run end-to-end test with a temporary created database running in docker environment
- migrate -> only if the test passes, run migrations on the production database
- deploy -> only if the test passes, deploy application to target [http://todo-app.w11k.de/](http://todo-app.w11k.de/)

## References

* [diff-patch-sync](https://github.com/w11k/diff-patch-sync) - TypeScript library for syncing collaborative web-applications with REST-backends in order to make them offline-capable.
* [lodash](https://github.com/lodash/lodash) - A modern JavaScript utility library delivering modularity, performance, & extras.
* [uuid](https://github.com/uuidjs/uuid) - Generate RFC-compliant UUIDs in JavaScript.
* [ngx-indexed-db](https://github.com/assuncaocharles/ngx-indexed-db) - A service that wraps IndexedDB database in an Angular service. It exposes very simple promises API to enable the usage of IndexedDB without most of it plumbing.
* [typeorm](https://github.com/typeorm/typeorm) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms
* [postgresql](https://www.postgresql.org/) - PostgreSQL Database Management System
* [Angular CLI](https://angular.io/) - One frontend framework. Mobile & desktop
* [NestJS CLI](https://github.com/nestjs/nest) - A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications on top of TypeScript & JavaScript (ES6, ES7, ES8)

## Authors

* **Mario Sallat** - [Github](https://github.com/msallat)