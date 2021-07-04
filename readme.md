# Discord Exam Reminder Bot
* A Discord Bot which alerts user when an exam is close by , User can also post , edit and delete Exam Schedules.

## Built With
* [NodeJS](https://nodejs.org/en/docs/) -  evented I/O for the backend
* [Express](https://expressjs.com/) - framework for backend
* [Mongoose](https://mongoosejs.com/) - ODM
* [MongoDB](https://www.mongodb.com/) - Database
* [Node Cron](https://www.npmjs.com/package/node-cron) - Job scheduler

## Getting Started
These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have `Node` or `npm` installed on your machine.

### Install dependencies 
```sh
$ npm install
```

### Set up environment variables 

```sh
    cd config
```
fill the values for environment variables.

### Local Run
After setting up environment proceed with local run 
```sh
$ npm start
```

## File System
```sh
.
├── config 
│             ├── config.env
│             ├── db.js
├── models                        
│             ├── quiz.js
├── routes                        
│             ├── route.js
├── src                        
│             ├── bot.js
│             ├── scheduler.js
├── index.js
├── package.json
├── package-lock.json
├── README.md

```

## Deployment

### Heroku Deployment
```sh
$ heroku login -i
$ heroku git:remote -a <your-app-name>
$ git push heroku master
```
Set up environment variables 
```sh
$ heroku config:set ENV_VAR=<value>
```
